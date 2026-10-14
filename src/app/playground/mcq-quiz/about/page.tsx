import { site } from "@/data/site";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About MCQ Quiz | Playground | Visakh Vijayan",
  description:
    "What the MCQ Quiz playground does, how it uses OpenAI parsing, and how sharing and responses work.",
  alternates: { canonical: "/playground/mcq-quiz/about" },
  openGraph: {
    title: "About MCQ Quiz | Playground",
    url: `${site.portfolioUrl}/playground/mcq-quiz/about`,
  },
};

export default function McqQuizAboutPage() {
  return (
    <div className="h-full overflow-y-auto px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-2 text-sm text-muted">
          <Link href="/playground" className="transition-colors hover:text-ink">
            Playground
          </Link>
          <span aria-hidden>/</span>
          <Link href="/playground/mcq-quiz" className="transition-colors hover:text-ink">
            MCQ Quiz
          </Link>
          <span aria-hidden>/</span>
          <span className="text-ink-soft">About</span>
        </div>
        <h1 className="mt-6 font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">About MCQ Quiz</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          Paste messy MCQ text, parse it using your own OpenAI key, save it as a quiz, and share
          one link for takers. Responses and scores are stored per quiz owner.
        </p>
        <ul className="mt-8 list-disc space-y-3 border-t border-line pl-5 pt-8 text-base leading-relaxed text-ink-soft marker:text-accent">
          <li>Creator and takers sign in with Google.</li>
          <li>Parsing uses your OpenAI key in-browser.</li>
          <li>Owners can review responses and answer-level breakdowns.</li>
        </ul>
        <Link
          href="/playground/mcq-quiz/new"
          className="mt-10 inline-flex rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-canvas hover:bg-ink-soft"
        >
          Create a quiz
        </Link>
      </div>
    </div>
  );
}
