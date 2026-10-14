import { formatPostDate, type BlogPostMeta } from "@/lib/blog";
import Link from "next/link";

type BlogPostCardProps = {
  post: BlogPostMeta;
  showTopic?: boolean;
};

export function BlogPostCard({ post, showTopic = true }: BlogPostCardProps) {
  const formattedDate = formatPostDate(post.date);

  return (
    <Link
      href={`/blog/${post.topic}/${post.slug}`}
      className="group flex h-full flex-col py-8"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
        {showTopic ? (
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-accent-strong">
            {post.topicTitle}
          </span>
        ) : null}
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
      <h2 className="mt-3 font-serif text-2xl font-medium leading-snug tracking-tight text-ink transition group-hover:text-accent-strong">
        {post.title}
      </h2>
      {post.description ? (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
          {post.description}
        </p>
      ) : null}
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-strong underline-offset-4 transition group-hover:text-ink group-hover:underline">
        Read post <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
