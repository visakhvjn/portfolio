import { BlogGenerator } from "@/components/playground/BlogGenerator";
import { site } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Generator | Playground | Visakh Vijayan",
  description:
    "Chat your way to a blog draft. Bring your own OpenAI API key — nothing runs on mine.",
  alternates: {
    canonical: "/playground/blog-generator",
  },
  openGraph: {
    title: "Blog Generator | Playground",
    description:
      "Chat on the left, blog draft on the right. Bring your own OpenAI key.",
    type: "website",
    url: `${site.portfolioUrl}/playground/blog-generator`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Generator | Playground",
    description:
      "Chat on the left, blog draft on the right. Bring your own OpenAI key.",
  },
};

export default function BlogGeneratorPage() {
  return <BlogGenerator />;
}
