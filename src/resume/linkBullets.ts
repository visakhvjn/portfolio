import { projects } from "@/data/projects";
import type { ExperienceEntry } from "@/types";
import type { ResumeBullet } from "./types";

const projectsBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

type LinkCandidate = { name: string; url: string };

/** Extra names as they appear in experience bullets (beyond project headings). */
const slugAliases: Record<string, string[]> = {
  "unify-domains": ["Unify Domains"],
  summit: ["SUMMIT"],
  lvpei: ["LVPEI"],
  "relaxx-ai": ["Relaxx.AI"],
  "pinch-life": ["The Pinch Life"],
  "recco-joy": ["Recco Joy"],
  styleade: ["StyleAde"],
  "vawsum-payments": ["Vawsum Payments"],
};

function projectUrl(slug: string): string | undefined {
  const p = projectsBySlug[slug];
  if (!p) return undefined;
  return p.demoUrl ?? p.repoUrl;
}

function linkCandidatesForJob(entry: ExperienceEntry): LinkCandidate[] {
  const seen = new Set<string>();
  const candidates: LinkCandidate[] = [];

  const add = (name: string, url: string) => {
    const key = name.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    candidates.push({ name, url });
  };

  for (const slug of entry.relatedSlugs ?? []) {
    const url = projectUrl(slug);
    if (!url) continue;
    const project = projectsBySlug[slug];
    if (project) add(project.heading, url);
    for (const alias of slugAliases[slug] ?? []) {
      add(alias, url);
    }
  }

  return candidates;
}

function findNameInBullet(text: string, name: string): number {
  const lower = text.toLowerCase();
  const needle = name.toLowerCase();
  let from = 0;

  while (from < lower.length) {
    const idx = lower.indexOf(needle, from);
    if (idx === -1) return -1;

    const before = idx > 0 ? lower[idx - 1] : " ";
    const afterIdx = idx + needle.length;
    const after = afterIdx < lower.length ? lower[afterIdx] : " ";

    const okBefore = /[\s(,—–\[-]/.test(before) || idx === 0;
    const okAfter = /[\s,.—–)\]-]/.test(after) || afterIdx === lower.length;

    if (okBefore && okAfter) return idx;
    from = idx + 1;
  }

  return -1;
}

export function buildLinkedBullet(
  text: string,
  candidates: LinkCandidate[],
): ResumeBullet {
  const sorted = [...candidates].sort((a, b) => b.name.length - a.name.length);

  for (const { name, url } of sorted) {
    const start = findNameInBullet(text, name);
    if (start >= 0) {
      return { text, link: { name, url, start } };
    }
  }

  return { text };
}

export function buildLinkedBulletsForJob(entry: ExperienceEntry): ResumeBullet[] {
  const candidates = linkCandidatesForJob(entry);
  return entry.bullets.map((text) => buildLinkedBullet(text, candidates));
}
