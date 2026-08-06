"use client";

import { Modal } from "@/components/Modal";
import { createClient } from "@/lib/supabase/client";
import { FormEvent, useState } from "react";

type AuthPanelProps = {
  open: boolean;
  onClose: () => void;
  nextPath?: string;
};

export function AuthPanel({
  open,
  onClose,
  nextPath = "/playground/mcq-quiz",
}: AuthPanelProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  const configured =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const sendMagicLink = async (event: FormEvent) => {
    event.preventDefault();
    if (!configured) {
      setStatus("error");
      setMessage("Supabase is not configured. Add env vars from .env.example.");
      return;
    }

    const trimmed = email.trim();
    if (!trimmed) return;

    setStatus("sending");
    setMessage(null);

    try {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`;
      const { error } = await supabase.auth.signInWithOtp({
        email: trimmed,
        options: { emailRedirectTo: redirectTo },
      });
      if (error) throw error;
      setStatus("sent");
      setMessage("Check your email for the magic link.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Could not send link.");
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Sign in to MCQ Quiz">
      <div className="space-y-4 text-sm text-slate-300">
        <p>
          Sign in with an email magic link to create quizzes, share them, and
          collect responses.
        </p>

        <form onSubmit={sendMagicLink} className="space-y-3">
          <label className="sr-only" htmlFor="mcq-auth-email">
            Email
          </label>
          <input
            id="mcq-auth-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-emerald-400/50 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "sending" || !email.trim()}
            className="w-full rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50"
          >
            {status === "sending" ? "Sending…" : "Send magic link"}
          </button>
        </form>

        {message ? (
          <p
            className={
              status === "error" ? "text-rose-300" : "text-emerald-300/90"
            }
            role="status"
          >
            {message}
          </p>
        ) : null}
      </div>
    </Modal>
  );
}
