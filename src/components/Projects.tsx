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
import { useMemo, useState } from "react";
import { AnimateIn } from "./AnimateIn";
import { Modal } from "./Modal";
import { SectionHeading } from "./SectionHeading";

const filters = ["all", "office", "personal", "ai", "games"] as const;
type Filter = (typeof filters)[number];

const INITIAL_COUNT = 6;

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [imageErrorBySlug, setImageErrorBySlug] = useState<Record<string, boolean>>({});

  const sortedProjects = useMemo(() => getAllProjects(), []);

  const filtered = useMemo(() => {
    if (filter === "all") return sortedProjects;
    return sortedProjects.filter((p) => p.type === filter);
  }, [filter, sortedProjects]);

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hiddenCount = filtered.length - visible.length;

  const markImageError = (slug: string) =>
    setImageErrorBySlug((prev) => ({ ...prev, [slug]: true }));

  return (
    <section className="py-16 sm:py-24">
      <AnimateIn>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="projects"
            eyebrow="02 — Projects"
            title="Selected work"
            subtitle="Client sites, AI experiments, and products I've shipped. Open any card for a quick look, or read the full case study."
          />
          <div
            role="tablist"
            aria-label="Filter projects"
            className="flex shrink-0 flex-wrap gap-1 rounded-xl border border-line bg-surface p-1"
          >
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                onClick={() => {
                  setFilter(f);
                  setShowAll(false);
                }}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  filter === f
                    ? "bg-card text-ink shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                {f === "all" ? "All" : projectTypeFilterLabel(f)}
              </button>
            ))}
          </div>
        </div>
      </AnimateIn>

      <AnimateIn delay={80}>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <li key={project.slug}>
              <button
                type="button"
                onClick={() => setSelected(project)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-card text-left transition hover:border-line-strong hover:shadow-sm"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-surface">
                  {imageErrorBySlug[project.slug] ? (
                    <div className="flex h-full items-center justify-center px-6 text-center">
                      <p className="font-serif text-lg text-muted">{project.heading}</p>
                    </div>
                  ) : (
                    <Image
                      src={projectThumbnailPath(project)}
                      alt={`${project.heading} preview`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                      className="object-cover object-top transition duration-500 ease-out group-hover:scale-[1.03]"
                      onError={() => markImageError(project.slug)}
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span
                    className={`self-start rounded-full px-2.5 py-0.5 text-xs font-medium ${projectTypeBadgeClass(project.type)}`}
                  >
                    {projectTypeLabel(project.type)}
                  </span>
                  <h3 className="mt-3 font-serif text-xl font-medium leading-snug text-ink">
                    {project.heading}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
                    {project.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong transition group-hover:gap-2.5">
                    Take a look <span aria-hidden>→</span>
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>

        {hiddenCount > 0 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="rounded-lg border border-line-strong bg-card px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-surface"
            >
              Show all {filtered.length} projects
            </button>
          </div>
        )}
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
            onImageError={() => markImageError(selected.slug)}
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
    <div className="space-y-6">
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-line bg-surface">
        {imageError ? (
          <div className="flex h-full items-center justify-center px-6 text-center">
            <p className="font-serif text-lg text-muted">{project.heading}</p>
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
          <span className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs font-medium text-muted">
            NDA
          </span>
        )}
      </div>

      <p className="text-base leading-relaxed text-ink-soft">{project.summary}</p>

      <div>
        <h4 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">Why</h4>
        <p className="mt-2 line-clamp-5 text-sm leading-relaxed text-muted">{project.reason}</p>
      </div>

      <div>
        <h4 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">Tech</h4>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs text-ink-soft"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {futurePreview.length > 0 && (
        <div>
          <h4 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
            Next up
          </h4>
          <ul className="mt-2 space-y-1.5">
            {futurePreview.map((item) => (
              <li key={item.slice(0, 40)} className="flex gap-2 text-sm text-ink-soft">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-2 border-t border-line pt-5">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-canvas transition hover:bg-ink-soft"
          >
            Live demo
          </a>
        )}
        {project.repoUrl && !project.demoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-canvas transition hover:bg-ink-soft"
          >
            GitHub
          </a>
        )}
        <Link
          href={detailHref}
          className="inline-flex items-center justify-center rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-surface"
        >
          Full case study
        </Link>
      </div>
    </div>
  );
}
