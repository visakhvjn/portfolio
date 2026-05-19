import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { site } from "@/data/site";
import {
  experienceProductExtras,
  experienceProductOrder,
} from "./experienceProducts";
import type { Project } from "@/types";
import type {
  ResumeContent,
  ResumeProductLine,
  ResumeProjectEntry,
  ResumeWorkEntry,
} from "./types";

const projectsBySlug = Object.fromEntries(
  projects.map((p) => [p.slug, p]),
);

function resolveProductLine(
  experienceId: string,
  item: { slug?: string; extraIndex?: number },
): ResumeProductLine | null {
  if (item.slug) {
    const project = projectsBySlug[item.slug];
    if (!project) return null;
    return {
      name: project.heading,
      description: project.summary,
      url: project.demoUrl,
    };
  }
  if (item.extraIndex !== undefined) {
    const extras = experienceProductExtras[experienceId];
    return extras?.[item.extraIndex] ?? null;
  }
  return null;
}

function buildWorkExperience(): ResumeWorkEntry[] {
  return experience.map((entry) => {
    const order = experienceProductOrder[entry.id] ?? [];
    const products = order
      .map((item) => resolveProductLine(entry.id, item))
      .filter((line): line is ResumeProductLine => line !== null);

    return {
      company: entry.company,
      location: entry.location,
      period: entry.period,
      products,
    };
  });
}

function buildEducation() {
  return education.map((e) => {
    const period = e.period.replace(/\s*–\s*/g, "-");
    return {
      line: `${e.resumeDegree ?? e.degree} from ${e.institution} (${period}) with ${e.detail}.`,
    };
  });
}

/** Personal projects included in the resume PROJECTS section (order preserved). */
const resumePersonalProjectSlugs = [
  "dumpd",
  "rolush",
  "startup-stress-tester",
  "ai-debator",
  "daily-motivation-ai",
] as const;

function resumeOneLiner(project: Project): string {
  if (project.resumeLine) return project.resumeLine;
  const first = project.summary.split(/(?<=[.!?])\s+/)[0];
  return first ?? project.summary;
}

function buildResumeProjects(): ResumeProjectEntry[] {
  const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

  return resumePersonalProjectSlugs
    .map((slug) => bySlug[slug])
    .filter((p): p is Project => p !== undefined)
    .map((p) => ({
      name: p.heading,
      description: resumeOneLiner(p),
      url: p.demoUrl,
    }));
}

export function buildResumeContent(
  profileImagePath: string | null,
): ResumeContent {
  return {
    profileImagePath,
    name: site.name,
    title: site.title,
    email: site.email,
    phone: site.phone,
    bio: site.resumeBio,
    portfolioUrl: site.portfolioUrl,
    links: [
      { label: "LinkedIn", url: site.links.linkedin },
      { label: "Medium", url: site.links.medium },
      { label: "Leet Code", url: site.links.leetcode },
    ],
    skillCategories: skillCategories.map((cat) => ({
      title: cat.title,
      items: cat.items.join(", "),
    })),
    workExperience: buildWorkExperience(),
    education: buildEducation(),
    projects: buildResumeProjects(),
    achievements: [site.achievement],
    languages: site.languages.join(", "),
    interests: site.interests.join(", "),
  };
}
