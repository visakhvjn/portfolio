import type { ExperienceEntry } from "@/types";

export const experience: ExperienceEntry[] = [
  {
    id: "unify",
    company: "Unify Technologies",
    location: "Hyderabad, India",
    role: "Full-Stack Developer",
    period: "Jun 2025 – Present",
    current: true,
    collapsedPreview:
      "Fintech, edtech, compliance, AI health, and community products across the Unify portfolio.",
    summary:
      "Shipping investor, domain, edtech, compliance, AI health, and community products across the Unify portfolio.",
    bullets: [
      "Building Remus, a micro-investment app focused on simple, accessible spare-change investing.",
      "Working on domain aggregation (Unify Domains) and an Open edX–based LMS (LVPEI) with a microservices setup.",
      "Improved compliance workflows on SUMMIT for regulated reporting and violation detection through stronger UI/UX.",
      "Integrated OpenAI and AI services into Relaxx.AI for real-time, frontend-driven health guidance.",
      "Contributed to company web revamps, MyKula (parent–educator–business community), and related platform work.",
    ],
    tech: [
      "React",
      "TypeScript",
      "Next.js",
      "Node",
      "NestJS",
      "OpenAI",
      "MongoDB",
      "Postgres",
      "AWS",
    ],
    relatedSlugs: ["remus", "relaxx-ai", "summit", "lvpei"],
  },
  {
    id: "better",
    company: "Better Software",
    location: "Bangalore, India",
    role: "Full-Stack Engineer · Team Lead",
    period: "Oct 2021 – Mar 2025",
    collapsedPreview:
      "NLP/RAG platform engineering, contractual automation UI, and team lead on facility-management and ad-analytics products.",
    summary:
      "Full-stack and lead responsibilities on AI-backed and B2B SaaS products for US and India markets.",
    bullets: [
      "Nesh — engineered a platform using OpenAI to retrieve ingested data via NLP.",
      "Bionic — UI engineer for contractual workflow automation for enterprises.",
      "The Pinch Life — team lead on a widely used facility-management SaaS in India.",
      "SunLead — team lead for a US-focused solar lead-generation product.",
      "Recco Joy — team lead on recommendations, ad performance dashboards, and offer disbursement for businesses.",
    ],
    tech: ["React", "TypeScript", "Node", "OpenAI", "NLP"],
    relatedSlugs: ["nesh", "pinch-life"],
  },
  {
    id: "seenit",
    company: "SeenIt Online",
    location: "Kolkata, India",
    role: "Full-Stack Engineer",
    period: "Feb 2020 – Sep 2021",
    collapsedPreview:
      "MERN migration, luxury e-commerce onboarding, and Elasticsearch-powered search.",
    summary:
      "Modernized a legacy commerce stack and improved B2C performance for high-end retail integrations.",
    bullets: [
      "Led StyleAde migration from PHP to the MERN stack.",
      "Built a vendor onboarding flow connecting luxury brand CRMs to low-latency B2C storefronts.",
      "Improved search and faceted browse with Elasticsearch.",
    ],
    tech: ["React", "Node", "MongoDB", "PHP", "Elasticsearch"],
    relatedSlugs: ["styleade"],
  },
  {
    id: "vawsum",
    company: "Vawsum Schools",
    location: "India",
    role: "Software Engineer",
    period: "Oct 2016 – Jan 2020",
    collapsedPreview:
      "School payments, admissions tooling, RFID attendance, bus tracking, and internal ops panels.",
    summary:
      "End-to-end features for schools, parents, and admins — payments, academics, and operations.",
    bullets: [
      "Designed a school fee payments module and aggregator admin used across transaction types and gateways.",
      "Built Vawme (course prescription), drag-and-drop enquiry/forms for admissions and certificates, and timetable integrations.",
      "Integrated RFID attendance with parent-facing updates; Trakkerz bus tracking with Google Maps live view (.NET services).",
      "Delivered an SMS vendor management panel with load-based prioritization.",
    ],
    tech: ["Node", ".NET", "Payment gateways", "Google Maps", "RFID"],
    relatedSlugs: ["vawsum-payments"],
  },
];
