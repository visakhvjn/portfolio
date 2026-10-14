"use client";

import { projectThumbnailPath } from "@/lib/projectThumbnail";
import {
  projectTypeBadgeClass,
  projectTypeLabel,
} from "@/lib/projectType";
import type { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const thumbnailSrc = projectThumbnailPath(project);
  const detailHref = `/projects/${project.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition hover:border-line-strong">
      <Link
        href={detailHref}
        className="relative block aspect-[16/10] w-full overflow-hidden border-b border-line bg-surface"
      >
        {imageError ? (
          <div className="flex h-full items-center justify-center bg-surface px-6 text-center">
            <p className="font-serif text-base font-medium text-muted">
              {project.heading}
            </p>
          </div>
        ) : (
          <Image
            src={thumbnailSrc}
            alt={`${project.heading} preview`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition duration-300 group-hover:scale-[1.015]"
            onError={() => setImageError(true)}
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 font-serif text-xl font-medium leading-snug text-ink">
            <Link href={detailHref} className="transition hover:text-accent-strong">
              {project.heading}
            </Link>
          </h3>
          <span
            className={`mt-1 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] ${projectTypeBadgeClass(project.type)}`}
          >
            {projectTypeLabel(project.type)}
          </span>
        </div>

        <p className="clamp-3 min-h-[4.5rem] text-sm leading-6 text-ink-soft">
          {project.summary}
        </p>

        <div className="mt-4 flex min-h-[2.25rem] flex-wrap content-start gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-line bg-surface px-2 py-0.5 text-[11px] text-ink-soft"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="self-center text-[11px] text-faint">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center rounded-lg bg-ink px-3.5 py-2 text-sm font-medium text-canvas transition hover:bg-ink-soft"
            >
              Live demo
            </a>
          )}
          {project.repoUrl && !project.demoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center justify-center rounded-lg bg-ink px-3.5 py-2 text-sm font-medium text-canvas transition hover:bg-ink-soft"
            >
              GitHub
            </a>
          )}
          <Link
            href={detailHref}
            className="inline-flex items-center justify-center rounded-lg border border-line-strong bg-card px-3.5 py-2 text-sm font-medium text-ink transition hover:bg-surface"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
