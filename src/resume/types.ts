export type ResumeProductLine = {
  name: string;
  description: string;
  url?: string;
};

export type ResumeWorkEntry = {
  company: string;
  location: string;
  period: string;
  products: ResumeProductLine[];
};

export type ResumeProjectEntry = {
  name: string;
  description: string;
  url?: string;
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
