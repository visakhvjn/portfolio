import { projectThumbnailPath } from "@/lib/projectThumbnail";
import { getRelatedProjects } from "@/lib/projects";
import { projectTypeBadgeClass, projectTypeLabel } from "@/lib/projectType";
import type { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { ProjectJsonLd } from "./ProjectJsonLd";

type ProjectDetailProps = {
  project: Project;
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  const related = getRelatedProjects(project);
  const thumbnailSrc = projectThumbnailPath(project);

  return (
    <>
      <ProjectJsonLd project={project} />
      <article>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition hover:text-emerald-400"
        >
          <span aria-hidden>←</span> All projects
        </Link>

        <div className="relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
          <Image
            src={thumbnailSrc}
            alt={`${project.heading} preview`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover object-top"
          />
        </div>

        <header className="mt-8">
          <div className="mb-4 flex flex-wrap gap-2">
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
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {project.heading}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            {project.summary}
          </p>
        </header>

        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Why
          </h2>
          <p className="mt-2 whitespace-pre-line text-base leading-relaxed text-slate-300">
            {project.reason}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Tech
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {project.runSteps && project.runSteps.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              How to run
            </h2>
            <ol className="mt-4 space-y-6">
              {project.runSteps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-semibold text-emerald-400">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-white">{step.title}</h3>
                    {step.description && (
                      <p className="mt-1 text-sm leading-relaxed text-slate-300">
                        {step.description}
                      </p>
                    )}
                    {step.code && (
                      <pre className="mt-2 overflow-x-auto rounded-lg border border-white/10 bg-slate-950/80 p-3 text-xs leading-relaxed text-slate-300 sm:text-sm">
                        <code>{step.code}</code>
                      </pre>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {project.dockerCompose && (
          <section className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Docker Compose
            </h2>
            <pre className="mt-2 overflow-x-auto rounded-xl border border-white/10 bg-slate-950/80 p-4 text-xs leading-relaxed text-slate-300 sm:text-sm">
              <code>{project.dockerCompose}</code>
            </pre>
          </section>
        )}

        {(project.demoUrl || project.repoUrl) && (
          <section className="mt-8 flex flex-col gap-2 sm:flex-row">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
              >
                Live demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/5"
              >
                GitHub
              </a>
            )}
          </section>
        )}

        {project.futureWork.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              What&apos;s next
            </h2>
            <ul className="mt-2 space-y-2">
              {project.futureWork.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-slate-300">
                  <span className="text-emerald-400">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.type === "office" && (
          <p className="mt-8 border-t border-white/10 pt-6 text-xs leading-relaxed text-slate-500">
            Internal product — details shared under NDA. Reach out for context on
            my role and stack.
          </p>
        )}

        {related.length > 0 && (
          <section className="mt-12 border-t border-white/10 pt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              More projects
            </h2>
            <ul className="mt-4 space-y-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="text-sm text-slate-300 transition hover:text-emerald-400"
                  >
                    {p.heading}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}
