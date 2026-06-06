"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/types/testimonial";

type TestimonialSliderProps = {
  testimonials: Testimonial[];
  /** Section heading above the slider */
  title?: string;
  /** Modal layout: top border and spacing */
  embedded?: boolean;
  /** Wider cards for longer LinkedIn text */
  wideCards?: boolean;
  ariaLabel?: string;
};

function sourceBadgeClass(source?: string): string {
  if (source === "LinkedIn") {
    return "bg-[#0A66C2]/25 text-sky-200";
  }
  return "bg-emerald-500/15 text-emerald-300/90";
}

const AUTO_SCROLL_INTERVAL_MS = 4500;

export function TestimonialSlider({
  testimonials,
  title = "Client reviews",
  embedded = false,
  wideCards = false,
  ariaLabel = "Testimonials",
}: TestimonialSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [autoPaused, setAutoPaused] = useState(false);

  const getScrollStep = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return 0;
    const card = el.querySelector<HTMLElement>("[data-testimonial-card]");
    const gap = 12;
    return card ? card.offsetWidth + gap : el.clientWidth * 0.88;
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

  const scrollNext = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    if (atEnd) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      scrollBy(1);
    }
  }, [scrollBy]);

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
  }, [updateScrollState, testimonials.length]);

  useEffect(() => {
    if (testimonials.length <= 1 || autoPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(scrollNext, AUTO_SCROLL_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [testimonials.length, autoPaused, scrollNext]);

  if (testimonials.length === 0) return null;

  const showControls = testimonials.length > 1;
  const cardWidth = wideCards
    ? "w-[min(100%,22rem)] sm:w-[22rem] md:w-[24rem]"
    : "w-[min(100%,20rem)] sm:w-[18rem]";

  return (
    <div
      className={embedded ? "mt-6 border-t border-white/10 pt-6" : "mt-10"}
      onMouseEnter={() => setAutoPaused(true)}
      onMouseLeave={() => setAutoPaused(false)}
      onFocusCapture={() => setAutoPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setAutoPaused(false);
        }
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <h4
          className={
            embedded
              ? "text-sm font-semibold uppercase tracking-wider text-slate-500"
              : "sr-only"
          }
        >
          {title}
        </h4>
        {showControls && (
          <div className={`flex gap-1 ${embedded ? "" : "ml-auto"}`}>
            <button
              type="button"
              aria-label="Previous review"
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
              aria-label="Next review"
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

      <div
        ref={scrollRef}
        className={`mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 scroll-smooth [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.15)_transparent] ${
          embedded ? "-mx-5 px-5" : "-mx-4 px-4 sm:-mx-6 sm:px-6"
        }`}
        aria-label={ariaLabel}
      >
        {testimonials.map((item) => (
          <article
            key={item.id}
            data-testimonial-card
            className={`${cardWidth} shrink-0 snap-center rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5`}
          >
            <p className="text-sm leading-relaxed text-slate-300">&ldquo;{item.review}&rdquo;</p>
            <footer className="mt-4 border-t border-white/5 pt-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-white">{item.clientName}</span>
                {item.source && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${sourceBadgeClass(item.source)}`}
                  >
                    {item.source}
                  </span>
                )}
              </div>
              {item.headline && (
                <p className="mt-1 line-clamp-2 text-xs text-slate-400">{item.headline}</p>
              )}
              {(item.relationship || item.location || item.gig) && (
                <p className="mt-1 text-xs text-slate-500">
                  {[item.relationship, item.location, item.gig].filter(Boolean).join(" · ")}
                </p>
              )}
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
