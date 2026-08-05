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
    <div className="py-8 sm:py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition hover:text-emerald-400"
      >
        <span aria-hidden>←</span> All posts
      </Link>

      <header className="mt-6 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-emerald-400/90">
          Topic
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {topic.title}
        </h1>
        {topic.description ? (
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            {topic.description}
          </p>
        ) : null}
      </header>

      {posts.length > 0 ? (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <BlogPostCard post={post} showTopic={false} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-slate-400">
          No posts in this topic yet. Add a{" "}
          <code className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-sm text-emerald-300">
            .md
          </code>{" "}
          file under{" "}
          <code className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-sm text-emerald-300">
            blog/{topic.slug}/
          </code>
          .
        </p>
      )}
    </div>
  );
}
