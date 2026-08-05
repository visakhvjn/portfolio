"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      subject: data.get("subject") || "Portfolio inquiry",
      message: data.get("message"),
      website: data.get("website"),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { error?: string; mailto?: string };
      if (!res.ok) {
        const hint = json.mailto
          ? " Please try again in a moment, or reach out via LinkedIn."
          : "";
        throw new Error((json.error || "Failed to send") + hint);
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-8 text-center text-slate-200">
        Thanks! Your message was sent. I will get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div>
        <label htmlFor="contact-name" className="mb-1 block text-sm text-slate-400">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1 block text-sm text-slate-400">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50"
        />
      </div>
      <div>
        <label htmlFor="contact-subject" className="mb-1 block text-sm text-slate-400">
          Subject (optional)
        </label>
        <input
          id="contact-subject"
          name="subject"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1 block text-sm text-slate-400">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          minLength={20}
          className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50"
        />
      </div>
      {status === "error" && <p className="text-sm text-red-400">{errorMsg}</p>}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
