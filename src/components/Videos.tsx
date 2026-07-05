"use client";

import { getYouTubeEmbedUrl, videos } from "@/data/videos";
import { site } from "@/data/site";
import { AnimateIn } from "./AnimateIn";
import { SectionHeading } from "./SectionHeading";

export function Videos() {
  if (videos.length === 0) return null;

  return (
    <section className="py-14 sm:py-20">
      <AnimateIn>
        <SectionHeading
          id="videos"
          title="Videos"
          subtitle="Walkthroughs and demos from my YouTube channel — building with AI, MCP, and full-stack tooling."
        />
      </AnimateIn>

      <ul className="mt-10 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video, index) => (
          <AnimateIn key={video.id} delay={index * 80} className="h-full">
            <li className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="aspect-[21/9] w-full shrink-0">
                <iframe
                  src={getYouTubeEmbedUrl(video)}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
              <div className="flex flex-1 flex-col border-t border-white/10 px-4 py-3">
                <h3 className="line-clamp-2 min-h-[2.75rem] text-sm font-semibold leading-snug text-white">
                  {video.title}
                </h3>
                <p className="mt-2 line-clamp-3 min-h-[3.75rem] text-xs leading-relaxed text-slate-400 sm:text-sm">
                  {video.description}
                </p>
                <a
                  href={video.watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-emerald-400/90 transition hover:text-emerald-300"
                >
                  Watch on YouTube
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </li>
          </AnimateIn>
        ))}
      </ul>

      <AnimateIn delay={120}>
        <div className="mt-8 flex justify-center">
          <a
            href={site.links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/10 px-6 py-2.5 text-sm font-medium text-slate-300 transition hover:border-emerald-500/30 hover:bg-white/5 hover:text-white"
          >
            View channel on YouTube
          </a>
        </div>
      </AnimateIn>
    </section>
  );
}
