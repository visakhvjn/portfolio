"use client";

import { site } from "@/data/site";
import Image from "next/image";
import { AnimateIn } from "./AnimateIn";
import { CalendlyBookButton } from "./CalendlyBookButton";

type HeroProps = {
  onContactClick: () => void;
  onServicesClick: () => void;
};

export function Hero({ onContactClick, onServicesClick }: HeroProps) {
  return (
    <section id="me" className="scroll-mt-24 pt-8">
      <AnimateIn>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-14">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Available for opportunities
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {site.name}
            </h1>
            <p className="mt-4 text-xl font-medium text-emerald-400/90 sm:text-2xl">
              {site.title}
            </p>
            <p className="mt-2 text-lg text-slate-400">{site.tagline}</p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300">
              {site.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={onContactClick}
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Contact me
              </button>
              <CalendlyBookButton
                text="Book a call"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              />
              <button
                type="button"
                onClick={onServicesClick}
                className="inline-flex items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-300 transition hover:border-emerald-500/50 hover:bg-emerald-500/15"
              >
                Services
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="text-slate-400 hover:text-emerald-400"
              >
                {site.email}
              </a>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-emerald-400"
              >
                LinkedIn
              </a>
              <a
                href={site.links.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-emerald-400"
              >
                Medium
              </a>
              <a
                href={site.links.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-emerald-400"
              >
                LeetCode
              </a>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-emerald-400"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="order-first flex justify-center pb-2 lg:order-last lg:justify-end lg:pb-0">
            <div className="relative h-52 w-52 shrink-0 overflow-hidden rounded-full border-2 border-emerald-500/30 shadow-lg shadow-emerald-500/10 sm:h-64 sm:w-64 lg:h-80 lg:w-80">
              <Image
                src={site.profileImage}
                alt={`Portrait of ${site.name}`}
                fill
                priority
                sizes="(max-width: 640px) 208px, (max-width: 1024px) 256px, 320px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}
