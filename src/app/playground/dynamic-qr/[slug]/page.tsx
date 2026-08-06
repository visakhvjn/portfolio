import { DynamicQrAnalytics } from "@/components/playground/dynamic-qr/DynamicQrAnalytics";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DynamicQrDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <DynamicQrAnalytics slug={slug} />;
}
