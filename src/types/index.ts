export type ProjectType = "office" | "personal" | "ai" | "games";

export type Project = {
  slug: string;
  heading: string;
  type: ProjectType;
  summary: string;
  /** One-line blurb for the generated resume PDF. */
  resumeLine?: string;
  reason: string;
  tech: string[];
  demoUrl?: string;
  repoUrl?: string;
  futureWork: string[];
  featured?: boolean;
  nda?: boolean;
};

export type ExperienceEntry = {
  id: string;
  company: string;
  location: string;
  role: string;
  period: string;
  current?: boolean;
  collapsedPreview: string;
  summary: string;
  bullets: string[];
  tech: string[];
  relatedSlugs?: string[];
};

export type EducationEntry = {
  degree: string;
  /** Shorter label for the generated resume PDF. */
  resumeDegree?: string;
  institution: string;
  period: string;
  detail: string;
};
