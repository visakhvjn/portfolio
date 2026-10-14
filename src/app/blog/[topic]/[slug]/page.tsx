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
    <article className="py-10 sm:py-16">
      <header className="mx-auto max-w-2xl">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <Link
            href={`/blog/${post.topic}`}
            className="text-xs font-medium uppercase tracking-[0.14em] text-accent-strong underline-offset-4 transition hover:text-ink hover:underline"
          >
            {post.topicTitle}
          </Link>
          {formattedDate ? (
            <>
              <time dateTime={post.date}>{formattedDate}</time>
              <span aria-hidden className="text-faint">
                ·
              </span>
            </>
          ) : null}
          <span>{post.readingMinutes} min read</span>
        </div>
        <h1 className="mt-5 font-serif text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
          {post.title}
        </h1>
        {post.description ? (
          <p className="mt-6 text-xl leading-relaxed text-muted">
            {post.description}
          </p>
        ) : null}
      </header>

      <div className="mx-auto mt-12 max-w-2xl border-t border-line pt-10">
        <Markdown content={post.content} />
      </div>

      {related.length > 0 ? (
        <aside className="mx-auto mt-20 max-w-2xl border-t border-line pt-10">
          <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
            More in {post.topicTitle}
          </h2>
          <ul className="mt-4 divide-y divide-line">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/blog/${item.topic}/${item.slug}`}
                  className="group flex items-baseline justify-between gap-4 py-4"
                >
                  <span className="font-serif text-lg font-medium text-ink transition group-hover:text-accent-strong">
                    {item.title}
                  </span>
                  <span className="shrink-0 text-xs text-muted">
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
