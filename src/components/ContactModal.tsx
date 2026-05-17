"use client";

import { site } from "@/data/site";
import { FormEvent, useState } from "react";
import { Modal } from "./Modal";

type ContactModalProps = { open: boolean; onClose: () => void };

export function ContactModal({ open, onClose }: ContactModalProps) {
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
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = (await res.json()) as { error?: string; mailto?: string };
      if (!res.ok) {
        const hint = json.mailto
          ? ` Email me at ${site.email} instead.`
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

  return (
    <Modal open={open} onClose={onClose} title="Contact me">
      {status === "success" ? (
        <p className="text-center text-slate-300">Thanks! Your message was sent. I will get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <div>
            <label htmlFor="name" className="mb-1 block text-sm text-slate-400">Name</label>
            <input id="name" name="name" required className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50" />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-slate-400">Email</label>
            <input id="email" name="email" type="email" required className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50" />
          </div>
          <div>
            <label htmlFor="subject" className="mb-1 block text-sm text-slate-400">Subject (optional)</label>
            <input id="subject" name="subject" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50" />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm text-slate-400">Message</label>
            <textarea id="message" name="message" required rows={4} minLength={20} className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500/50" />
          </div>
          {status === "error" && <p className="text-sm text-red-400">{errorMsg}</p>}
          <p className="text-xs text-slate-500">
            Or email{" "}
            <a href={`mailto:${site.email}`} className="text-emerald-400 hover:underline">
              {site.email}
            </a>
            {" · "}
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline"
            >
              WhatsApp (+91 {site.whatsapp})
            </a>
          </p>
          <button type="submit" disabled={status === "loading"} className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-60">
            {status === "loading" ? "Sending…" : "Send message"}
          </button>
        </form>
      )}
    </Modal>
  );
}
