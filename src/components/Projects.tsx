"use client";

import { projects } from "@/data/projects";
import {
  projectTypeBadgeClass,
  projectTypeFilterLabel,
  projectTypeLabel,
} from "@/lib/projectType";
import type { Project } from "@/types";
import { useMemo, useState } from "react";
import { AnimateIn } from "./AnimateIn";
import { ProjectModal } from "./ProjectModal";
import { SectionHeading } from "./SectionHeading";

const filters = ["all", "office", "personal", "ai", "games"] as const;
type Filter = (typeof filters)[number];

function hasProjectLink(project: Project) {
  return !!(project.demoUrl || project.repoUrl);
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  const sortedProjects = useMemo(
    () =>
      projects
        .map((project, index) => ({ project, index }))
        .sort((a, b) => {
          const aHasLink = hasProjectLink(a.project);
          const bHasLink = hasProjectLink(b.project);
          if (aHasLink !== bHasLink) return aHasLink ? -1 : 1;
          return a.index - b.index;
        })
        .map(({ project }) => project),
    [],
  );

  const filtered = useMemo(() => {
    if (filter === "all") return sortedProjects;
    return sortedProjects.filter((p) => p.type === filter);
  }, [filter, sortedProjects]);

  return (
    <section className="py-14 sm:py-20">
      <AnimateIn>
        <SectionHeading id="projects" title="Projects" subtitle="Tap a card for the full story — reason, stack, links, and what I am building next." />
      </AnimateIn>
      <AnimateIn delay={100}>
        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${filter === f ? "bg-emerald-500 text-slate-950" : "bg-white/5 text-slate-400 hover:text-white"}`}
            >
              {f === "all" ? "All" : projectTypeFilterLabel(f)}
            </button>
          ))}
        </div>
      </AnimateIn>
      <ul className="mt-10 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <AnimateIn key={project.slug} delay={i * 50} className="h-full">
            <li className="h-full">
              <button
                type="button"
                onClick={() => setSelected(project)}
                className="group flex h-full min-h-[220px] w-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-emerald-500/30 hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <div className="mb-3 flex min-h-[2.75rem] items-start justify-between gap-2">
                  <h3 className="line-clamp-2 font-semibold leading-snug text-white group-hover:text-emerald-300">
                    {project.heading}
                  </h3>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase ${projectTypeBadgeClass(project.type)}`}>
                    {projectTypeLabel(project.type)}
                  </span>
                </div>
                <p className="clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-400">
                  {project.summary}
                </p>
                <div className="mt-4 flex min-h-[2.25rem] flex-wrap content-start gap-1.5">
                  {project.tech.slice(0, 4).map((t) => <span key={t} className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-500">{t}</span>)}
                  {project.tech.length > 4 && <span className="text-[10px] text-slate-600">+{project.tech.length - 4}</span>}
                </div>
                <p className="mt-auto pt-4 text-xs font-medium text-emerald-400/80 group-hover:text-emerald-400">View details →</p>
              </button>
            </li>
          </AnimateIn>
        ))}
      </ul>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
