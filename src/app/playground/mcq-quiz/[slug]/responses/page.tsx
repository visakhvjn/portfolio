import { QuizResponses } from "@/components/playground/mcq/QuizResponses";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function McqQuizResponsesPage({ params }: PageProps) {
  const { slug } = await params;
  return <QuizResponses slug={slug} />;
}
