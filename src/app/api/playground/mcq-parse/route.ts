import { normalizeParsedQuiz } from "@/lib/mcq/parse";
import { NextResponse } from "next/server";

type Body = {
  apiKey?: string;
  text?: string;
};

const SYSTEM_PROMPT = `You convert pasted multiple-choice questions (from any AI assistant or notes) into clean JSON for a quiz app.

Return STRICT JSON only (no markdown fences) shaped like:
{
  "title": "short quiz title",
  "questions": [
    {
      "prompt": "question text",
      "options": ["option A text", "option B text", "option C text", "option D text"],
      "correctIndex": 0
    }
  ]
}

Rules:
- correctIndex is 0-based into the options array.
- Prefer 2–6 options per question.
- Infer the correct answer from Answer/Correct lines when present.
- If an answer key is missing, pick the most likely correct option and still set correctIndex.
- Drop incomplete questions.
- Keep option text clean (no leading A)/B) letters unless they are part of the content).
- title should summarize the topic in a few words.`;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const apiKey = body.apiKey?.trim();
    const text = body.text?.trim();

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key is required." },
        { status: 400 },
      );
    }

    if (!text || text.length < 10) {
      return NextResponse.json(
        { error: "Paste more MCQ text to parse." },
        { status: 400 },
      );
    }

    if (text.length > 40_000) {
      return NextResponse.json(
        { error: "Paste is too long. Trim it and try again." },
        { status: 400 },
      );
    }

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Parse these MCQs into the JSON schema:\n\n${text}`,
          },
        ],
      }),
    });

    const openaiData = (await openaiRes.json()) as {
      error?: { message?: string };
      choices?: Array<{ message?: { content?: string } }>;
    };

    if (!openaiRes.ok) {
      return NextResponse.json(
        {
          error:
            openaiData.error?.message ||
            `OpenAI request failed (${openaiRes.status}).`,
        },
        { status: openaiRes.status === 401 ? 401 : 502 },
      );
    }

    const raw = openaiData.choices?.[0]?.message?.content?.trim();
    if (!raw) {
      return NextResponse.json(
        { error: "OpenAI returned an empty response." },
        { status: 502 },
      );
    }

    let json: unknown;
    try {
      json = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: "Could not parse model response as JSON." },
        { status: 502 },
      );
    }

    const normalized = normalizeParsedQuiz(json);
    if (normalized.error || normalized.questions.length === 0) {
      return NextResponse.json(
        { error: normalized.error || "No questions parsed." },
        { status: 422 },
      );
    }

    return NextResponse.json({
      title: normalized.title,
      questions: normalized.questions,
    });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error. Please try again." },
      { status: 500 },
    );
  }
}
