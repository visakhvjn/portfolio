"use client";

import { Modal } from "@/components/Modal";
import {
  createClient as createMcqClient,
  isMcqSupabaseConfigured,
} from "@/lib/supabase/client";
import {
  createClient as createDynamicQrClient,
  isDynamicQrSupabaseConfigured,
} from "@/lib/supabase/dynamic-qr/client";
import { FormEvent, useState } from "react";

export type AuthProject = "mcq" | "dynamic-qr";

type AuthPanelProps = {
  open: boolean;
  onClose: () => void;
  nextPath?: string;
  title?: string;
  project?: AuthProject;
};

export function AuthPanel({
  open,
  onClose,
  nextPath = "/playground/mcq-quiz",
  title = "Sign in",
  project = "mcq",
}: AuthPanelProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  const configured =
    project === "dynamic-qr"
      ? isDynamicQrSupabaseConfigured()
      : isMcqSupabaseConfigured();

  const blurb =
    project === "dynamic-qr"
      ? "Sign in to Dynamic QR with an email magic link (this app’s own Supabase project)."
      : "Sign in to MCQ Quiz with an email magic link (this app’s own Supabase project).";

  const sendMagicLink = async (event: FormEvent) => {
    event.preventDefault();
    if (!configured) {
      setStatus("error");
      setMessage(
        project === "dynamic-qr"
          ? "Dynamic QR Supabase is not configured. See supabase/dynamic-qr/ and .env.example."
          : "MCQ Supabase is not configured. See supabase/mcq-quiz/ and .env.example.",
      );
      return;
    }

    const trimmed = email.trim();
    if (!trimmed) return;

    setStatus("sending");
    setMessage(null);

    try {
      const supabase =
        project === "dynamic-qr" ? createDynamicQrClient() : createMcqClient();
      const callbackPath =
        project === "dynamic-qr"
          ? "/auth/callback/dynamic-qr"
          : "/auth/callback";
      const redirectTo = `${window.location.origin}${callbackPath}?next=${encodeURIComponent(nextPath)}`;
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

  const inputId =
    project === "dynamic-qr" ? "dynamic-qr-auth-email" : "mcq-auth-email";

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="space-y-4 text-sm text-slate-300">
        <p>{blurb}</p>

        <form onSubmit={sendMagicLink} className="space-y-3">
          <label className="sr-only" htmlFor={inputId}>
            Email
          </label>
          <input
            id={inputId}
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
