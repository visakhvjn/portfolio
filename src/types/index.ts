export type ProjectType = "office" | "personal";

export type Project = {
  slug: string;
  heading: string;
  type: ProjectType;
  summary: string;
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
  institution: string;
  period: string;
  detail: string;
};
