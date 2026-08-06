"use client";

import { createClient } from "@/lib/supabase/client";
import type { QuizRow } from "@/lib/mcq/types";
import Link from "next/link";
import { useEffect, useEffectEvent, useState } from "react";

type QuizListItem = QuizRow & { attempt_count: number };

export function AllQuizzesList() {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
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
      if (!user) {
        setQuizzes([]);
        return;
      }

      const { data, error: qError } = await supabase
        .from("quizzes")
        .select("id, owner_id, title, slug, created_at, updated_at")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });

      if (qError) throw new Error(qError.message);

      const rows = (data ?? []) as QuizRow[];
      const withCounts: QuizListItem[] = await Promise.all(
        rows.map(async (quiz) => {
          const { count } = await supabase
            .from("quiz_attempts")
            .select("id", { count: "exact", head: true })
            .eq("quiz_id", quiz.id);
          return { ...quiz, attempt_count: count ?? 0 };
        }),
      );
      setQuizzes(withCounts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load quizzes.");
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    void load();
  }, []);

  const copyShare = (slug: string) => {
    const url = `${window.location.origin}/playground/mcq-quiz/${slug}`;
    void navigator.clipboard.writeText(url);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-slate-500">
        Loading quizzes…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center px-4 text-sm text-rose-300">
        {error}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-xl font-semibold text-white">All Quizzes</h1>
          <Link
            href="/playground/mcq-quiz/new"
            className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            New Quiz
          </Link>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Click a quiz to see responses. Copy the share link for takers.
        </p>

        {quizzes.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-10 text-center text-sm text-slate-500">
            No quizzes yet. Create one from New Quiz.
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {quizzes.map((quiz) => (
              <li key={quiz.id}>
                <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    href={`/playground/mcq-quiz/${quiz.slug}/responses`}
                    className="min-w-0 flex-1 transition hover:opacity-90"
                  >
                    <h2 className="truncate font-semibold text-white">
                      {quiz.title}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      {new Date(quiz.created_at).toLocaleString()} ·{" "}
                      {quiz.attempt_count} response
                      {quiz.attempt_count === 1 ? "" : "s"}
                    </p>
                  </Link>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => copyShare(quiz.slug)}
                      className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-400 transition hover:border-emerald-400/40 hover:text-emerald-300"
                    >
                      Copy link
                    </button>
                    <Link
                      href={`/playground/mcq-quiz/${quiz.slug}/responses`}
                      className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
                    >
                      Responses
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
