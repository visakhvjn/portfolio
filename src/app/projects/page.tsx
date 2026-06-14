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
    <div className="py-8 sm:py-12">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition hover:text-emerald-400"
      >
        <span aria-hidden>←</span> Back to portfolio
      </Link>
      <header className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Projects
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">
          Browse the work — open a live demo from the card or view details for the
          full story, stack, and roadmap.
        </p>
      </header>
      <ul className="mt-10 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allProjects.map((project) => (
          <li key={project.slug} className="h-full">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}
