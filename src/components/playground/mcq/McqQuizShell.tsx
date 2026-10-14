"use client";

import { ButtonSpinner } from "@/components/playground/ButtonSpinner";
import { AuthPanel } from "@/components/playground/mcq/AuthPanel";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";

function navClass(active: boolean) {
  return `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
    active ? "bg-card text-ink shadow-sm" : "text-muted hover:text-ink"
  }`;
}

export function McqQuizShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const hydrate = useEffectEvent(async () => {
    try {
      const supabase = createClient();
      const {
        data: { user: current },
      } = await supabase.auth.getUser();
      setUser(current);
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
      setReady(true);
      return () => subscription.unsubscribe();
    } catch {
      setReady(true);
      return () => undefined;
    }
  });

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    void hydrate().then((fn) => {
      cleanup = fn;
    });
    return () => cleanup?.();
  }, []);

  const signOut = async () => {
    setSigningOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setUser(null);
    } catch {
      // ignore
    } finally {
      setSigningOut(false);
    }
  };

  const onNew = pathname.endsWith("/new");
  const onAll =
    pathname === "/playground/mcq-quiz" ||
    pathname === "/playground/mcq-quiz/";
  const onAbout = pathname === "/playground/mcq-quiz/about";
  const showLanding = ready && !user && !onAbout;

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="shrink-0 border-b border-line bg-canvas px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <div className="mr-2 flex items-center gap-2 text-sm text-muted">
              <Link href="/playground" className="hover:text-ink">
                Playground
              </Link>
              <span aria-hidden>/</span>
              <span className="text-ink-soft">MCQ Quiz</span>
            </div>
            <nav className="flex items-center gap-1 rounded-xl border border-line bg-surface p-1">
              <Link
                href="/playground/mcq-quiz/new"
                className={navClass(onNew)}
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault();
                    setAuthOpen(true);
                  }
                }}
              >
                New Quiz
              </Link>
              <Link
                href="/playground/mcq-quiz"
                className={navClass(onAll)}
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault();
                    setAuthOpen(true);
                  }
                }}
              >
                All Quizzes
              </Link>
              <Link href="/playground/mcq-quiz/about" className={navClass(onAbout)}>
                About
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {ready && user ? (
              <>
                <span className="hidden max-w-[200px] truncate text-xs text-muted sm:inline">
                  {user.email}
                </span>
                <button
                  type="button"
                  onClick={() => void signOut()}
                  disabled={signingOut}
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-xs font-medium text-ink-soft transition-colors hover:bg-surface hover:text-ink disabled:opacity-60"
                >
                  {signingOut ? (
                    <>
                      <ButtonSpinner className="h-3.5 w-3.5" />
                      Signing out…
                    </>
                  ) : (
                    "Sign out"
                  )}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setAuthOpen(true)}
                className="rounded-lg bg-ink px-3 py-2 text-xs font-medium text-canvas transition-colors hover:bg-ink-soft"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        {showLanding ? (
          <div className="h-full overflow-y-auto">
            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                Playground · MCQ Quiz
              </p>
              <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
                Paste MCQs. Ship a shareable quiz.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
                Drop questions from ChatGPT, Claude, or your notes. OpenAI turns
                them into a clean quiz, you save it, share a link, and see who
                scored what — without building a form by hand.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setAuthOpen(true)}
                  className="rounded-lg bg-ink px-5 py-3 text-sm font-medium text-canvas transition-colors hover:bg-ink-soft"
                >
                  Sign in with Google
                </button>
                <Link
                  href="/playground"
                  className="rounded-lg border border-line-strong bg-card px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface"
                >
                  Back to Playground
                </Link>
              </div>

              <div className="mt-16 grid gap-5 sm:grid-cols-3">
                {[
                  {
                    title: "Paste → parse",
                    body: "Bring messy MCQ text. Your OpenAI key structures it into questions and answers.",
                  },
                  {
                    title: "Share a link",
                    body: "Save the quiz and send one URL. Takers sign in with Google and submit once.",
                  },
                  {
                    title: "See responses",
                    body: "Open All Quizzes, click a quiz, and review scores plus each answer.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-line bg-card p-6"
                  >
                    <h2 className="font-serif text-lg font-medium text-ink">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>

              <section className="mt-14">
                <h2 className="font-serif text-xl font-medium text-ink">
                  Why it exists
                </h2>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">
                  AI assistants spit out great practice questions — then they
                  die in a chat scroll. This playground keeps them alive as
                  quizzes you can actually hand to a classmate, hiree, or study
                  group, with responses you can revisit.
                </p>
              </section>

              <section className="mt-10 rounded-2xl border border-line bg-surface px-6 py-5">
                <h2 className="font-serif text-lg font-medium text-ink">
                  What you&apos;ll need
                </h2>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-soft marker:text-accent">
                  <li>A Google account to sign in</li>
                  <li>
                    Your own OpenAI API key when you parse MCQs (stored only in
                    your browser)
                  </li>
                </ul>
              </section>

              <div className="mt-16 border-t border-line pt-10 text-center">
                <p className="text-sm text-muted">
                  Ready when you are — sign in with Google to get started.
                </p>
                <button
                  type="button"
                  onClick={() => setAuthOpen(true)}
                  className="mt-4 rounded-lg bg-ink px-5 py-3 text-sm font-medium text-canvas transition-colors hover:bg-ink-soft"
                >
                  Get started
                </button>
              </div>
            </div>
          </div>
        ) : (
          children
        )}
      </div>

      <AuthPanel
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        title="Sign in to MCQ Quiz"
        project="mcq"
        nextPath={pathname.startsWith("/playground/mcq-quiz") ? pathname : "/playground/mcq-quiz"}
      />
    </div>
  );
}
