import type { BlogTopic } from "@/lib/blog";
import Link from "next/link";

type TopicCardProps = {
  topic: BlogTopic;
};

export function TopicCard({ topic }: TopicCardProps) {
  return (
    <Link href={`/blog/${topic.slug}`} className="group block py-7">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-ink transition group-hover:text-accent-strong">
          {topic.title}
        </h2>
        <span className="shrink-0 text-sm text-muted">
          {topic.postCount} {topic.postCount === 1 ? "post" : "posts"}
        </span>
      </div>
      {topic.description ? (
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-soft">
          {topic.description}
        </p>
      ) : null}
    </Link>
  );
}
