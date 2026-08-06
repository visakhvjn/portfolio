import { NewQuizMaker } from "@/components/playground/mcq/NewQuizMaker";
import { site } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Quiz | MCQ Quiz | Playground",
  description:
    "Paste MCQs from any AI assistant and parse them into a shareable quiz.",
  alternates: { canonical: "/playground/mcq-quiz/new" },
  openGraph: {
    title: "New Quiz | MCQ Quiz",
    description: "Paste MCQs and parse them into a shareable quiz with OpenAI.",
    type: "website",
    url: `${site.portfolioUrl}/playground/mcq-quiz/new`,
  },
};

export default function NewMcqQuizPage() {
  return <NewQuizMaker />;
}
