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
    <div className="h-full overflow-y-auto px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/playground" className="hover:text-emerald-400">
            Playground
          </Link>
          <span aria-hidden>/</span>
          <Link href="/playground/mcq-quiz" className="hover:text-emerald-400">
            MCQ Quiz
          </Link>
          <span aria-hidden>/</span>
          <span className="text-slate-300">About</span>
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-white">About MCQ Quiz</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Paste messy MCQ text, parse it using your own OpenAI key, save it as a quiz, and share
          one link for takers. Responses and scores are stored per quiz owner.
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-slate-300 marker:text-emerald-400/80">
          <li>Creator and takers sign in with Google.</li>
          <li>Parsing uses your OpenAI key in-browser.</li>
          <li>Owners can review responses and answer-level breakdowns.</li>
        </ul>
        <Link
          href="/playground/mcq-quiz/new"
          className="mt-8 inline-flex rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
        >
          Create a quiz
        </Link>
      </div>
    </div>
  );
}
