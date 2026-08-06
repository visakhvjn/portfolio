"use client";

import { ButtonSpinner } from "@/components/playground/ButtonSpinner";
import type { ParsedQuestion } from "@/lib/mcq/parse";
import { useState } from "react";

type QuizPlayerProps = {
  questions: Array<ParsedQuestion & { id?: string }>;
  mode: "preview" | "take";
  onSubmit?: (answers: number[]) => void | Promise<void>;
  submitting?: boolean;
};

export function QuizPlayer({
  questions,
  mode,
  onSubmit,
  submitting,
}: QuizPlayerProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => questions.map(() => null),
  );
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  if (questions.length === 0) {
    return (
      <div className="flex h-full min-h-48 items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-6 text-center text-sm text-slate-500">
        Parsed questions will appear here as a quiz.
      </div>
    );
  }

  const select = (qi: number, oi: number) => {
    if (mode === "take" && score !== null) return;
    if (mode === "preview" && checked) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qi] = oi;
      return next;
    });
  };

  const checkPreview = () => {
    let s = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) s += 1;
    });
    setScore(s);
    setChecked(true);
  };

  const submitTake = async () => {
    if (answers.some((a) => a === null)) return;
    await onSubmit?.(answers as number[]);
  };

  return (
    <div className="space-y-6 pb-8">
      {questions.map((q, qi) => (
        <div
          key={q.id ?? `${qi}-${q.prompt.slice(0, 24)}`}
          className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
        >
          <p className="text-sm font-medium text-white">
            <span className="mr-2 text-slate-500">{qi + 1}.</span>
            {q.prompt}
          </p>
          <ul className="mt-3 space-y-2">
            {q.options.map((opt, oi) => {
              const selected = answers[qi] === oi;
              const showResult =
                (mode === "preview" && checked) ||
                (mode === "take" && score !== null);
              const isCorrect = oi === q.correctIndex;
              let style =
                "border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/20";
              if (selected && !showResult) {
                style =
                  "border-emerald-400/50 bg-emerald-500/10 text-emerald-50";
              } else if (showResult && isCorrect) {
                style = "border-emerald-400/50 bg-emerald-500/15 text-emerald-100";
              } else if (showResult && selected && !isCorrect) {
                style = "border-rose-400/40 bg-rose-500/10 text-rose-100";
              }

              return (
                <li key={oi}>
                  <button
                    type="button"
                    onClick={() => select(qi, oi)}
                    disabled={showResult}
                    className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${style} disabled:cursor-default`}
                  >
                    <span className="mr-2 text-slate-500">
                      {String.fromCharCode(65 + oi)}.
                    </span>
                    {opt}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {mode === "preview" ? (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={checkPreview}
            className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Check answers
          </button>
          {checked && score !== null ? (
            <p className="text-sm text-slate-400">
              Score:{" "}
              <span className="font-semibold text-white">
                {score}/{questions.length}
              </span>
            </p>
          ) : null}
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => void submitTake()}
            disabled={
              submitting || answers.some((a) => a === null) || score !== null
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? <ButtonSpinner className="h-4 w-4" /> : null}
            {submitting ? "Submitting…" : "Submit quiz"}
          </button>
          {score !== null ? (
            <p className="text-sm text-slate-400">
              Score:{" "}
              <span className="font-semibold text-white">
                {score}/{questions.length}
              </span>
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}

/** Used after take submit to show score on the player externally */
export function computeScore(
  questions: ParsedQuestion[],
  answers: number[],
): number {
  return questions.reduce(
    (sum, q, i) => sum + (answers[i] === q.correctIndex ? 1 : 0),
    0,
  );
}
