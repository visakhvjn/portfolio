"use client";

import { experience } from "@/data/experience";
import type { ExperienceEntry } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimateIn } from "./AnimateIn";
import { Modal } from "./Modal";
import { SectionHeading } from "./SectionHeading";

const CARD_TECH_LIMIT = 5;

export function Experience() {
  const [selected, setSelected] = useState<ExperienceEntry | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const getScrollStep = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return 0;
    const card = el.querySelector<HTMLElement>("[data-experience-card]");
    const gap = 16;
    return card ? card.offsetWidth + gap : el.clientWidth * 0.85;
  }, []);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  const scrollBy = useCallback(
    (direction: -1 | 1) => {
      const el = scrollRef.current;
      if (!el) return;
      el.scrollBy({ left: direction * getScrollStep(), behavior: "smooth" });
    },
    [getScrollStep],
  );

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

  return (
    <section className="py-14 sm:py-20">
      <AnimateIn>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0 flex-1">
            <SectionHeading
              id="experience"
              title="Experience"
              subtitle="8+ years across product companies — from payments and migrations to AI and team leadership."
            />
          </div>
          {experience.length > 1 && (
            <div className="mb-1 flex shrink-0 gap-1">
              <button
                type="button"
                aria-label="Previous role"
                disabled={!canScrollLeft}
                onClick={() => scrollBy(-1)}
                className="rounded-lg border border-white/10 p-1.5 text-slate-400 transition hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-30"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next role"
                disabled={!canScrollRight}
                onClick={() => scrollBy(1)}
                className="rounded-lg border border-white/10 p-1.5 text-slate-400 transition hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-30"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </AnimateIn>

      <AnimateIn delay={80}>
        <div
          ref={scrollRef}
          className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scroll-smooth [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.15)_transparent] sm:-mx-6 sm:px-6"
          aria-label="Work experience"
        >
          {experience.map((job) => {
            const visibleTech = job.tech.slice(0, CARD_TECH_LIMIT);
            const extraTech = job.tech.length - visibleTech.length;

            return (
              <button
                key={job.id}
                type="button"
                data-experience-card
                onClick={() => setSelected(job)}
                className="group flex w-[min(100%,19rem)] shrink-0 snap-center flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-emerald-500/30 hover:bg-white/[0.06] sm:w-[21rem] sm:p-6"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-white group-hover:text-emerald-300">
                    {job.company}
                  </h3>
                  {job.current && (
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-300">
                      Current
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-emerald-400/80">{job.role}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {job.location} · {job.period}
                </p>
                <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-400">
                  {job.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {visibleTech.map((t) => (
                    <span key={t} className="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-400">
                      {t}
                    </span>
                  ))}
                  {extraTech > 0 && (
                    <span className="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-500">
                      +{extraTech}
                    </span>
                  )}
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-emerald-400/90 transition group-hover:text-emerald-300">
                  View details
                  <span aria-hidden>→</span>
                </span>
              </button>
            );
          })}
        </div>
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
              <p className="text-sm font-medium text-emerald-400/90">{selected.role}</p>
              <p className="mt-1 text-sm text-slate-500">
                {selected.location} · {selected.period}
                {selected.current ? " · Current" : ""}
              </p>
              {selected.companyUrl && (
                <a
                  href={selected.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-emerald-400/90 transition hover:text-emerald-300"
                >
                  Company website
                  <span aria-hidden>↗</span>
                </a>
              )}
            </div>
            <p className="text-sm leading-relaxed text-slate-300">{selected.summary}</p>
            <ul className="space-y-2.5">
              {selected.bullets.map((b) => (
                <li key={b.slice(0, 48)} className="flex gap-2 text-sm text-slate-300">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 border-t border-white/10 pt-5">
              {selected.tech.map((t) => (
                <span key={t} className="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-400">
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
