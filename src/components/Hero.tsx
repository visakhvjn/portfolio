"use client";

import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "./AnimateIn";
import { CalendlyBookButton } from "./CalendlyBookButton";

type HeroProps = {
  onContactClick: () => void;
  onServicesClick: () => void;
};

const linkClass =
  "text-muted underline-offset-4 transition hover:text-ink hover:underline";

const stats = [
  { value: "8+", label: "Years building products" },
  { value: String(projects.length), label: "Projects shipped" },
  { value: String(experience.length), label: "Product companies" },
];

export function Hero({ onContactClick, onServicesClick }: HeroProps) {
  return (
    <section id="me" className="scroll-mt-24 pb-16 pt-10 sm:pb-24 sm:pt-16">
      <AnimateIn>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-sm text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Available for opportunities
            </p>
            <h1 className="mt-6 font-serif text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              {site.name}
            </h1>
            <p className="mt-5 font-serif text-2xl text-ink-soft sm:text-3xl">
              {site.title}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {site.intro}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={onContactClick}
                className="inline-flex items-center justify-center rounded-lg bg-ink px-5 py-3 text-sm font-medium text-canvas transition hover:bg-ink-soft"
              >
                Contact me
              </button>
              <CalendlyBookButton
                text="Book a call"
                className="inline-flex items-center justify-center rounded-lg border border-line-strong bg-card px-5 py-3 text-sm font-medium text-ink transition hover:bg-surface"
              />
              <button
                type="button"
                onClick={onServicesClick}
                className="inline-flex items-center justify-center gap-1.5 px-2 py-3 text-sm font-medium text-accent-strong transition hover:text-ink"
              >
                Services <span aria-hidden>→</span>
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                LinkedIn
              </a>
              <Link href={site.links.blog} className={linkClass}>
                Blog
              </Link>
              <a href={site.links.medium} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Medium
              </a>
              <a href={site.links.leetcode} target="_blank" rel="noopener noreferrer" className={linkClass}>
                LeetCode
              </a>
              <a href={site.links.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                GitHub
              </a>
            </div>
          </div>

          <div className="order-first flex justify-start lg:order-last lg:justify-end">
            <div className="rounded-[2rem] border border-line bg-surface p-3">
              <div className="relative h-56 w-48 overflow-hidden rounded-[1.5rem] bg-card sm:h-72 sm:w-60 lg:h-96 lg:w-80">
                <Image
                  src={site.profileImage}
                  alt={`Portrait of ${site.name}`}
                  fill
                  priority
                  sizes="(max-width: 640px) 192px, (max-width: 1024px) 240px, 320px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </AnimateIn>

      <AnimateIn delay={100}>
        <dl className="mt-16 grid grid-cols-3 divide-x divide-line border-y border-line">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse px-3 py-6 first:pl-0 sm:px-8 sm:first:pl-0"
            >
              <dt className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</dt>
              <dd className="font-serif text-3xl font-medium text-ink sm:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </AnimateIn>
    </section>
  );
}
