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

const sectionLabel =
  "text-xs font-medium uppercase tracking-[0.14em] text-muted";

export function ProjectDetail({ project }: ProjectDetailProps) {
  const related = getRelatedProjects(project);
  const thumbnailSrc = projectThumbnailPath(project);

  return (
    <>
      <ProjectJsonLd project={project} />
      <article className="mx-auto max-w-3xl py-10 sm:py-16">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-ink"
        >
          <span aria-hidden>←</span> All projects
        </Link>

        <header className="mt-8">
          <div className="mb-5 flex flex-wrap gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${projectTypeBadgeClass(project.type)}`}
            >
              {projectTypeLabel(project.type)}
            </span>
            {project.type === "office" && (
              <span className="rounded-full border border-line bg-card px-2.5 py-0.5 text-xs font-medium text-muted">
                NDA
              </span>
            )}
          </div>
          <h1 className="font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
            {project.heading}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {project.summary}
          </p>
        </header>

        <div className="relative mt-10 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-surface">
          <Image
            src={thumbnailSrc}
            alt={`${project.heading} preview`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover object-top"
          />
        </div>

        <section className="mt-12">
          <h2 className={sectionLabel}>Why</h2>
          <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-ink-soft">
            {project.reason}
          </p>
        </section>

        <section className="mt-10">
          <h2 className={sectionLabel}>Tech</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs text-ink-soft"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {project.runSteps && project.runSteps.length > 0 && (
          <section className="mt-10">
            <h2 className={sectionLabel}>How to run</h2>
            <ol className="mt-5 space-y-6">
              {project.runSteps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-medium text-accent-strong">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-ink">{step.title}</h3>
                    {step.description && (
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                        {step.description}
                      </p>
                    )}
                    {step.code && (
                      <pre className="mt-3 overflow-x-auto rounded-xl border border-line bg-surface p-3 text-xs leading-relaxed text-ink sm:text-sm">
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
          <section className="mt-10">
            <h2 className={sectionLabel}>Docker Compose</h2>
            <pre className="mt-3 overflow-x-auto rounded-xl border border-line bg-surface p-4 text-xs leading-relaxed text-ink sm:text-sm">
              <code>{project.dockerCompose}</code>
            </pre>
          </section>
        )}

        {(project.demoUrl || project.repoUrl) && (
          <section className="mt-10 flex flex-col gap-2 sm:flex-row">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-canvas transition hover:bg-ink-soft"
              >
                Live demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-surface"
              >
                GitHub
              </a>
            )}
          </section>
        )}

        {project.futureWork.length > 0 && (
          <section className="mt-10">
            <h2 className={sectionLabel}>What&apos;s next</h2>
            <ul className="mt-3 space-y-2">
              {project.futureWork.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
                  <span className="text-accent" aria-hidden>
                    →
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.type === "office" && (
          <p className="mt-10 border-t border-line pt-6 text-xs leading-relaxed text-muted">
            Internal product — details shared under NDA. Reach out for context on
            my role and stack.
          </p>
        )}

        {related.length > 0 && (
          <section className="mt-14 border-t border-line pt-10">
            <h2 className={sectionLabel}>More projects</h2>
            <ul className="mt-4 divide-y divide-line">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="font-serif text-lg text-ink transition group-hover:text-accent-strong">
                      {p.heading}
                    </span>
                    <span
                      className="shrink-0 text-sm text-faint transition group-hover:text-accent-strong"
                      aria-hidden
                    >
                      →
                    </span>
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
