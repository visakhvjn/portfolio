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
    <div className="mx-auto max-w-3xl py-10 sm:py-16">
      <header className="mb-12">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
          Writing
        </p>
        <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          Blog
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Notes on engineering, AI, and shipping software.
        </p>
      </header>
      {topics.length > 0 ? (
        <section>
          <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
            Topics
          </h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
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
