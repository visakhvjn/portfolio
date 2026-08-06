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
import { ButtonSpinner } from "@/components/playground/ButtonSpinner";
import { useState } from "react";

export type AuthProject = "mcq" | "dynamic-qr";

type AuthPanelProps = {
  open: boolean;
  onClose: () => void;
  nextPath?: string;
  title?: string;
  project?: AuthProject;
};

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export function AuthPanel({
  open,
  onClose,
  nextPath = "/playground/mcq-quiz",
  title = "Sign in",
  project = "mcq",
}: AuthPanelProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const configured =
    project === "dynamic-qr"
      ? isDynamicQrSupabaseConfigured()
      : isMcqSupabaseConfigured();

  const blurb =
    project === "dynamic-qr"
      ? "Sign in with Google to create dynamic QR codes and view scan analytics."
      : "Sign in with Google to create quizzes, take shared quizzes, and view responses.";

  const signInWithGoogle = async () => {
    if (!configured) {
      setStatus("error");
      setMessage(
        project === "dynamic-qr"
          ? "Dynamic QR Supabase is not configured. See .env.example."
          : "MCQ Supabase is not configured. See .env.example.",
      );
      return;
    }

    setStatus("loading");
    setMessage(null);

    try {
      const supabase =
        project === "dynamic-qr" ? createDynamicQrClient() : createMcqClient();
      const callbackPath =
        project === "dynamic-qr"
          ? "/auth/callback/dynamic-qr"
          : "/auth/callback";
      const redirectTo = `${window.location.origin}${callbackPath}?next=${encodeURIComponent(nextPath)}`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });
      if (error) throw error;
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Could not start sign-in.");
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="space-y-4 text-sm text-slate-300">
        <p>{blurb}</p>

        <button
          type="button"
          onClick={() => void signInWithGoogle()}
          disabled={status === "loading"}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 disabled:opacity-50"
        >
          {status === "loading" ? (
            <ButtonSpinner className="h-5 w-5" />
          ) : (
            <GoogleIcon className="h-5 w-5 shrink-0" />
          )}
          {status === "loading" ? "Redirecting…" : "Continue with Google"}
        </button>

        {message ? (
          <p className="text-rose-300" role="status">
            {message}
          </p>
        ) : null}
      </div>
    </Modal>
  );
}
