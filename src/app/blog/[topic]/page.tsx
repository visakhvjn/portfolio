import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { site } from "@/data/site";
import { getPostsByTopic, getTopicBySlug, getTopics } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type TopicPageProps = {
  params: Promise<{ topic: string }>;
};

export function generateStaticParams() {
  return getTopics().map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const { topic: topicSlug } = await params;
  const topic = getTopicBySlug(topicSlug);
  if (!topic) {
    return { title: "Topic not found | Visakh Vijayan" };
  }

  const description =
    topic.description ||
    `Posts about ${topic.title} by Visakh Vijayan.`;

  return {
    title: `${topic.title} | Blog | Visakh Vijayan`,
    description,
    alternates: {
      canonical: `/blog/${topic.slug}`,
    },
    openGraph: {
      title: `${topic.title} | Blog | Visakh Vijayan`,
      description,
      type: "website",
      url: `${site.portfolioUrl}/blog/${topic.slug}`,
    },
  };
}

export default async function BlogTopicPage({ params }: TopicPageProps) {
  const { topic: topicSlug } = await params;
  const topic = getTopicBySlug(topicSlug);
  if (!topic) notFound();

  const posts = getPostsByTopic(topic.slug);

  return (
    <div className="mx-auto max-w-3xl py-10 sm:py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-ink"
      >
        <span aria-hidden>←</span> All posts
      </Link>

      <header className="mt-8">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
          Topic
        </p>
        <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          {topic.title}
        </h1>
        {topic.description ? (
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {topic.description}
          </p>
        ) : null}
      </header>

      {posts.length > 0 ? (
        <ul className="mt-12 divide-y divide-line border-y border-line">
          {posts.map((post) => (
            <li key={post.slug}>
              <BlogPostCard post={post} showTopic={false} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-12 text-ink-soft">
          No posts in this topic yet. Add a{" "}
          <code className="rounded bg-surface px-1 font-mono text-sm text-accent-strong">
            .md
          </code>{" "}
          file under{" "}
          <code className="rounded bg-surface px-1 font-mono text-sm text-accent-strong">
            blog/{topic.slug}/
          </code>
          .
        </p>
      )}
    </div>
  );
}
