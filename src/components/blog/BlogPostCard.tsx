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
      className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-emerald-500/30 hover:bg-white/[0.05]"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
        {showTopic ? (
          <span className="font-medium uppercase tracking-[0.14em] text-emerald-400/90">
            {post.topicTitle}
          </span>
        ) : null}
        {formattedDate ? <time dateTime={post.date}>{formattedDate}</time> : null}
        <span>{post.readingMinutes} min read</span>
      </div>
      <h2 className="mt-3 text-xl font-semibold tracking-tight text-white transition group-hover:text-emerald-300">
        {post.title}
      </h2>
      {post.description ? (
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
          {post.description}
        </p>
      ) : null}
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-emerald-400/90 transition group-hover:text-emerald-300">
        Read post <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
