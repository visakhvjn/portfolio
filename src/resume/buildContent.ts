import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { site } from "@/data/site";
import type { Project } from "@/types";
import { buildLinkedBulletsForJob } from "./linkBullets";
import type {
  ResumeContent,
  ResumeProjectEntry,
  ResumeWorkEntry,
} from "./types";

function buildWorkExperience(): ResumeWorkEntry[] {
  return experience.map((entry) => ({
    company: entry.company,
    location: entry.location,
    role: entry.role,
    period: entry.period,
    bullets: buildLinkedBulletsForJob(entry),
  }));
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
  "innovative-strategic",
  "ai-debator",
  "ident-dental",
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
      url: p.demoUrl ?? p.repoUrl,
    }));
}

export function buildResumeContent(
  profileImagePath: string | null,
): ResumeContent {
  return {
    profileImagePath,
    name: site.name,
    title: site.resumeTitle,
    email: site.email,
    phone: site.phone,
    bio: site.resumeBio,
    portfolioUrl: site.portfolioUrl,
    links: [
      { label: "LinkedIn", url: site.links.linkedin },
      { label: "GitHub", url: site.links.github },
      { label: "Medium", url: site.links.medium },
      { label: "LeetCode", url: site.links.leetcode },
    ],
    skillCategories: skillCategories
      .filter((cat) => cat.title !== "Also worked with")
      .map((cat) => ({
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
