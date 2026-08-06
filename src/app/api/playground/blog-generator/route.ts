import { NextResponse } from "next/server";

type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

type Body = {
  apiKey?: string;
  blog?: string;
  messages?: ChatTurn[];
};

const SYSTEM_PROMPT = `You are a sharp blog-writing collaborator in a split-pane playground.
The user chats on the left; a live markdown blog draft lives on the right.

Your job:
1. Write or revise a complete blog post in markdown based on the conversation.
2. Keep a witty, clear voice unless the user asks for something else.
3. Prefer a title (# heading), short intro, scannable sections, and a crisp ending.
4. When refining, update the FULL draft — never return only a partial patch.

Respond with STRICT JSON only (no markdown fences), shaped like:
{"message":"short chat reply to the user","blog":"full markdown blog draft"}

The "message" field is a brief conversational acknowledgment (1-3 sentences).
The "blog" field is the entire current draft in markdown.`;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const apiKey = body.apiKey?.trim();
    const messages = body.messages ?? [];
    const currentBlog = body.blog?.trim() ?? "";

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key is required." },
        { status: 400 },
      );
    }

    if (!messages.length) {
      return NextResponse.json(
        { error: "Send at least one message." },
        { status: 400 },
      );
    }

    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser?.content?.trim()) {
      return NextResponse.json(
        { error: "Last message must be from the user." },
        { status: 400 },
      );
    }

    const openaiMessages = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      ...(currentBlog
        ? [
            {
              role: "system" as const,
              content: `Current blog draft (markdown):\n\n${currentBlog}`,
            },
          ]
        : []),
      ...messages.slice(-12).map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.7,
        response_format: { type: "json_object" },
        messages: openaiMessages,
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

    let parsed: { message?: string; blog?: string };
    try {
      parsed = JSON.parse(raw) as { message?: string; blog?: string };
    } catch {
      return NextResponse.json(
        { error: "Could not parse model response as JSON." },
        { status: 502 },
      );
    }

    const blog = parsed.blog?.trim();
    if (!blog) {
      return NextResponse.json(
        { error: "Model did not return a blog draft." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      blog,
      message:
        parsed.message?.trim() ||
        "Draft updated on the right. Keep chatting to refine it.",
    });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error. Please try again." },
      { status: 500 },
    );
  }
}
