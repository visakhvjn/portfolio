"use client";

import {
  normalizeDestinationUrl,
  slugifyDynamicQrTitle,
} from "@/lib/dynamic-qr/types";
import { createClient } from "@/lib/supabase/dynamic-qr/client";
import QRCode from "qrcode";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

export function NewDynamicQrForm() {
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [analyticsSlug, setAnalyticsSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!shortUrl) {
      setQrDataUrl(null);
      return;
    }
    void QRCode.toDataURL(shortUrl, {
      width: 400,
      margin: 2,
      color: { dark: "#0f172a", light: "#ffffff" },
    }).then(setQrDataUrl);
  }, [shortUrl]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const dest = normalizeDestinationUrl(destination);
    if (!dest) {
      setError("Enter a valid destination URL.");
      return;
    }
    const quizTitle = title.trim() || "Untitled QR";
    setSaving(true);
    setError(null);
    setShortUrl(null);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Sign in required.");

      const slug = slugifyDynamicQrTitle(quizTitle);
      const { data, error: insertError } = await supabase
        .from("dynamic_qr_links")
        .insert({
          owner_id: user.id,
          title: quizTitle,
          slug,
          destination_url: dest,
        })
        .select("slug")
        .single();

      if (insertError || !data) {
        throw new Error(insertError?.message || "Could not create QR.");
      }

      const url = `${window.location.origin}/r/${data.slug}`;
      setShortUrl(url);
      setAnalyticsSlug(data.slug);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto px-4 py-6 sm:px-6">
      <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
        <div>
          <h1 className="text-xl font-semibold text-white">New dynamic QR</h1>
          <p className="mt-1 text-sm text-slate-500">
            We generate a short link and QR. Scans hit{" "}
            <code className="text-slate-400">/r/your-slug</code>, get logged,
            then redirect.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Label
              </span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Menu board, conference booth…"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-slate-100 focus:border-emerald-400/50 focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Destination URL
              </span>
              <input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="https://example.com/landing"
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-slate-100 focus:border-emerald-400/50 focus:outline-none"
              />
            </label>
            {error ? (
              <p className="text-sm text-rose-300" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50"
            >
              {saving ? "Creating…" : "Create QR"}
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          {qrDataUrl && shortUrl ? (
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-xl bg-white p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrDataUrl}
                  alt="Dynamic QR code"
                  width={220}
                  height={220}
                  className="h-56 w-56"
                />
              </div>
              <p className="break-all text-center text-xs text-slate-500">
                {shortUrl}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => void navigator.clipboard.writeText(shortUrl)}
                  className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-300"
                >
                  Copy link
                </button>
                <a
                  href={qrDataUrl}
                  download={`dynamic-qr-${Date.now()}.png`}
                  className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300"
                >
                  Download PNG
                </a>
                {analyticsSlug ? (
                  <Link
                    href={`/playground/dynamic-qr/${analyticsSlug}`}
                    className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-300"
                  >
                    View analytics
                  </Link>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="flex min-h-64 items-center justify-center text-center text-sm text-slate-500">
              Your QR preview shows up here after you create one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
