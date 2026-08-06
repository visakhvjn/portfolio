import { AllQuizzesList } from "@/components/playground/mcq/AllQuizzesList";
import { site } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCQ Quiz | Playground | Visakh Vijayan",
  description:
    "Paste MCQs, parse with OpenAI, save quizzes, share links, and collect responses.",
  alternates: { canonical: "/playground/mcq-quiz" },
  openGraph: {
    title: "MCQ Quiz | Playground",
    description:
      "Paste MCQs, parse with OpenAI, save and share quizzes with response tracking.",
    type: "website",
    url: `${site.portfolioUrl}/playground/mcq-quiz`,
  },
};

export default function McqQuizIndexPage() {
  return <AllQuizzesList />;
}
