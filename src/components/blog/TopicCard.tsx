import type { BlogTopic } from "@/lib/blog";
import Link from "next/link";

type TopicCardProps = {
  topic: BlogTopic;
};

export function TopicCard({ topic }: TopicCardProps) {
  return (
    <Link
      href={`/blog/${topic.slug}`}
      className="group block rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-6 transition hover:border-emerald-500/30"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-white transition group-hover:text-emerald-300">
          {topic.title}
        </h2>
        <span className="shrink-0 text-xs text-slate-500">
          {topic.postCount} {topic.postCount === 1 ? "post" : "posts"}
        </span>
      </div>
      {topic.description ? (
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          {topic.description}
        </p>
      ) : null}
    </Link>
  );
}
