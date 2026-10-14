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
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="flex items-center gap-2 text-sm text-muted">
        <Link href="/playground" className="transition-colors hover:text-ink">
          Playground
        </Link>
        <span aria-hidden>/</span>
        <Link href="/playground/blog-generator" className="transition-colors hover:text-ink">
          Blog Generator
        </Link>
        <span aria-hidden>/</span>
        <span className="text-ink-soft">About</span>
      </div>
      <h1 className="mt-6 font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">About Blog Generator</h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">
        A split-pane writing buddy: you chat on the left and a markdown draft appears on the
        right. It is built for turning rough ideas into a publishable first draft quickly.
      </p>
      <ul className="mt-8 list-disc space-y-3 border-t border-line pl-5 pt-8 text-base leading-relaxed text-ink-soft marker:text-accent">
        <li>Bring your own OpenAI key (stored in your browser).</li>
        <li>Iterate with prompts like “make this shorter” or “add examples”.</li>
        <li>Copy markdown and publish anywhere.</li>
      </ul>
      <Link
        href="/playground/blog-generator"
        className="mt-10 inline-flex rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-canvas hover:bg-ink-soft"
      >
        Open Blog Generator
      </Link>
    </div>
  );
}
