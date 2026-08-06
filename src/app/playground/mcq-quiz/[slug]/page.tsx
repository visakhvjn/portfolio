import { TakeQuiz } from "@/components/playground/mcq/TakeQuiz";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function TakeMcqQuizPage({ params }: PageProps) {
  const { slug } = await params;
  return <TakeQuiz slug={slug} />;
}
