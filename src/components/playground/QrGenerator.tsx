"use client";

import { ButtonSpinner } from "@/components/playground/ButtonSpinner";
import { Modal } from "@/components/Modal";
import Link from "next/link";
import QRCode from "qrcode";
import { FormEvent, useState } from "react";

function normalizeUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const withScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const url = new URL(withScheme);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

function downloadPng(dataUrl: string, filename: string) {
  const anchor = document.createElement("a");
  anchor.href = dataUrl;
  anchor.download = filename;
  anchor.click();
}

export function QrGenerator() {
  const [input, setInput] = useState("");
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [encodedUrl, setEncodedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const generate = async (event?: FormEvent) => {
    event?.preventDefault();
    const url = normalizeUrl(input);
    if (!url) {
      setError("Enter a valid URL (e.g. example.com or https://example.com).");
      setDataUrl(null);
      setEncodedUrl(null);
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const next = await QRCode.toDataURL(url, {
        width: 512,
        margin: 2,
        color: {
          dark: "#141413",
          light: "#ffffff",
        },
      });
      setDataUrl(next);
      setEncodedUrl(url);
    } catch {
      setError("Couldn't generate that QR. Try another URL.");
      setDataUrl(null);
      setEncodedUrl(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/playground" className="hover:text-ink">
          Playground
        </Link>
        <span aria-hidden>/</span>
        <span className="inline-flex items-center gap-1.5 text-ink-soft">
          QR Generator
          <button
            type="button"
            onClick={() => setInfoOpen(true)}
            aria-label="About QR Generator"
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
        Paste a URL, generate a QR, download the PNG.
      </p>
      <div className="mt-3">
        <Link
          href="/playground/qr-generator/about"
          className="inline-flex rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:bg-surface hover:text-ink"
        >
          About this project
        </Link>
      </div>

      <form onSubmit={generate} className="mt-8 space-y-3">
        <label htmlFor="qr-url" className="sr-only">
          URL
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="qr-url"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://example.com"
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 rounded-lg border border-line-strong bg-card px-3.5 py-3 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-medium text-canvas transition-colors hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? <ButtonSpinner className="h-4 w-4" /> : null}
            {loading ? "Generating…" : "Generate"}
          </button>
        </div>
        {error ? (
          <p className="text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}
      </form>

      <div className="mt-8">
        {dataUrl && encodedUrl ? (
          <div className="rounded-2xl border border-line bg-card p-6">
            <div className="flex flex-col items-center gap-5">
              <div className="rounded-xl border border-line bg-card p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dataUrl}
                  alt={`QR code for ${encodedUrl}`}
                  width={256}
                  height={256}
                  className="h-64 w-64"
                />
              </div>
              <p className="max-w-md break-all text-center text-xs text-muted">
                {encodedUrl}
              </p>
              <p className="max-w-sm text-center text-sm text-muted">
                Generating another QR replaces this preview. Downloads you already
                saved stay on your device.
              </p>
              <button
                type="button"
                onClick={() =>
                  downloadPng(dataUrl, `qr-${Date.now()}.png`)
                }
                className="rounded-lg border border-line-strong bg-card px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface"
              >
                Download PNG
              </button>
            </div>
          </div>
        ) : (
          <div className="flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-line-strong bg-surface px-6 text-center text-sm text-muted">
            Your QR will show up here once you generate one.
          </div>
        )}
      </div>

      <Modal
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        title="About QR Generator"
        wide
      >
        <div className="space-y-5 text-sm leading-relaxed text-ink-soft">
          <section>
            <h4 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
              What this is
            </h4>
            <p className="mt-2">
              A static QR maker: paste a URL, get a scannable code, download the
              PNG. Everything runs in your browser — no accounts, no short links,
              no scan tracking.
            </p>
          </section>

          <section>
            <h4 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
              How it helps day to day
            </h4>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-accent">
              <li>Put a link on a slide, poster, or business card</li>
              <li>Share a portfolio, menu, or Wi‑Fi signup page in one scan</li>
              <li>Skip the signup walls on commercial QR tools</li>
            </ul>
          </section>

          <section>
            <h4 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
              How to use it
            </h4>
            <ol className="mt-2 list-decimal space-y-1.5 pl-5 marker:text-accent">
              <li>Paste a URL (with or without https://).</li>
              <li>Hit Generate and check the preview.</li>
              <li>Download the PNG when you&apos;re happy.</li>
              <li>
                Generate again anytime — the on-page preview is replaced; saved
                downloads are untouched.
              </li>
            </ol>
          </section>
        </div>
      </Modal>
    </div>
  );
}
