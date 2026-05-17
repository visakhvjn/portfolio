"use client";

import { blogPosts } from "@/data/blog";
import { site } from "@/data/site";
import { AnimateIn } from "./AnimateIn";
import { SectionHeading } from "./SectionHeading";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function Blog() {
  return (
    <section className="py-14 sm:py-20">
      <AnimateIn>
        <SectionHeading
          id="blog"
          title="Blog"
          subtitle="Engineering, frontend, and system design posts from Medium."
        />
      </AnimateIn>

      <ul className="mt-10 divide-y divide-white/10 rounded-xl border border-white/10">
        {blogPosts.map((post, i) => (
          <AnimateIn key={post.url} delay={i * 50}>
            <li>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block px-5 py-5 transition hover:bg-white/[0.03] sm:px-6"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-white group-hover:text-emerald-300">
                      {post.title}
                    </h3>
                    {post.excerpt ? (
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">
                        {post.excerpt}
                      </p>
                    ) : null}
                  </div>
                  <time
                    dateTime={post.publishedAt}
                    className="shrink-0 text-xs text-slate-500 sm:pt-1"
                  >
                    {formatDate(post.publishedAt)}
                  </time>
                </div>
                <p className="mt-3 text-xs font-medium text-emerald-400/80 group-hover:text-emerald-400">
                  Read on Medium →
                </p>
              </a>
            </li>
          </AnimateIn>
        ))}
      </ul>

      <AnimateIn delay={120}>
        <p className="mt-8 text-center">
          <a
            href={site.links.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
          >
            View all posts on Medium →
          </a>
        </p>
      </AnimateIn>
    </section>
  );
}
