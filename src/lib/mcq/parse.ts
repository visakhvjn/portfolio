export type ParsedQuestion = {
  prompt: string;
  options: string[];
  correctIndex: number;
};

export type ParsedQuizPayload = {
  title?: string;
  questions: ParsedQuestion[];
};

export function slugifyTitle(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  const suffix = Math.random().toString(36).slice(2, 8);
  return `${base || "quiz"}-${suffix}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Validate OpenAI JSON into quiz questions for the creator UI.
 */
export function normalizeParsedQuiz(raw: unknown): {
  title: string;
  questions: ParsedQuestion[];
  error?: string;
} {
  if (!isRecord(raw)) {
    return { title: "Untitled quiz", questions: [], error: "Invalid JSON shape." };
  }

  const title =
    typeof raw.title === "string" && raw.title.trim()
      ? raw.title.trim()
      : "Untitled quiz";

  const list = Array.isArray(raw.questions) ? raw.questions : null;
  if (!list) {
    return {
      title,
      questions: [],
      error: 'Expected a "questions" array in the model response.',
    };
  }

  const questions: ParsedQuestion[] = [];

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (!isRecord(item)) continue;

    const prompt =
      typeof item.prompt === "string"
        ? item.prompt.trim()
        : typeof item.question === "string"
          ? item.question.trim()
          : "";

    const optionsRaw = item.options;
    const options = Array.isArray(optionsRaw)
      ? optionsRaw
          .filter((o): o is string => typeof o === "string")
          .map((o) => o.trim())
          .filter(Boolean)
      : [];

    let correctIndex =
      typeof item.correctIndex === "number"
        ? item.correctIndex
        : typeof item.correct_index === "number"
          ? item.correct_index
          : -1;

    if (
      correctIndex < 0 &&
      typeof item.answer === "string" &&
      /^[A-Da-d]$/.test(item.answer.trim())
    ) {
      correctIndex = item.answer.trim().toUpperCase().charCodeAt(0) - 65;
    }

    if (!prompt || options.length < 2) continue;
    if (correctIndex < 0 || correctIndex >= options.length) continue;

    questions.push({ prompt, options, correctIndex });
  }

  if (questions.length === 0) {
    return {
      title,
      questions: [],
      error:
        "No valid questions found. Each needs a prompt, 2+ options, and a correctIndex.",
    };
  }

  return { title, questions };
}
