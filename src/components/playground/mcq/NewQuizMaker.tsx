"use client";

import { Modal } from "@/components/Modal";
import {
  QuizPlayer,
} from "@/components/playground/mcq/QuizPlayer";
import {
  type ParsedQuestion,
  slugifyTitle,
} from "@/lib/mcq/parse";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";

const STORAGE_KEY = "playground:openai-api-key";

export function NewQuizMaker() {
  const router = useRouter();
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [raw, setRaw] = useState("");
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<ParsedQuestion[]>([]);
  const [parsing, setParsing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);

  const hydrateKey = useEffectEvent(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) setApiKey(stored);
  });

  useEffect(() => {
    hydrateKey();
  }, []);

  const persistKey = (value: string) => {
    setApiKey(value);
    if (value.trim()) {
      window.localStorage.setItem(STORAGE_KEY, value.trim());
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const parseWithOpenAi = async () => {
    if (!apiKey.trim()) {
      setError("Paste your OpenAI API key first — parsing is BYO key.");
      return;
    }
    if (!raw.trim()) {
      setError("Paste MCQ text on the left first.");
      return;
    }

    setParsing(true);
    setError(null);
    setShareUrl(null);

    try {
      const res = await fetch("/api/playground/mcq-parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: apiKey.trim(), text: raw }),
      });
      const data = (await res.json()) as {
        title?: string;
        questions?: ParsedQuestion[];
        error?: string;
      };
      if (!res.ok) throw new Error(data.error || "Parse failed.");

      setQuestions(data.questions ?? []);
      if (data.title && !title.trim()) setTitle(data.title);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Parse failed.");
      setQuestions([]);
    } finally {
      setParsing(false);
    }
  };

  const saveQuiz = async () => {
    if (questions.length === 0) {
      setError("Parse questions before saving.");
      return;
    }
    const quizTitle = title.trim() || "Untitled quiz";
    setSaving(true);
    setError(null);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Sign in required to save.");

      const slug = slugifyTitle(quizTitle);
      const { data: quiz, error: quizError } = await supabase
        .from("quizzes")
        .insert({
          owner_id: user.id,
          title: quizTitle,
          slug,
        })
        .select("id, slug")
        .single();

      if (quizError || !quiz) {
        throw new Error(quizError?.message || "Could not create quiz.");
      }

      const rows = questions.map((q, i) => ({
        quiz_id: quiz.id,
        position: i,
        prompt: q.prompt,
        options: q.options,
        correct_index: q.correctIndex,
      }));

      const { error: qError } = await supabase
        .from("quiz_questions")
        .insert(rows);
      if (qError) throw new Error(qError.message);

      const url = `${window.location.origin}/playground/mcq-quiz/${quiz.slug}`;
      setShareUrl(url);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="shrink-0 border-b border-white/5 px-4 py-2.5 sm:px-6">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-semibold text-white">New Quiz</h1>
            <button
              type="button"
              onClick={() => setInfoOpen(true)}
              aria-label="About MCQ Quiz"
              className="rounded-full p-0.5 text-slate-500 transition hover:text-emerald-400"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:max-w-md sm:justify-end">
            <input
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => persistKey(e.target.value)}
              placeholder="sk-… OpenAI key for parsing"
              autoComplete="off"
              spellCheck={false}
              className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-sm text-slate-200 placeholder:text-slate-600 focus:border-emerald-400/50 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowKey((v) => !v)}
              className="shrink-0 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-400 transition hover:border-white/20 hover:text-white"
            >
              {showKey ? "Hide" : "Show"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid min-h-0 w-full max-w-[1600px] flex-1 grid-cols-1 overflow-hidden lg:grid-cols-2">
        <section className="flex h-full min-h-0 flex-col overflow-hidden border-white/10 lg:border-r">
          <div className="shrink-0 space-y-3 border-b border-white/5 px-4 py-3 sm:px-5">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Title
              </span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Quiz title"
                className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:border-emerald-400/50 focus:outline-none"
              />
            </label>
          </div>
          <div className="min-h-0 flex-1 p-4 sm:p-5">
            <textarea
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              placeholder={`Paste MCQs from any AI assistant, e.g.\n\n1. What is…?\nA) …\nB) …\nC) …\nD) …\nAnswer: B`}
              className="h-full min-h-[240px] w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 font-mono text-sm leading-relaxed text-slate-100 placeholder:text-slate-600 focus:border-emerald-400/50 focus:outline-none"
            />
          </div>
          <div className="shrink-0 space-y-2 border-t border-white/10 p-3 sm:p-4">
            {error ? (
              <p className="text-sm text-rose-300" role="alert">
                {error}
              </p>
            ) : null}
            {shareUrl ? (
              <p className="break-all text-sm text-emerald-300/90">
                Saved. Share:{" "}
                <a href={shareUrl} className="underline">
                  {shareUrl}
                </a>
                <button
                  type="button"
                  className="ml-2 text-xs text-slate-400 hover:text-emerald-400"
                  onClick={() => void navigator.clipboard.writeText(shareUrl)}
                >
                  Copy
                </button>
              </p>
            ) : null}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void parseWithOpenAi()}
                disabled={parsing}
                className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50"
              >
                {parsing ? "Parsing with AI…" : "Parse with OpenAI"}
              </button>
              <button
                type="button"
                onClick={() => void saveQuiz()}
                disabled={saving || questions.length === 0}
                className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20 disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save & get share link"}
              </button>
            </div>
          </div>
        </section>

        <section className="flex h-full min-h-0 flex-col overflow-hidden">
          <div className="shrink-0 border-b border-white/5 px-4 py-2.5 sm:px-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Quiz preview
            </h2>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
            <QuizPlayer questions={questions} mode="preview" />
          </div>
        </section>
      </div>

      <Modal
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        title="About MCQ Quiz"
        wide
      >
        <div className="space-y-5 text-sm leading-relaxed text-slate-300">
          <section>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              What this is
            </h4>
            <p className="mt-2">
              Paste MCQs from ChatGPT, Claude, or notes. OpenAI turns them into
              structured quiz JSON. Preview on the right, save, share a link,
              and collect responses from logged-in takers.
            </p>
          </section>
          <section>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              How to use
            </h4>
            <ol className="mt-2 list-decimal space-y-1.5 pl-5 marker:text-emerald-400/80">
              <li>Sign in with an email magic link.</li>
              <li>Paste your OpenAI key (stored in your browser only).</li>
              <li>Paste MCQ text → Parse with OpenAI → review preview.</li>
              <li>Save to get a share link. Open All Quizzes to see responses.</li>
            </ol>
          </section>
        </div>
      </Modal>
    </div>
  );
}
