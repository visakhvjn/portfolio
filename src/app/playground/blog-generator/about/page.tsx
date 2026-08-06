import { site } from "@/data/site";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Blog Generator | Playground | Visakh Vijayan",
  description:
    "What the Blog Generator does, who it helps, and how to use it with your own OpenAI key.",
  alternates: { canonical: "/playground/blog-generator/about" },
  openGraph: {
    title: "About Blog Generator | Playground",
    url: `${site.portfolioUrl}/playground/blog-generator/about`,
  },
};

export default function BlogGeneratorAboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link href="/playground" className="hover:text-emerald-400">
          Playground
        </Link>
        <span aria-hidden>/</span>
        <Link href="/playground/blog-generator" className="hover:text-emerald-400">
          Blog Generator
        </Link>
        <span aria-hidden>/</span>
        <span className="text-slate-300">About</span>
      </div>
      <h1 className="mt-4 text-2xl font-semibold text-white">About Blog Generator</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">
        A split-pane writing buddy: you chat on the left and a markdown draft appears on the
        right. It is built for turning rough ideas into a publishable first draft quickly.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-slate-300 marker:text-emerald-400/80">
        <li>Bring your own OpenAI key (stored in your browser).</li>
        <li>Iterate with prompts like “make this shorter” or “add examples”.</li>
        <li>Copy markdown and publish anywhere.</li>
      </ul>
      <Link
        href="/playground/blog-generator"
        className="mt-8 inline-flex rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
      >
        Open Blog Generator
      </Link>
    </div>
  );
}
