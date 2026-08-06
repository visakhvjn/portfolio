"use client";

import {
  QuizPlayer,
  computeScore,
} from "@/components/playground/mcq/QuizPlayer";
import type { ParsedQuestion } from "@/lib/mcq/parse";
import { formatMcqDbError } from "@/lib/mcq/supabase-errors";
import { createClient } from "@/lib/supabase/client";
import type { QuizQuestionRow, QuizRow } from "@/lib/mcq/types";
import Link from "next/link";
import { useEffect, useEffectEvent, useState } from "react";

type TakeQuizProps = {
  slug: string;
};

export function TakeQuiz({ slug }: TakeQuizProps) {
  const [quiz, setQuiz] = useState<QuizRow | null>(null);
  const [questions, setQuestions] = useState<
    Array<ParsedQuestion & { id: string }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ score: number; total: number } | null>(
    null,
  );

  const load = useEffectEvent(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: quizRow, error: quizError } = await supabase
        .from("quizzes")
        .select("id, owner_id, title, slug, created_at, updated_at")
        .eq("slug", slug)
        .single();

      if (quizError || !quizRow) {
        throw new Error(quizError?.message || "Quiz not found.");
      }

      const { data: qRows, error: qError } = await supabase
        .from("quiz_questions")
        .select("id, quiz_id, position, prompt, options, correct_index")
        .eq("quiz_id", quizRow.id)
        .order("position", { ascending: true });

      if (qError) throw new Error(qError.message);

      setQuiz(quizRow as QuizRow);
      setQuestions(
        ((qRows ?? []) as QuizQuestionRow[]).map((q) => ({
          id: q.id,
          prompt: q.prompt,
          options: q.options,
          correctIndex: q.correct_index,
        })),
      );
    } catch (err) {
      setError(
        formatMcqDbError(err instanceof Error ? err.message : "Failed to load quiz."),
      );
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    void load();
  }, [slug]);

  const onSubmit = async (answers: number[]) => {
    if (!quiz) return;
    setSubmitting(true);
    setError(null);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Sign in to submit.");

      const score = computeScore(questions, answers);
      const { data: attempt, error: aError } = await supabase
        .from("quiz_attempts")
        .insert({
          quiz_id: quiz.id,
          taker_id: user.id,
          taker_email: user.email ?? null,
          score,
          total: questions.length,
        })
        .select("id")
        .single();

      if (aError || !attempt) {
        throw new Error(aError?.message || "Could not save attempt.");
      }

      const answerRows = questions.map((q, i) => ({
        attempt_id: attempt.id,
        question_id: q.id,
        selected_index: answers[i],
      }));

      const { error: ansError } = await supabase
        .from("quiz_answers")
        .insert(answerRows);
      if (ansError) throw new Error(ansError.message);

      setDone({ score, total: questions.length });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submit failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-slate-500">
        Loading quiz…
      </div>
    );
  }

  if (error && !quiz) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-sm text-rose-300">{error}</p>
        <Link
          href="/playground/mcq-quiz"
          className="text-sm text-emerald-400 hover:underline"
        >
          Back to quizzes
        </Link>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold text-white">
          {quiz?.title ?? "Quiz"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Answer every question, then submit. Your score is recorded.
        </p>

        {error ? (
          <p className="mt-4 text-sm text-rose-300" role="alert">
            {error}
          </p>
        ) : null}

        {done ? (
          <div className="mt-8 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6 text-center">
            <p className="text-sm text-emerald-200/90">Submitted</p>
            <p className="mt-2 text-3xl font-bold text-white">
              {done.score}/{done.total}
            </p>
            <Link
              href="/playground/mcq-quiz"
              className="mt-4 inline-block text-sm text-emerald-400 hover:underline"
            >
              Done
            </Link>
          </div>
        ) : (
          <div className="mt-6">
            <QuizPlayer
              questions={questions}
              mode="take"
              onSubmit={onSubmit}
              submitting={submitting}
            />
          </div>
        )}
      </div>
    </div>
  );
}
