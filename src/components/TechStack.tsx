"use client";

import { skillCategories } from "@/data/skills";
import { AnimateIn } from "./AnimateIn";
import { SectionHeading } from "./SectionHeading";

export function TechStack() {
  return (
    <section className="py-16 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[18rem_1fr] lg:gap-16">
        <AnimateIn className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="skills"
            eyebrow="01 — Skills"
            title="What I work with"
            subtitle="Stacks I use across full-stack, cloud, and AI work."
          />
        </AnimateIn>

        <AnimateIn delay={60}>
          <dl className="divide-y divide-line border-y border-line">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="grid gap-3 py-6 sm:grid-cols-[12rem_1fr] sm:gap-6"
              >
                <dt className="text-sm font-medium text-ink">{category.title}</dt>
                <dd className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-line bg-card px-3 py-1 text-sm text-ink-soft"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </AnimateIn>
      </div>
    </section>
  );
}
