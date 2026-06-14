import { projects } from "@/data/projects";
import type { Project } from "@/types";

function hasProjectLink(project: Project) {
  return !!(project.demoUrl || project.repoUrl);
}

export function getAllProjects(): Project[] {
  return projects
    .map((project, index) => ({ project, index }))
    .sort((a, b) => {
      const aHasLink = hasProjectLink(a.project);
      const bHasLink = hasProjectLink(b.project);
      if (aHasLink !== bHasLink) return aHasLink ? -1 : 1;
      return a.index - b.index;
    })
    .map(({ project }) => project);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  return getAllProjects()
    .filter((p) => p.slug !== project.slug && p.type === project.type)
    .slice(0, limit);
}
