"use client";

import { createClient } from "@/lib/supabase/client";
import { formatMcqDbError } from "@/lib/mcq/supabase-errors";
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
      setError(
        formatMcqDbError(
          err instanceof Error ? err.message : "Failed to load quizzes.",
        ),
      );
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
      <div className="flex h-full items-center justify-center text-sm text-muted">
        Loading quizzes…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center px-4 text-sm text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-serif text-3xl font-medium tracking-tight text-ink">All Quizzes</h1>
          <Link
            href="/playground/mcq-quiz/new"
            className="rounded-lg bg-ink px-3 py-2 text-sm font-medium text-canvas transition-colors hover:bg-ink-soft"
          >
            New Quiz
          </Link>
        </div>
        <p className="mt-1 text-sm text-muted">
          Click a quiz to see responses. Copy the share link for takers.
        </p>

        {quizzes.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-line-strong bg-surface px-6 py-10 text-center text-sm text-muted">
            No quizzes yet. Create one from New Quiz.
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {quizzes.map((quiz) => (
              <li key={quiz.id}>
                <div className="flex flex-col gap-3 rounded-2xl border border-line bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    href={`/playground/mcq-quiz/${quiz.slug}/responses`}
                    className="min-w-0 flex-1 transition hover:opacity-90"
                  >
                    <h2 className="truncate font-serif text-lg font-medium text-ink">
                      {quiz.title}
                    </h2>
                    <p className="mt-1 text-xs text-muted">
                      {new Date(quiz.created_at).toLocaleString()} ·{" "}
                      {quiz.attempt_count} response
                      {quiz.attempt_count === 1 ? "" : "s"}
                    </p>
                  </Link>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => copyShare(quiz.slug)}
                      className="rounded-lg border border-line px-3 py-2 text-xs font-medium text-ink-soft transition-colors hover:bg-surface hover:text-ink"
                    >
                      Copy link
                    </button>
                    <Link
                      href={`/playground/mcq-quiz/${quiz.slug}/responses`}
                      className="rounded-lg border border-line px-3 py-2 text-xs font-medium text-ink-soft transition-colors hover:bg-surface hover:text-ink"
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
