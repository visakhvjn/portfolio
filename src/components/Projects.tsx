"use client";

import { getAllProjects } from "@/lib/projects";
import { projectThumbnailPath } from "@/lib/projectThumbnail";
import {
  projectTypeBadgeClass,
  projectTypeFilterLabel,
  projectTypeLabel,
} from "@/lib/projectType";
import type { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimateIn } from "./AnimateIn";
import { Modal } from "./Modal";
import { SectionHeading } from "./SectionHeading";

const filters = ["all", "office", "personal", "ai", "games"] as const;
type Filter = (typeof filters)[number];

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const [imageErrorBySlug, setImageErrorBySlug] = useState<Record<string, boolean>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const sortedProjects = useMemo(() => getAllProjects(), []);

  const filtered = useMemo(() => {
    if (filter === "all") return sortedProjects;
    return sortedProjects.filter((p) => p.type === filter);
  }, [filter, sortedProjects]);

  const getScrollStep = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return 0;
    const card = el.querySelector<HTMLElement>("[data-project-card]");
    const gap = 20;
    return card ? card.offsetWidth + gap : el.clientWidth * 0.8;
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
  }, [updateScrollState, filtered.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    updateScrollState();
  }, [filter, updateScrollState]);

  return (
    <section className="py-14 sm:py-20">
      <AnimateIn>
        <SectionHeading
          id="projects"
          title="Projects"
          subtitle="Swipe the strip — click a project for a quick peek, or open the full case study."
        />
      </AnimateIn>

      <AnimateIn delay={80}>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
                  filter === f
                    ? "bg-sky-400 text-slate-950"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {f === "all" ? "All" : projectTypeFilterLabel(f)}
              </button>
            ))}
          </div>
          {filtered.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-slate-500 sm:inline">
                {filtered.length} projects
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  aria-label="Previous project"
                  disabled={!canScrollLeft}
                  onClick={() => scrollBy(-1)}
                  className="rounded-full border border-white/10 p-2 text-slate-400 transition hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-sky-200 disabled:pointer-events-none disabled:opacity-30"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next project"
                  disabled={!canScrollRight}
                  onClick={() => scrollBy(1)}
                  className="rounded-full border border-white/10 p-2 text-slate-400 transition hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-sky-200 disabled:pointer-events-none disabled:opacity-30"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </AnimateIn>

      <AnimateIn delay={120}>
        <div className="relative mt-8">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-8 bg-gradient-to-r from-[#070b14] to-transparent sm:w-12"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-8 bg-gradient-to-l from-[#070b14] to-transparent sm:w-12"
            aria-hidden
          />
          <div
            ref={scrollRef}
            className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-3 scroll-smooth [scrollbar-width:none] sm:-mx-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
            aria-label="Projects"
          >
            {filtered.map((project, index) => {
              const thumbnailSrc = projectThumbnailPath(project);
              const imageError = imageErrorBySlug[project.slug];
              const previewTech = project.tech.slice(0, 3);

              return (
                <button
                  key={project.slug}
                  type="button"
                  data-project-card
                  onClick={() => setSelected(project)}
                  className="group relative w-[min(85vw,18rem)] shrink-0 snap-center overflow-hidden rounded-[1.35rem] text-left shadow-[0_18px_40px_-28px_rgba(0,0,0,0.85)] ring-1 ring-inset ring-white/10 transition duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-24px_rgba(56,189,248,0.35)] hover:ring-sky-300/35 sm:w-[20rem]"
                >
                  <div className="relative aspect-[3/4] w-full bg-slate-950">
                    {imageError ? (
                      <div className="flex h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_#1e293b,_#020617)] px-6 text-center">
                        <p className="text-sm font-medium text-slate-400">{project.heading}</p>
                      </div>
                    ) : (
                      <Image
                        src={thumbnailSrc}
                        alt={`${project.heading} preview`}
                        fill
                        sizes="(max-width: 640px) 85vw, 320px"
                        className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.06]"
                        onError={() =>
                          setImageErrorBySlug((prev) => ({ ...prev, [project.slug]: true }))
                        }
                      />
                    )}

                    <div
                      className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"
                      aria-hidden
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-sky-400/15 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent opacity-60"
                      aria-hidden
                    />

                    <div className="absolute left-3.5 right-3.5 top-3.5 flex items-start justify-between gap-2">
                      <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] text-white/90 backdrop-blur-md">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] backdrop-blur-md ${projectTypeBadgeClass(project.type)}`}
                      >
                        {projectTypeLabel(project.type)}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
                      <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-3.5 shadow-lg backdrop-blur-xl transition duration-500 group-hover:border-white/20 group-hover:bg-slate-950/70">
                        <h3 className="line-clamp-2 text-[0.95rem] font-semibold leading-snug tracking-tight text-white">
                          {project.heading}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-slate-300/85">
                          {project.summary}
                        </p>
                        {previewTech.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {previewTech.map((t) => (
                              <span
                                key={t}
                                className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-slate-300/80 ring-1 ring-white/10"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                        <span className="mt-3.5 inline-flex items-center gap-2 text-xs font-semibold text-sky-300">
                          Peek inside
                          <span
                            className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-400/15 text-sky-200 ring-1 ring-sky-300/25 transition duration-300 group-hover:translate-x-0.5 group-hover:bg-sky-400/25"
                            aria-hidden
                          >
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </AnimateIn>

      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.heading ?? ""}
        wide
      >
        {selected && (
          <ProjectPreview
            project={selected}
            imageError={Boolean(imageErrorBySlug[selected.slug])}
            onImageError={() =>
              setImageErrorBySlug((prev) => ({ ...prev, [selected.slug]: true }))
            }
          />
        )}
      </Modal>
    </section>
  );
}

function ProjectPreview({
  project,
  imageError,
  onImageError,
}: {
  project: Project;
  imageError: boolean;
  onImageError: () => void;
}) {
  const thumbnailSrc = projectThumbnailPath(project);
  const detailHref = `/projects/${project.slug}`;
  const futurePreview = project.futureWork.slice(0, 3);

  return (
    <div className="space-y-5">
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10 bg-slate-900">
        {imageError ? (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 px-6 text-center">
            <p className="text-sm font-medium text-slate-400">{project.heading}</p>
          </div>
        ) : (
          <Image
            src={thumbnailSrc}
            alt={`${project.heading} preview`}
            fill
            sizes="(max-width: 640px) 100vw, 42rem"
            className="object-cover object-top"
            onError={onImageError}
          />
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${projectTypeBadgeClass(project.type)}`}
        >
          {projectTypeLabel(project.type)}
        </span>
        {project.type === "office" && (
          <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-medium text-amber-300">
            NDA
          </span>
        )}
      </div>

      <p className="text-sm leading-relaxed text-slate-300">{project.summary}</p>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Why</h4>
        <p className="mt-2 line-clamp-5 text-sm leading-relaxed text-slate-400">{project.reason}</p>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tech</h4>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-sky-400/20 bg-sky-400/5 px-2.5 py-1 text-xs text-sky-100/80"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {futurePreview.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Next up
          </h4>
          <ul className="mt-2 space-y-1.5">
            {futurePreview.map((item) => (
              <li key={item.slice(0, 40)} className="flex gap-2 text-sm text-slate-400">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sky-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-2 border-t border-white/10 pt-5">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-sky-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
          >
            Live demo
          </a>
        )}
        {project.repoUrl && !project.demoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-sky-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
          >
            GitHub
          </a>
        )}
        <Link
          href={detailHref}
          className="inline-flex items-center justify-center rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-sky-400/40 hover:bg-sky-400/10"
        >
          Full case study
        </Link>
      </div>
    </div>
  );
}
