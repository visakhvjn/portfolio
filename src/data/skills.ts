export type SkillCategory = {
  title: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages & frameworks",
    items: [
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Express",
      "React",
      "Next.js",
      "NestJS",
      "Golang",
      "EJS",
    ],
  },
  {
    title: "Databases & ORM",
    items: ["MongoDB", "Mongoose", "PostgreSQL", "Prisma", "Elasticsearch"],
  },
  {
    title: "Testing",
    items: ["Mocha", "Unit & integration testing"],
  },
  {
    title: "Cloud & DevOps",
    items: [
      "AWS",
      "Azure",
      "GCP",
      "Terraform",
      "Docker",
      "Kubernetes",
      "CI/CD",
    ],
  },
  {
    title: "AI & tooling",
    items: [
      "OpenAI",
      "RAG",
      "LangChain",
      "Vector databases",
      "Cursor",
      "Claude Code",
    ],
  },
  {
    title: "Also worked with",
    items: [
      "PHP",
      ".NET",
      "Python",
      "Open edX",
      "Payment gateways",
      "Google Maps APIs",
      "Tailwind CSS",
      "Make.com",
    ],
  },
];
