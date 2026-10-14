"use client";

import { ButtonSpinner } from "@/components/playground/ButtonSpinner";
import { Markdown } from "@/components/blog/Markdown";
import { Modal } from "@/components/Modal";
import Link from "next/link";
import {
  FormEvent,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const STORAGE_KEY = "playground:openai-api-key";

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function BlogGenerator() {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const hydrateKey = useEffectEvent(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) setApiKey(stored);
  });

  useEffect(() => {
    hydrateKey();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const persistKey = (value: string) => {
    setApiKey(value);
    if (value.trim()) {
      window.localStorage.setItem(STORAGE_KEY, value.trim());
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const send = async (event?: FormEvent) => {
    event?.preventDefault();
    const prompt = input.trim();
    if (!prompt || loading) return;

    if (!apiKey.trim()) {
      setError("Paste your OpenAI API key first — this playground is BYO key.");
      return;
    }

    setError(null);
    setInput("");
    const userMessage: ChatMessage = {
      id: newId(),
      role: "user",
      content: prompt,
    };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/playground/blog-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: apiKey.trim(),
          blog,
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = (await res.json()) as {
        blog?: string;
        message?: string;
        error?: string;
      };

      if (!res.ok) {
        throw new Error(data.error || "Something went sideways.");
      }

      if (data.blog) setBlog(data.blog);

      setMessages((prev) => [
        ...prev,
        {
          id: newId(),
          role: "assistant",
          content:
            data.message?.trim() ||
            "Draft updated on the right. Tweak it with another message anytime.",
        },
      ]);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to generate blog.";
      setError(message);
      setMessages((prev) => [
        ...prev,
        {
          id: newId(),
          role: "assistant",
          content: `Couldn't generate that: ${message}`,
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="shrink-0 border-b border-line px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <Link href="/playground" className="hover:text-ink">
                Playground
              </Link>
              <span aria-hidden>/</span>
              <span className="inline-flex items-center gap-1.5 text-ink-soft">
                Blog Generator
                <button
                  type="button"
                  onClick={() => setInfoOpen(true)}
                  aria-label="About Blog Generator"
                  className="rounded-full p-0.5 text-muted transition-colors hover:text-ink"
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
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">
              Chat your brief on the left. The draft grows on the right.
            </p>
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:max-w-md sm:justify-end">
            <Link
              href="/playground/blog-generator/about"
              className="shrink-0 rounded-lg border border-line px-3 py-2 text-xs font-medium text-ink-soft transition-colors hover:bg-surface hover:text-ink"
            >
              About
            </Link>
            <label className="sr-only" htmlFor="openai-key">
              OpenAI API key
            </label>
            <input
              id="openai-key"
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => persistKey(e.target.value)}
              placeholder="sk-… your OpenAI key"
              autoComplete="off"
              spellCheck={false}
              className="min-w-0 flex-1 rounded-lg border border-line-strong bg-card px-3 py-2 font-mono text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
            <button
              type="button"
              onClick={() => setShowKey((v) => !v)}
              className="shrink-0 rounded-lg border border-line px-3 py-2 text-xs font-medium text-ink-soft transition-colors hover:bg-surface hover:text-ink"
            >
              {showKey ? "Hide" : "Show"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid min-h-0 w-full max-w-[1600px] flex-1 grid-cols-1 overflow-hidden lg:grid-cols-2">
        <section className="flex h-full min-h-0 flex-col overflow-hidden border-line lg:border-r">
          <div className="shrink-0 border-b border-line px-4 py-2.5 sm:px-5">
            <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
              Chat
            </h2>
          </div>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-5">
            {messages.length === 0 ? (
              <div className="rounded-xl border border-dashed border-line-strong bg-surface p-4 text-sm leading-relaxed text-muted">
                Try something like: &ldquo;Write a punchy blog post about why
                side projects beat tutorial hell.&rdquo; Then refine: &ldquo;Make
                the intro shorter&rdquo; or &ldquo;Add a section on shipping
                ugly v1s.&rdquo;
              </div>
            ) : null}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "ml-auto bg-accent-soft text-ink"
                    : "mr-auto border border-line bg-card text-ink-soft"
                }`}
              >
                {message.content}
              </div>
            ))}

            {loading ? (
              <div className="mr-auto rounded-2xl border border-line bg-card px-3.5 py-2.5 text-sm text-muted">
                Drafting…
              </div>
            ) : null}
            <div ref={chatEndRef} />
          </div>

          <form
            onSubmit={send}
            className="shrink-0 border-t border-line p-3 sm:p-4"
          >
            {error ? (
              <p className="mb-2 text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={2}
                placeholder="Describe the blog you want… (Enter to send)"
                disabled={loading}
                className="min-h-[72px] flex-1 resize-none rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="inline-flex items-center justify-center gap-2 self-end rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-canvas transition-colors hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? <ButtonSpinner className="h-4 w-4" /> : null}
                {loading ? "Sending…" : "Send"}
              </button>
            </div>
          </form>
        </section>

        <section className="flex h-full min-h-0 flex-col overflow-hidden">
          <div className="flex shrink-0 items-center justify-between border-b border-line px-4 py-2.5 sm:px-5">
            <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
              Blog draft
            </h2>
            {blog ? (
              <button
                type="button"
                onClick={() => {
                  void navigator.clipboard.writeText(blog);
                }}
                className="text-xs font-medium text-muted transition-colors hover:text-ink"
              >
                Copy markdown
              </button>
            ) : null}
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
            {blog ? (
              <article className="max-w-none pb-10">
                <Markdown content={blog} />
              </article>
            ) : (
              <div className="flex h-full min-h-48 items-center justify-center rounded-xl border border-dashed border-line-strong bg-surface px-6 text-center text-sm text-muted">
                Your generated blog will show up here. No draft, no glory.
              </div>
            )}
          </div>
        </section>
      </div>

      <Modal
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        title="About Blog Generator"
        wide
      >
        <div className="space-y-5 text-sm leading-relaxed text-ink-soft">
          <section>
            <h4 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
              What this is
            </h4>
            <p className="mt-2">
              A split-pane writing buddy: you chat on the left, a live markdown
              blog draft appears on the right. It&apos;s a playground experiment
              for turning rough thoughts into a readable post without blank-page
              dread.
            </p>
          </section>

          <section>
            <h4 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
              How it helps day to day
            </h4>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-accent">
              <li>Turn meeting notes or a voice dump into a first draft</li>
              <li>Rewrite LinkedIn / newsletter ideas in a clearer voice</li>
              <li>Outline tutorials, changelogs, or release posts faster</li>
              <li>Iterate tone and structure without starting from scratch</li>
            </ul>
          </section>

          <section>
            <h4 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
              How to use it
            </h4>
            <ol className="mt-2 list-decimal space-y-1.5 pl-5 marker:text-accent">
              <li>
                Paste your own OpenAI API key in the header (stored only in your
                browser).
              </li>
              <li>
                Describe the post you want in the chat — topic, audience, tone.
              </li>
              <li>
                Read the draft on the right, then refine: &ldquo;shorter
                intro,&rdquo; &ldquo;add examples,&rdquo; &ldquo;make it
                funnier.&rdquo;
              </li>
              <li>
                Copy the markdown when you&apos;re happy and paste it wherever
                you publish.
              </li>
            </ol>
          </section>

          <p className="rounded-xl border border-line bg-surface px-4 py-3 text-ink-soft">
            Your key never sits on my server as a stored secret — it&apos;s sent
            with each request so OpenAI can generate the draft. Bring your own
            key; my API budget is not a public park.
          </p>
        </div>
      </Modal>
    </div>
  );
}
