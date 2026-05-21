"use client";

import { projectTypeBadgeClass, projectTypeLabel } from "@/lib/projectType";
import type { Project } from "@/types";
import { Modal } from "./Modal";

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  if (!project) return null;
  return (
    <Modal open={!!project} onClose={onClose} title={project.heading} wide>
      <div className="mb-4 flex flex-wrap gap-2">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${projectTypeBadgeClass(project.type)}`}>
          {projectTypeLabel(project.type)}
        </span>
        {project.type === "office" && (
          <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-medium text-amber-300">
            NDA
          </span>
        )}
      </div>
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Why</h4>
        <p className="mt-2 text-base leading-relaxed text-slate-300">{project.reason}</p>
      </div>
      <div className="mt-6">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Tech</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {project.tech.map((t) => <span key={t} className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-slate-300">{t}</span>)}
        </div>
      </div>
      {(project.demoUrl || project.repoUrl) && (
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400">Live demo</a>}
          {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/5">GitHub</a>}
        </div>
      )}
      {project.futureWork.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">What&apos;s next</h4>
          <ul className="mt-2 space-y-2">
            {project.futureWork.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-slate-300"><span className="text-emerald-400">→</span>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {project.type === "office" && (
        <p className="mt-6 border-t border-white/10 pt-6 text-xs leading-relaxed text-slate-500">
          Internal product — details shared under NDA. Reach out for context on my
          role and stack.
        </p>
      )}
    </Modal>
  );
}
