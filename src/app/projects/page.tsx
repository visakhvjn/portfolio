import { ProjectCard } from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";
import { site } from "@/data/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects | Visakh Vijayan",
  description:
    "Portfolio projects by Visakh Vijayan — SaaS, fintech, health, AI, and full-stack web applications built with React, Next.js, Node.js, and cloud.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Visakh Vijayan",
    description:
      "SaaS, fintech, health, AI, and full-stack web applications by Visakh Vijayan.",
    type: "website",
    url: `${site.portfolioUrl}/projects`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Visakh Vijayan",
    description:
      "SaaS, fintech, health, AI, and full-stack web applications by Visakh Vijayan.",
  },
};

export default function ProjectsIndexPage() {
  const allProjects = getAllProjects();

  return (
    <div className="py-10 sm:py-16">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-ink"
      >
        <span aria-hidden>←</span> Back to portfolio
      </Link>
      <header className="mt-8">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
          Work
        </p>
        <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          Projects
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Browse the work — open a live demo from the card or view details for the
          full story, stack, and roadmap.
        </p>
      </header>
      <ul className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allProjects.map((project) => (
          <li key={project.slug} className="h-full">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}
