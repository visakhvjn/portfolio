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
  {
    slug: "qr-generator",
    title: "QR Generator",
    description:
      "Paste a URL, get a QR code, download the PNG. No accounts, no tracking — just the code.",
    href: "/playground/qr-generator",
    ai: false,
  },
  {
    slug: "mcq-quiz",
    title: "MCQ Quiz",
    description:
      "Paste MCQs, parse with OpenAI (BYO key), save, share, and collect logged-in responses.",
    href: "/playground/mcq-quiz",
    ai: true,
  },
];
