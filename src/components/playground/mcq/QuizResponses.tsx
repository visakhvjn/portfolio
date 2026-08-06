"use client";

import { formatMcqDbError } from "@/lib/mcq/supabase-errors";
import { createClient } from "@/lib/supabase/client";
import type {
  QuizAnswerRow,
  QuizAttemptRow,
  QuizQuestionRow,
  QuizRow,
} from "@/lib/mcq/types";
import Link from "next/link";
import { useEffect, useEffectEvent, useState } from "react";

type Props = { slug: string };

type AttemptView = QuizAttemptRow & {
  answers: Array<
    QuizAnswerRow & {
      prompt: string;
      options: string[];
      correct_index: number;
    }
  >;
};

export function QuizResponses({ slug }: Props) {
  const [quiz, setQuiz] = useState<QuizRow | null>(null);
  const [attempts, setAttempts] = useState<AttemptView[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useEffectEvent(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Sign in required.");

      const { data: quizRow, error: quizError } = await supabase
        .from("quizzes")
        .select("id, owner_id, title, slug, created_at, updated_at")
        .eq("slug", slug)
        .single();

      if (quizError || !quizRow) {
        throw new Error(quizError?.message || "Quiz not found.");
      }
      if (quizRow.owner_id !== user.id) {
        throw new Error("Only the owner can view responses.");
      }

      const { data: qRows } = await supabase
        .from("quiz_questions")
        .select("id, quiz_id, position, prompt, options, correct_index")
        .eq("quiz_id", quizRow.id);

      const questionMap = new Map(
        ((qRows ?? []) as QuizQuestionRow[]).map((q) => [q.id, q]),
      );

      const { data: attemptRows, error: aError } = await supabase
        .from("quiz_attempts")
        .select(
          "id, quiz_id, taker_id, taker_email, score, total, created_at",
        )
        .eq("quiz_id", quizRow.id)
        .order("created_at", { ascending: false });

      if (aError) throw new Error(aError.message);

      const views: AttemptView[] = [];
      for (const attempt of (attemptRows ?? []) as QuizAttemptRow[]) {
        const { data: answers } = await supabase
          .from("quiz_answers")
          .select("id, attempt_id, question_id, selected_index")
          .eq("attempt_id", attempt.id);

        views.push({
          ...attempt,
          answers: ((answers ?? []) as QuizAnswerRow[]).map((a) => {
            const q = questionMap.get(a.question_id);
            return {
              ...a,
              prompt: q?.prompt ?? "",
              options: q?.options ?? [],
              correct_index: q?.correct_index ?? -1,
            };
          }),
        });
      }

      setQuiz(quizRow as QuizRow);
      setAttempts(views);
    } catch (err) {
      setError(
        formatMcqDbError(
          err instanceof Error ? err.message : "Failed to load responses.",
        ),
      );
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    void load();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-slate-500">
        Loading responses…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-sm text-rose-300">{error}</p>
        <Link
          href="/playground/mcq-quiz"
          className="text-sm text-emerald-400 hover:underline"
        >
          All Quizzes
        </Link>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/playground/mcq-quiz"
          className="text-sm text-slate-500 hover:text-emerald-400"
        >
          ← All Quizzes
        </Link>
        <h1 className="mt-3 text-2xl font-semibold text-white">
          {quiz?.title}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {attempts.length} response{attempts.length === 1 ? "" : "s"}
        </p>

        {attempts.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-10 text-center text-sm text-slate-500">
            No responses yet. Share the take link and wait for submissions.
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {attempts.map((attempt) => {
              const open = expanded === attempt.id;
              return (
                <li
                  key={attempt.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03]"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpanded((id) =>
                        id === attempt.id ? null : attempt.id,
                      )
                    }
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">
                        {attempt.taker_email || attempt.taker_id.slice(0, 8)}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {new Date(attempt.created_at).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-emerald-300">
                      {attempt.score}/{attempt.total}
                    </p>
                  </button>
                  {open ? (
                    <div className="space-y-3 border-t border-white/10 px-4 py-4">
                      {attempt.answers.map((a) => {
                        const selected = a.options[a.selected_index];
                        const correct = a.options[a.correct_index];
                        const ok = a.selected_index === a.correct_index;
                        return (
                          <div key={a.id} className="text-sm">
                            <p className="font-medium text-slate-200">
                              {a.prompt}
                            </p>
                            <p
                              className={`mt-1 ${ok ? "text-emerald-300/90" : "text-rose-300/90"}`}
                            >
                              Selected: {selected ?? "—"}
                              {!ok ? ` · Correct: ${correct ?? "—"}` : ""}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
