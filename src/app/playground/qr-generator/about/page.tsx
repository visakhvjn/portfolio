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
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/playground" className="hover:text-emerald-400">
          Playground
        </Link>
        <span aria-hidden>/</span>
        <Link href="/playground/qr-generator" className="hover:text-emerald-400">
          QR Generator
        </Link>
        <span aria-hidden>/</span>
        <span className="text-slate-300">About</span>
      </div>
      <h1 className="mt-4 text-2xl font-semibold text-white">About QR Generator</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">
        This is a static QR tool. Paste a URL, generate a QR PNG, and download it. No account,
        no short links, and no tracking.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-slate-300 marker:text-emerald-400/80">
        <li>Runs client-side in the browser.</li>
        <li>Best for one-off links that rarely change.</li>
        <li>Use Dynamic QR when you need scan analytics or editable destinations.</li>
      </ul>
      <Link
        href="/playground/qr-generator"
        className="mt-8 inline-flex rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
      >
        Open QR Generator
      </Link>
    </div>
  );
}
