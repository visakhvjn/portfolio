import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { site } from "@/data/site";
import { buildLinkedBulletsForJob } from "./linkBullets";
import { resumeProjectCopy } from "./projectCopy";
import type {
  ResumeContent,
  ResumeProjectEntry,
  ResumeWorkEntry,
} from "./types";

function buildWorkExperience(): ResumeWorkEntry[] {
  return experience.map((entry) => {
    const bullets = entry.resumeBullets ?? entry.bullets;
    return {
      company: entry.company,
      location: entry.location,
      role: entry.role,
      period: entry.period,
      bullets: buildLinkedBulletsForJob({ ...entry, bullets }),
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
  "pdf-rag",
  "ident-dental",
  "quiz-prep",
  "ai-debator",
  "innovative-strategic",
] as const;

function buildResumeProjects(): ResumeProjectEntry[] {
  const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

  return resumePersonalProjectSlugs.flatMap((slug) => {
    const project = bySlug[slug];
    const copy = resumeProjectCopy[slug];
    if (!project || !copy) return [];
    return [
      {
        title: copy.title,
        description: copy.description,
        url:
          project.demoUrl ??
          project.repoUrl ??
          `${site.portfolioUrl}/projects/${project.slug}`,
      },
    ];
  });
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
