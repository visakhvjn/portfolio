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
      "Next.js",
      "React",
      "NestJS",
    ],
  },
  {
    title: "Databases & ORM",
    items: ["MongoDB", "Mongoose", "PostgreSQL", "Prisma"],
  },
  {
    title: "Testing",
    items: ["Mocha"],
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS", "Terraform", "Docker", "Kubernetes"],
  },
  {
    title: "AI & tooling",
    items: ["RAGs", "LangChain", "LangGraph", "MCP"],
  },
  {
    title: "Also worked with",
    items: [
      "PHP",
      "Golang",
      "Azure",
      "GCP",
      "Elasticsearch",
      "Open edX",
      "Payment gateways",
      "Google Maps APIs",
      "Tailwind CSS",
      "Make.com",
    ],
  },
];
