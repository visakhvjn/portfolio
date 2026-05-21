export type ResumeProjectEntry = {
  name: string;
  description: string;
  url?: string;
};

export type ResumeBulletLink = {
  name: string;
  url: string;
  start: number;
};

export type ResumeBullet = {
  text: string;
  link?: ResumeBulletLink;
};

export type ResumeWorkEntry = {
  company: string;
  location: string;
  role: string;
  period: string;
  bullets: ResumeBullet[];
};

export type ResumeContent = {
  profileImagePath: string | null;
  name: string;
  title: string;
  email: string;
  phone: string;
  bio: string;
  portfolioUrl: string;
  links: { label: string; url: string }[];
  skillCategories: { title: string; items: string }[];
  workExperience: ResumeWorkEntry[];
  education: { line: string }[];
  projects: ResumeProjectEntry[];
  achievements: string[];
  languages: string;
  interests: string;
};
