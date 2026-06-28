export type ProjectType = "office" | "personal" | "ai" | "games";

export type ProjectRunStep = {
  title: string;
  description?: string;
  code?: string;
};

export type Project = {
  slug: string;
  heading: string;
  type: ProjectType;
  summary: string;
  /** One-line blurb for the generated resume PDF. */
  resumeLine?: string;
  reason: string;
  tech: string[];
  /** Image under public/, e.g. /images/projects/rolush.jpg. Defaults to /images/projects/{slug}.jpg */
  thumbnail?: string;
  demoUrl?: string;
  repoUrl?: string;
  futureWork: string[];
  featured?: boolean;
  nda?: boolean;
  /** Optional docker-compose.yml shown on the project detail page. */
  dockerCompose?: string;
  /** Optional setup / run instructions for the project detail page. */
  runSteps?: ProjectRunStep[];
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
  /** Richer bullets for the generated resume PDF (ATS-friendly). Falls back to bullets. */
  resumeBullets?: string[];
  /** Extra linkable names in resume bullets (name → URL). */
  resumeLinkAliases?: { name: string; url: string }[];
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

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  instructor?: string;
  completedOn: string;
  duration?: string;
  /** Topics and skills covered by the certificate. */
  keywords: string[];
  /** Optional blog post reflecting on what you learned. */
  blogUrl?: string;
  credentialUrl?: string;
};
