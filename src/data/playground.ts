export type PlaygroundProject = {
  slug: string;
  title: string;
  description: string;
  href: string;
  ai: boolean;
};

export const playgroundProjects: PlaygroundProject[] = [
  {
    slug: "blog-generator",
    title: "Blog Generator",
    description:
      "Chat on the left, watch a markdown blog draft appear on the right. Bring your own OpenAI key.",
    href: "/playground/blog-generator",
    ai: true,
  },
];
