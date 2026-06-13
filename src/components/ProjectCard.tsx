"use client";

import { projectThumbnailPath } from "@/lib/projectThumbnail";
import {
  projectTypeBadgeClass,
  projectTypeLabel,
} from "@/lib/projectType";
import type { Project } from "@/types";
import Image from "next/image";
import { useState } from "react";

type ProjectCardProps = {
  project: Project;
  onViewDetails: () => void;
};

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const thumbnailSrc = projectThumbnailPath(project);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-emerald-500/30 hover:bg-white/[0.06]">
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-slate-900">
        {imageError ? (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 px-6 text-center">
            <p className="text-sm font-medium text-slate-400">{project.heading}</p>
          </div>
        ) : (
          <Image
            src={thumbnailSrc}
            alt={`${project.heading} preview`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top"
            onError={() => setImageError(true)}
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 font-semibold leading-snug text-white">
            {project.heading}
          </h3>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase ${projectTypeBadgeClass(project.type)}`}
          >
            {projectTypeLabel(project.type)}
          </span>
        </div>

        <p className="clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-400">
          {project.summary}
        </p>

        <div className="mt-4 flex min-h-[2.25rem] flex-wrap content-start gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-500"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-[10px] text-slate-600">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-3.5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Live demo
            </a>
          )}
          {project.repoUrl && !project.demoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-3.5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              GitHub
            </a>
          )}
          <button
            type="button"
            onClick={onViewDetails}
            className="inline-flex items-center justify-center rounded-xl border border-white/15 px-3.5 py-2 text-sm font-semibold text-white transition hover:border-emerald-500/30 hover:bg-white/5"
          >
            View details
          </button>
        </div>
      </div>
    </article>
  );
}
