import { site } from "@/data/site";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About QR Generator | Playground | Visakh Vijayan",
  description:
    "What the static QR Generator does and when to use it versus Dynamic QR.",
  alternates: { canonical: "/playground/qr-generator/about" },
  openGraph: {
    title: "About QR Generator | Playground",
    url: `${site.portfolioUrl}/playground/qr-generator/about`,
  },
};

export default function QrGeneratorAboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/playground" className="transition-colors hover:text-ink">
          Playground
        </Link>
        <span aria-hidden>/</span>
        <Link href="/playground/qr-generator" className="transition-colors hover:text-ink">
          QR Generator
        </Link>
        <span aria-hidden>/</span>
        <span className="text-ink-soft">About</span>
      </div>
      <h1 className="mt-6 font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">About QR Generator</h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">
        This is a static QR tool. Paste a URL, generate a QR PNG, and download it. No account,
        no short links, and no tracking.
      </p>
      <ul className="mt-8 list-disc space-y-3 border-t border-line pl-5 pt-8 text-base leading-relaxed text-ink-soft marker:text-accent">
        <li>Runs client-side in the browser.</li>
        <li>Best for one-off links that rarely change.</li>
        <li>Use Dynamic QR when you need scan analytics or editable destinations.</li>
      </ul>
      <Link
        href="/playground/qr-generator"
        className="mt-10 inline-flex rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-canvas hover:bg-ink-soft"
      >
        Open QR Generator
      </Link>
    </div>
  );
}
