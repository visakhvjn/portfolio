"use client";

import { projects } from "@/data/projects";
import { projectTypeFilterLabel } from "@/lib/projectType";
import type { Project } from "@/types";
import { useMemo, useState } from "react";
import { AnimateIn } from "./AnimateIn";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { SectionHeading } from "./SectionHeading";

const filters = ["all", "office", "personal", "ai", "games"] as const;
type Filter = (typeof filters)[number];
const INITIAL_VISIBLE = 6;

function hasProjectLink(project: Project) {
  return !!(project.demoUrl || project.repoUrl);
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [showAll, setShowAll] = useState(false);

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

  const visibleProjects = useMemo(
    () => (showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE)),
    [filtered, showAll],
  );

  const hasMore = filtered.length > INITIAL_VISIBLE;

  return (
    <section className="py-14 sm:py-20">
      <AnimateIn>
        <SectionHeading
          id="projects"
          title="Projects"
          subtitle="Browse the work — open a live demo from the card or view details for the full story, stack, and roadmap."
        />
      </AnimateIn>
      <AnimateIn delay={100}>
        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => {
                setFilter(f);
                setShowAll(false);
              }}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${filter === f ? "bg-emerald-500 text-slate-950" : "bg-white/5 text-slate-400 hover:text-white"}`}
            >
              {f === "all" ? "All" : projectTypeFilterLabel(f)}
            </button>
          ))}
        </div>
      </AnimateIn>
      <ul className="mt-10 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project, i) => (
          <AnimateIn key={project.slug} delay={i * 50} className="h-full">
            <li className="h-full">
              <ProjectCard
                project={project}
                onViewDetails={() => setSelected(project)}
              />
            </li>
          </AnimateIn>
        ))}
      </ul>
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((open) => !open)}
            className="rounded-xl border border-white/10 px-6 py-2.5 text-sm font-medium text-slate-300 transition hover:border-emerald-500/30 hover:bg-white/5 hover:text-white"
          >
            {showAll ? "Show less" : "Show more"}
          </button>
        </div>
      )}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
