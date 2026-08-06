"use client";

import { ButtonSpinner } from "@/components/playground/ButtonSpinner";
import { AuthPanel } from "@/components/playground/mcq/AuthPanel";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";

function navClass(active: boolean) {
  return `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    active ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
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
      <div className="shrink-0 border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <div className="mr-2 flex items-center gap-2 text-sm text-slate-500">
              <Link href="/playground" className="hover:text-emerald-400">
                Playground
              </Link>
              <span aria-hidden>/</span>
              <span className="text-slate-300">MCQ Quiz</span>
            </div>
            <nav className="flex items-center gap-1">
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
                <span className="hidden max-w-[200px] truncate text-xs text-slate-500 sm:inline">
                  {user.email}
                </span>
                <button
                  type="button"
                  onClick={() => void signOut()}
                  disabled={signingOut}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-400 transition hover:border-white/20 hover:text-white disabled:opacity-60"
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
                className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400"
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
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400/80">
                Playground · MCQ Quiz
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Paste MCQs. Ship a shareable quiz.
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">
                Drop questions from ChatGPT, Claude, or your notes. OpenAI turns
                them into a clean quiz, you save it, share a link, and see who
                scored what — without building a form by hand.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setAuthOpen(true)}
                  className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  Sign in with Google
                </button>
                <Link
                  href="/playground"
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
                >
                  Back to Playground
                </Link>
              </div>

              <div className="mt-14 grid gap-4 sm:grid-cols-3">
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
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <h2 className="text-sm font-semibold text-white">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>

              <section className="mt-14">
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Why it exists
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  AI assistants spit out great practice questions — then they
                  die in a chat scroll. This playground keeps them alive as
                  quizzes you can actually hand to a classmate, hiree, or study
                  group, with responses you can revisit.
                </p>
              </section>

              <section className="mt-10 rounded-2xl border border-amber-400/20 bg-amber-400/5 px-5 py-4">
                <h2 className="text-sm font-semibold text-amber-100">
                  What you&apos;ll need
                </h2>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-amber-100/80 marker:text-amber-400/80">
                  <li>A Google account to sign in</li>
                  <li>
                    Your own OpenAI API key when you parse MCQs (stored only in
                    your browser)
                  </li>
                </ul>
              </section>

              <div className="mt-12 border-t border-white/10 pt-8 text-center">
                <p className="text-sm text-slate-500">
                  Ready when you are — sign in with Google to get started.
                </p>
                <button
                  type="button"
                  onClick={() => setAuthOpen(true)}
                  className="mt-4 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
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
