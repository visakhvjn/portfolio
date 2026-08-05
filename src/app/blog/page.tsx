import { TopicCard } from "@/components/blog/TopicCard";
import { site } from "@/data/site";
import { getTopics } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Visakh Vijayan",
  description:
    "Writing by Visakh Vijayan on engineering, React, Next.js, and shipping software.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Visakh Vijayan",
    description:
      "Notes on engineering, React, Next.js, and shipping software.",
    type: "website",
    url: `${site.portfolioUrl}/blog`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Visakh Vijayan",
    description:
      "Notes on engineering, React, Next.js, and shipping software.",
  },
};

export default function BlogIndexPage() {
  const topics = getTopics();

  return (
    <div className="py-8 sm:py-12">
      {topics.length > 0 ? (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Topics
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {topics.map((topic) => (
              <li key={topic.slug}>
                <TopicCard topic={topic} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
