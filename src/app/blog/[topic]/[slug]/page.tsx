import { Markdown } from "@/components/blog/Markdown";
import { site } from "@/data/site";
import {
  formatPostDate,
  getAllPostParams,
  getPost,
  getPostsByTopic,
} from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PostPageProps = {
  params: Promise<{ topic: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllPostParams();
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { topic, slug } = await params;
  const post = getPost(topic, slug);
  if (!post) {
    return { title: "Post not found | Visakh Vijayan" };
  }

  const description =
    post.description || `A post by Visakh Vijayan on ${post.topicTitle}.`;

  return {
    title: `${post.title} | Visakh Vijayan`,
    description,
    alternates: {
      canonical: `/blog/${post.topic}/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: `${site.portfolioUrl}/blog/${post.topic}/${post.slug}`,
      ...(post.date ? { publishedTime: post.date } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { topic, slug } = await params;
  const post = getPost(topic, slug);
  if (!post) notFound();

  const formattedDate = formatPostDate(post.date);
  const siblings = getPostsByTopic(post.topic).filter((p) => p.slug !== post.slug);
  const related = siblings.slice(0, 2);

  return (
    <article className="py-8 sm:py-12">
      <header className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
          <Link
            href={`/blog/${post.topic}`}
            className="font-medium uppercase tracking-[0.14em] text-emerald-400/90 transition hover:text-emerald-300"
          >
            {post.topicTitle}
          </Link>
          {formattedDate ? (
            <time dateTime={post.date}>{formattedDate}</time>
          ) : null}
          <span>{post.readingMinutes} min read</span>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-tight">
          {post.title}
        </h1>
        {post.description ? (
          <p className="mt-5 text-lg leading-relaxed text-slate-400">
            {post.description}
          </p>
        ) : null}
      </header>

      <div className="mx-auto mt-10 max-w-3xl">
        <Markdown content={post.content} />
      </div>

      {related.length > 0 ? (
        <aside className="mx-auto mt-16 max-w-3xl border-t border-white/10 pt-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            More in {post.topicTitle}
          </h2>
          <ul className="mt-4 space-y-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/blog/${item.topic}/${item.slug}`}
                  className="group flex items-baseline justify-between gap-4 rounded-xl border border-transparent px-1 py-2 transition hover:border-white/10 hover:bg-white/[0.03]"
                >
                  <span className="font-medium text-slate-200 transition group-hover:text-emerald-300">
                    {item.title}
                  </span>
                  <span className="shrink-0 text-xs text-slate-500">
                    {item.readingMinutes} min
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </article>
  );
}
