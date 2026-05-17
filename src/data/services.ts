import type { ServiceOffering } from "@/types/service";

export const serviceIntro =
  "I take on freelance and contract work building production-ready software — from greenfield products to integrations, migrations, and AI features. 8+ years across SaaS, fintech, health, and edtech.";

export const services: ServiceOffering[] = [
  {
    id: "full-stack",
    title: "Full-stack product development",
    description:
      "End-to-end web products with a polished UI and a solid backend — scoped for MVPs, new features, or v1 launches.",
    bullets: [
      "Dashboards, SaaS apps, and customer-facing flows",
      "Auth, roles, and core business logic",
      "Deployment-ready code with clear handoff",
    ],
    tech: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind"],
  },
  {
    id: "api",
    title: "API & backend engineering",
    description:
      "Reliable APIs and services that your frontend (or partners) can depend on.",
    bullets: [
      "REST APIs, webhooks, and third-party integrations",
      "Databases, caching, and data modeling",
      "Payment gateways and transactional flows",
    ],
    tech: ["Node.js", "Express", "NestJS", "PostgreSQL", "MongoDB", "Golang"],
  },
  {
    id: "ai",
    title: "AI integrations",
    description:
      "Practical OpenAI and retrieval features wired into real products — not demo chat widgets.",
    bullets: [
      "Chat, RAG, and document Q&A over your data",
      "Streaming UX, guardrails, and error handling",
      "Cost-aware design and production patterns",
    ],
    tech: ["OpenAI", "LangChain", "RAG", "Vector DBs"],
  },
  {
    id: "modernization",
    title: "Modernization & migrations",
    description:
      "Move legacy stacks forward without a risky big-bang rewrite.",
    bullets: [
      "PHP or monolith → modern JS/TS stacks",
      "Incremental delivery with parity on critical paths",
      "Performance and maintainability wins",
    ],
    tech: ["MERN", "React", "Node", "Elasticsearch"],
  },
];

export const howIWork = [
  "Align on scope, timeline, and success criteria up front",
  "Iterate in clear milestones with regular check-ins",
  "Ship production-minded code — tests and docs where they matter",
];
