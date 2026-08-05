import type { ExperienceEntry } from "@/types";

export const experience: ExperienceEntry[] = [
  {
    id: "adesso",
    company: "Adesso India",
    location: "Kochi, Kerala",
    role: "Senior Associate",
    period: "Jul 2026 – Present",
    current: true,
    companyUrl: "https://www.adesso.in/en/index-12.jsp",
    collapsedPreview:
      "Senior Associate at Adesso India, based in Kochi — delivering software across client and product engagements.",
    summary:
      "Senior Associate at Adesso India in Kochi, Kerala — contributing to software delivery and engineering across client engagements.",
    bullets: [
      "Joined Adesso India as Senior Associate in Kochi, Kerala, contributing to software delivery and engineering across client engagements.",
    ],
    resumeBullets: [
      "Senior Associate at Adesso India (Kochi, Kerala) — contributing to software delivery and engineering across client engagements.",
    ],
    tech: [],
  },
  {
    id: "unify",
    company: "Unify Technologies",
    location: "Hyderabad, India",
    role: "Senior Software Engineer",
    period: "Jun 2025 – Jun 2026",
    collapsedPreview:
      "Product research and delivery, edtech, compliance, AI health, and community products across the Unify portfolio.",
    summary:
      "Investment, edtech, and AI products — from Remus research and technical documentation to compliance, health, and community platforms.",
    bullets: [
      "Remus — researched product and engineering approach, documented requirements and system design, and aligned client stakeholders and engineering leadership on a spare-change micro-investment app.",
      "Unify Domains — full-stack on a NameSilo-powered domain reseller with PM and QA: NameSilo integration, payment-failure UX, Stripe/Razorpay escrow hold-and-authorize flows, and an admin panel for purchases, renewals, and activity.",
      "LVPEI — helped set up an Open edX LMS on a Kubernetes cluster with the DevOps team; dockerized services and learned new tooling to run the platform on k8s.",
      "SUMMIT — built the compliance dashboard UI from scratch; wired Python backend compliance APIs with TanStack Query for caching, retries, and state preservation.",
      "Relaxx.AI — built a ChatGPT wrapper to upload patient prescriptions and generate medical reports users can discuss conversationally, with context preserved across the session.",
      "MyKula — built backend and frontend for a social app connecting educators, students, and parents (NestJS, React).",
      "Contributed to company web revamps across Unify marketing properties.",
    ],
    resumeBullets: [
      "Remus — led technical research and end-to-end documentation for a spare-change micro-investment app; walked client stakeholders and engineering management through requirements, architecture, flows, and implementation details to align delivery.",
      "Unify Domains — full-stack engineer on a NameSilo domain-reseller platform; with product and QA, designed end-to-end reseller flows, coordinated integration with the NameSilo team, revamped UI for payment failures and Stripe/Razorpay escrow hold-and-authorize payments, and built an admin panel with a 360° view of purchases, renewals, and account activity.",
      "LVPEI — set up an Open edX LMS on a Kubernetes cluster with the DevOps team; dockerized platform components, learned new deployment tooling, and brought services online on k8s for institutional course delivery.",
      "SUMMIT — built a compliance dashboard UI from scratch (React, TypeScript); integrated Python backend compliance APIs with TanStack Query for caching, retries, and preserved client state across regulated reporting and violation-detection workflows.",
      "Relaxx.AI — built a ChatGPT/OpenAI wrapper that lets users upload patient prescriptions, generates structured medical reports, and supports conversational voice interaction with preserved session context.",
      "MyKula — full-stack engineer on a social platform for educators, students, and parents; built NestJS backend and React frontend for community features and engagement.",
      "Unify marketing web — contributed to company website revamps across Unify properties.",
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
      "Stripe",
      "Razorpay",
      "Docker",
      "Kubernetes",
      "Open edX",
      "TanStack Query",
      "Python",
    ],
    relatedSlugs: ["remus", "unify-domains", "unify-trust", "relaxx-ai", "summit", "lvpei"],
  },
  {
    id: "better",
    company: "Better Software",
    location: "Bangalore, India",
    role: "Senior Software Engineer",
    period: "Oct 2021 – Mar 2025",
    collapsedPreview:
      "Team lead on facility-management and ad-analytics SaaS; NLP/RAG and enterprise automation across US and India products.",
    summary:
      "Senior engineer and team lead on B2B SaaS — led a 3-person squad on The Pinch Life (facility management), with client discovery, sprint ownership, and delivery across AI and analytics products.",
    bullets: [
      "The Pinch Life — team lead for a 3-engineer squad building a facility-management SaaS in India; gathered requirements with clients, owned sprint planning and prioritization, and shipped features operations teams rely on daily.",
      "Recco Joy — owned the backend for a closed social app that recommends nearby products from your nearest circle.",
      "SunLead — backend engineer on a US-focused solar lead-generation product.",
      "Nesh — backend engineer on a Q&A platform for chemical sales teams; built ingestion repositories so new companies' product documents could power sales questions.",
      "Bionic — UI engineer for contractual workflow automation for enterprises.",
    ],
    tech: ["React", "TypeScript", "Node", "OpenAI", "NLP"],
    relatedSlugs: ["nesh", "pinch-life", "recco-joy"],
    resumeBullets: [
      "The Pinch Life — team lead for a 3-engineer squad on a facility-management SaaS in India; gathered requirements with clients, owned sprint planning and prioritization, and delivered features used daily by operations teams.",
      "Recco Joy — backend owner for a closed social platform surfacing nearby product recommendations from a user's nearest circle (Node.js, APIs, data models).",
      "SunLead — backend engineer on a US-focused solar lead-generation product (Node.js, APIs, data pipelines).",
      "Nesh — backend engineer on a multi-engineer team building a Q&A platform for chemical sales companies; ingested product documents into company repositories so sales teams could ask questions and get grounded answers to support deals (OpenAI, NLP).",
      "Bionic — UI engineer for enterprise contractual workflow automation.",
    ],
  },
  {
    id: "seenit",
    company: "SeenIt Online",
    location: "Kolkata, India",
    role: "Senior Software Engineer",
    period: "Feb 2020 – Sep 2021",
    collapsedPreview:
      "iOS collections backend, Elasticsearch search rebuild, and luxury fashion e-commerce.",
    summary:
      "Backend for a dress-collections iOS app and a from-scratch Elasticsearch search experience with Amazon-style faceted filters.",
    bullets: [
      "SeenIt — owned backend for a new iOS app that let users create recommended collections of dresses.",
      "Rewrote catalog search from scratch in Elasticsearch with Amazon-style left-panel filters and faceted browse.",
    ],
    tech: ["Node.js", "iOS", "Elasticsearch", "React", "MongoDB"],
    relatedSlugs: ["styleade"],
    resumeLinkAliases: [
      { name: "SeenIt", url: "https://www.linkedin.com/company/seenit-in/" },
    ],
    resumeBullets: [
      "SeenIt — owned backend APIs for a new iOS app enabling recommended dress collections—supporting creation, surfacing, and collection workflows for the mobile experience.",
      "Rebuilt product search from scratch in Elasticsearch with Amazon-style left-side filters and faceted catalog browse for faster, filter-driven discovery.",
    ],
  },
  {
    id: "vawsum",
    company: "Vawsum Schools",
    location: "India",
    role: "Software Engineer",
    period: "Oct 2017 – Jan 2020",
    collapsedPreview:
      "School payments, admissions tooling, RFID attendance, bus tracking, and internal ops panels.",
    summary:
      "End-to-end features for schools, parents, and admins — payments, academics, and operations.",
    bullets: [
      "Vawsum — single-handedly introduced the school fee payments module—replacing a fully manual process with backend and mobile changes across gateways, and trained parents and school stakeholders.",
      "Built Vawme (course prescription), drag-and-drop enquiry/forms for admissions and certificates, and timetable integrations.",
      "RFID attendance — visited schools on-site to demo the process; built app-based attendance, parent-facing updates, and backend reporting.",
      "Trakkerz — bus tracking with Google Maps live view (.NET services).",
      "SMS routing — built failsafe multi-vendor SMS routing with failover on errors or traffic spikes, sent/delivered reporting, and a Chrome extension to track vendor balances.",
    ],
    tech: ["Node", ".NET", "Payment gateways", "Google Maps", "RFID", "Chrome extension"],
    relatedSlugs: ["vawsum-payments"],
    resumeBullets: [
      "Vawsum — single-handedly introduced the school fee payments module, replacing an all-manual fee collection process; delivered backend and mobile integration across payment gateways and trained parents and school stakeholders on digital payments.",
      "Built Vawme (course prescription), drag-and-drop enquiry/forms for admissions and certificates, and timetable integrations.",
      "RFID attendance — visited each school on-site to demo the rollout; delivered mobile app attendance, parent-facing updates, and backend reporting for school admins.",
      "Trakkerz — integrated bus tracking with Google Maps live view (.NET services).",
      "SMS vendor platform — built failsafe routing across multiple SMS vendors with automatic rerouting on failure or heavy load; delivered sent/delivered reporting and a Google Chrome extension for company-wide vendor balance tracking.",
    ],
  },
];
