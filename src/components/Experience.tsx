"use client";

import { experience } from "@/data/experience";
import type { ExperienceEntry } from "@/types";
import { useState } from "react";
import { AnimateIn } from "./AnimateIn";
import { Modal } from "./Modal";
import { SectionHeading } from "./SectionHeading";

const CARD_TECH_LIMIT = 5;

export function Experience() {
  const [selected, setSelected] = useState<ExperienceEntry | null>(null);

  return (
    <section className="py-16 sm:py-24">
      <AnimateIn>
        <SectionHeading
          id="experience"
          eyebrow="03 — Experience"
          title="Where I've worked"
          subtitle="8+ years across product companies — from payments and migrations to AI and team leadership."
        />
      </AnimateIn>

      <AnimateIn delay={80}>
        <ol className="mt-12 border-t border-line">
          {experience.map((job) => {
            const visibleTech = job.tech.slice(0, CARD_TECH_LIMIT);
            const extraTech = job.tech.length - visibleTech.length;

            return (
              <li key={job.id} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setSelected(job)}
                  className="group grid w-full gap-3 py-8 text-left transition sm:grid-cols-[11rem_1fr_auto] sm:gap-8"
                >
                  <div className="text-sm text-muted">
                    <p>{job.period}</p>
                    <p className="mt-1 text-faint">{job.location}</p>
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-serif text-2xl font-medium text-ink transition group-hover:text-accent-strong">
                        {job.company}
                      </h3>
                      {job.current && (
                        <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-strong">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm font-medium text-ink-soft">{job.role}</p>
                    <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-relaxed text-muted">
                      {job.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {visibleTech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-line bg-card px-2.5 py-0.5 text-xs text-ink-soft"
                        >
                          {t}
                        </span>
                      ))}
                      {extraTech > 0 && (
                        <span className="rounded-full px-2 py-0.5 text-xs text-faint">
                          +{extraTech}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="hidden self-center text-sm font-medium text-muted transition group-hover:text-accent-strong sm:inline-flex sm:items-center sm:gap-1.5">
                    Details <span aria-hidden>→</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </AnimateIn>

      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.company ?? ""}
        wide
      >
        {selected && (
          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium text-ink">{selected.role}</p>
              <p className="mt-1 text-sm text-muted">
                {selected.location} · {selected.period}
                {selected.current ? " · Current" : ""}
              </p>
              {selected.companyUrl && (
                <a
                  href={selected.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent-strong underline-offset-4 transition hover:text-ink hover:underline"
                >
                  Company website
                  <span aria-hidden>↗</span>
                </a>
              )}
            </div>
            <p className="text-base leading-relaxed text-ink-soft">{selected.summary}</p>
            <ul className="space-y-2.5">
              {selected.bullets.map((b) => (
                <li key={b.slice(0, 48)} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5 border-t border-line pt-5">
              {selected.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs text-ink-soft"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
