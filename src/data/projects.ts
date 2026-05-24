import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "rolush",
    heading: "Rolush Cafe",
    type: "personal",
    featured: true,
    summary:
      "Custom cake studio web app for a Kannur bakery — browse categories, customise orders, cart checkout, and WhatsApp-led enquiries. A full customer-facing storefront built for celebrations from birthdays to weddings.",
    resumeLine:
      "Custom cake studio storefront with categories, cart checkout, and WhatsApp-led orders.",
    reason:
      "Rolush needed more than a static menu online: a real storefront where customers in Kannur could explore cakes by occasion, see featured picks, customise orders, and reach the studio without friction. I built the web app end-to-end — product browsing by category (birthdays, weddings, anniversaries, and more), detailed cake pages, cart flows, a customise-your-cake path, and WhatsApp as the primary conversion channel for orders and questions. The site reflects how I approach small-business products: clear UX for non-technical owners, mobile-friendly layouts, and a stack that is fast to deploy and easy to extend as the menu and seasons change.",
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Vercel"],
    demoUrl: "https://rolush-web-app.vercel.app/",
    futureWork: [
      "Online payment integration beyond WhatsApp-led orders",
      "Admin tooling for menu and seasonal featured cakes",
      "Delivery slot booking and order tracking",
    ],
  },
  {
    slug: "innovative-strategic",
    heading: "Innovative & Strategic F.Z.E",
    type: "personal",
    featured: true,
    summary:
      "Marketing site for a UAE accounting and management consultancy in Ajman Free Zone — seven service areas, packages, FAQ, testimonials, and consultation booking for clients across the UAE, UK, and Georgia.",
    resumeLine:
      "Consultancy marketing site with service pages, packages, FAQ, and consultation booking for a UAE accounting firm.",
    reason:
      "Accounting and tax firms need a site that earns trust before the first call—clear services, compliance signals, and a simple path to book a consultation. Innovative & Strategic F.Z.E needed that for their Ajman Free Zone practice: corporate tax, VAT, audit, bookkeeping, AML, and advisory work across the UAE, UK, and Georgia. I built the marketing site end-to-end—navigation across seven practice areas, packages and FAQ pages, client testimonials, track-record highlights, and contact and consultation flows so prospects see what they offer and how to reach the team. The design leans into credibility for regulated industries: readable service copy, FTA and compliance cues, and mobile-friendly layouts on Vercel so the firm can iterate as services and regulations change.",
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Vercel"],
    demoUrl: "https://www.innovativestrategic.com/",
    futureWork: [
      "Insights or blog section for UAE tax and VAT updates",
      "Integrated online consultation scheduling",
      "Multilingual support (English / Arabic)",
    ],
  },
  {
    slug: "dumpd",
    heading: "Dumpd!",
    type: "personal",
    featured: true,
    summary:
      "Self-sustaining AI blog where OpenAI generates articles, voices, and media on a schedule. Express and MongoDB backend with cron automation, LinkedIn distribution via Make.com, and Google Analytics — now serving 100+ daily active users.",
    resumeLine:
      "Self-sustaining AI blog with automated content, cron publishing, and 100+ daily active users.",
    reason:
      "Most side projects stop at a demo. I wanted to see whether an AI-native publication could run itself in production—generating articles, voices, and media on a schedule, publishing without manual effort, and still attracting real readers. Dumpd! is that experiment: a full product loop from OpenAI-driven content creation through Express and MongoDB, automated cron jobs, LinkedIn distribution via Make.com, and Google Analytics to measure what actually lands. It now serves 100+ daily active users, which validated both the technical pipeline and the idea that AI-assisted content can sustain an audience when the ops layer is treated as seriously as the model calls.",
    tech: [
      "Node.js",
      "Express",
      "EJS",
      "Tailwind",
      "OpenAI",
      "MongoDB",
      "Mongoose",
    ],
    futureWork: [
      "Add auth and an admin dashboard for content moderation",
      "Improve cost controls and caching for OpenAI calls",
      "Migrate templating from EJS to a component-based frontend",
      "Richer analytics beyond GA for content performance",
    ],
  },
  {
    slug: "relaxx-ai",
    heading: "Relaxx.AI",
    type: "office",
    nda: true,
    featured: true,
    summary:
      "AI-powered personal health assistant where OpenAI is wired into the frontend for real-time, conversational guidance. Focus on responsive UX, streaming flows, and integration patterns that make AI feel native to the product.",
    reason:
      "Health guidance products fail when AI feels bolted on—slow, disconnected from the UI, or hard to trust in the moment. Relaxx.AI needed the opposite: a personal health assistant where OpenAI and related AI services are wired directly into the frontend so users get responsive, conversational help as they move through the app. My work focused on integrating those APIs cleanly with the client experience—handling real-time flows, error states, and the product patterns that make AI output feel like part of the product rather than a chat widget pasted on the side. The goal was accessible, immediate guidance for everyday wellness questions while keeping the architecture ready for stricter safety and disclaimer requirements as the product matures.",
    tech: ["React", "TypeScript", "OpenAI", "Node"],
    demoUrl: "https://relaxx.ai/",
    futureWork: [
      "Stronger medical disclaimers and safety guardrails",
      "Offline-friendly flows for critical health information",
      "Latency optimization for streaming AI responses",
    ],
  },
  {
    slug: "nesh",
    heading: "Nesh",
    type: "office",
    featured: true,
    summary:
      "Enterprise platform that ingests documents and lets users query them in natural language via OpenAI and NLP. Work spanned retrieval pipelines, grounded answers, and a frontend that surfaces trust and context.",
    reason:
      "Teams sitting on large document corpora often cannot search them in the way they think—they need answers, not ten blue links. Nesh was built for that gap: ingest structured and unstructured information, then let users ask questions in natural language and get responses grounded in what was actually stored. As an engineer on the platform, I worked on the path from ingested data through NLP and OpenAI retrieval—making sure queries returned useful, context-aware results rather than generic completions. The product sits at the intersection of search, RAG-style retrieval, and conversational UI, which meant balancing model behavior, retrieval quality, and a frontend that makes trust and provenance obvious to the user.",
    tech: ["Node", "OpenAI", "NLP", "React", "TypeScript"],
    futureWork: [
      "Expand evaluation metrics for retrieval quality",
      "Fine-tune chunking and embedding strategies",
      "Admin tooling for ingestion pipelines",
    ],
  },
  {
    slug: "summit",
    heading: "SUMMIT",
    type: "office",
    nda: true,
    summary:
      "Compliance management tool for chemical companies in regulated markets. Redesigned review workflows so teams can move through regulatory reports faster and surface violations with clearer UI/UX.",
    reason:
      "For chemical companies in regulated environments, compliance is not a back-office checkbox—it is hours spent reading reports, cross-checking rules, and catching violations before they become liabilities. SUMMIT exists to compress that work: a compliance management tool where reviewers can move through regulatory reports with less friction and spot issues earlier. A large part of my contribution was UI/UX—redesigning flows so reviewers spend less time hunting for context and more time making decisions. That meant clearer information hierarchy, better workflows for report review, and interfaces that surface violations and status without forcing users through unnecessary steps. Good compliance software is boring in the right way: predictable, auditable, and fast when the stakes are high.",
    tech: ["React", "TypeScript", "Node"],
    demoUrl: "https://lemon-mud-07e985e0f.6.azurestaticapps.net/",
    futureWork: [
      "Deeper violation detection dashboards",
      "Bulk review and export workflows",
      "Role-based views for auditors vs operators",
    ],
  },
  {
    slug: "pinch-life",
    heading: "The Pinch Life",
    type: "office",
    featured: true,
    summary:
      "Team lead on a widely used facility-management SaaS in India. Coordinated delivery, unblocked engineers, and kept quality high for operations teams who rely on the platform every day.",
    reason:
      "Facility management at scale is coordination under pressure—vendors, sites, tickets, and clients all expecting the platform to keep up. The Pinch Life is a widely used SaaS in that space in India, and I served as team lead while we shipped features, stabilized delivery, and kept the product usable for operations teams who live in the tool daily. Leading here meant more than assigning tasks: aligning engineers on priorities, unblocking integration and UI work, and maintaining a bar for quality across a codebase that serves real businesses with real SLAs. The product succeeds when FM teams stop fighting the software and start relying on it for everyday workflows—which is the standard we held the team to.",
    tech: ["React", "Node", "TypeScript", "MongoDB"],
    demoUrl: "https://pinch.co.in/",
    futureWork: [
      "Mobile-first workflows for on-site facility staff",
      "Reporting modules for enterprise clients",
    ],
  },
  {
    slug: "recco-joy",
    heading: "Recco Joy",
    type: "office",
    featured: true,
    summary:
      "Team lead on recommendations, ad performance dashboards, and offer disbursement for businesses. Shipped tooling that helps brands measure campaigns and reward customers with clearer operational visibility.",
    reason:
      "Recco Joy sits at the intersection of social proof, creator-style profiles, and business outcomes—recommendations that matter, ads that need honest performance numbers, and offers that have to land without manual chaos. As team lead, I helped drive delivery across recommendation flows, ad performance dashboards, and offer disbursement so businesses could see what was working and act on it in one place. The work was less about a single flashy feature and more about reliable pipelines: data that stakeholders trust, UIs that ops teams can run weekly, and engineering rhythm that kept shipping as requirements shifted. Public-facing product marketing lives on the main site; my focus was the business and growth tooling behind it.",
    tech: ["React", "TypeScript", "Node"],
    demoUrl: "https://reccojoy.com/",
    futureWork: [
      "Deeper campaign attribution and cohort reporting",
      "Self-serve offer configuration for business accounts",
    ],
  },
  {
    slug: "remus",
    heading: "Remus",
    type: "office",
    nda: true,
    summary:
      "Micro-investment app that makes spare-change investing simple for first-time users. Built for low friction, clear money flows, and UX that feels trustworthy on the very first screen.",
    reason:
      "Traditional investing apps assume users already have capital, confidence, and time to learn markets. Remus targets a different moment: spare change and small amounts, invested simply enough that the barrier to starting feels low. The product is a micro-investment app focused on making that first step accessible—clear flows, minimal friction, and UX that does not overwhelm people who are new to investing. My work supported building and refining that experience on the stack side, with an emphasis on reliability and clarity where money movement and trust are involved. Fintech for beginners only works if the product feels safe and understandable on the first screen.",
    tech: ["React", "React Native", "Node", "TypeScript"],
    futureWork: [
      "Onboarding flows for first-time investors",
      "Portfolio insights and notification preferences",
    ],
  },
  {
    slug: "unify-domains",
    heading: "Unify Domains",
    type: "office",
    summary:
      "Domain search and registration platform with instant availability checks, WHOIS privacy, and global DNS—built for a clean, focused domain management experience without upsells.",
    reason:
      "Domain management products often bury search behind upsells and cluttered dashboards. Unify Domains is a domain aggregation platform where users can find, register, and manage names with instant availability checks, recommended TLD guidance, WHOIS privacy, and low-latency global DNS. My work sits in the full-stack delivery of that experience—search and registration flows, account management, and the product surfaces that keep domain operations simple for businesses and creators who need reliability without noise.",
    tech: ["React", "TypeScript", "Node", "NestJS"],
    demoUrl: "https://unify.domains/",
    futureWork: [
      "Bulk domain import and portfolio dashboards",
      "DNS template presets for common hosting providers",
    ],
  },
  {
    slug: "unify-trust",
    heading: "Unify Trust",
    type: "office",
    summary:
      "Corporate website revamp for Unify Technologies—modernized marketing pages, service positioning, and client storytelling across digital engineering practices.",
    reason:
      "Unify’s public site is the front door for enterprise clients evaluating digital engineering partners. I contributed to revamping unifytech.com with a redesigned UI—clearer information architecture for services and industry expertise, updated visual language, and layouts that surface the scale of Unify’s client work without overwhelming visitors. The goal was a credible, contemporary marketing presence that matches the quality of delivery behind the brand.",
    tech: ["React", "TypeScript", "Next.js"],
    demoUrl: "https://www.unifytech.com/",
    futureWork: [
      "Case-study templates for featured client work",
      "Localized office and careers pages",
    ],
  },
  {
    slug: "lvpei",
    heading: "LVPEI LMS",
    type: "office",
    nda: true,
    summary:
      "Large-scale learning platform on Open edX extended with a microservices architecture. Supports reliable course delivery, integrations, and independent deployment of services across enrollment peaks.",
    reason:
      "Large institutions cannot run learning on a monolith that buckles every enrollment season. LVPEI’s LMS is built on Open edX but extended with a microservices architecture so course delivery, integrations, and scale can evolve independently. The motivation is straightforward: learners and faculty need a stable platform; engineering needs services that can be deployed, monitored, and changed without risking the entire system. I contributed within that architecture—working across the edX ecosystem and supporting services that keep learning paths, content, and institutional requirements aligned. Edtech at this level is as much about operational resilience as it is about classroom features.",
    tech: ["Open edX", "Python", "Microservices", "React"],
    futureWork: [
      "Service observability and deployment automation",
      "Learner analytics dashboards",
    ],
  },
  {
    slug: "styleade",
    heading: "StyleAde",
    type: "office",
    summary:
      "Migrated StyleAde from PHP to the MERN stack and built vendor onboarding that connected luxury brand CRMs to low-latency B2C storefronts.",
    reason:
      "SeenIt’s StyleAde product had years of value locked in a legacy PHP stack that was slowing every new feature and making hiring and maintenance harder. The business case for migration was not ‘JavaScript is trendy’—it was speed to ship, a clearer separation between API and UI, and a stack the team could own long term. I was part of moving that commerce experience to the MERN stack: preserving behavior users relied on while replacing the foundation underneath. Migrations like this fail when teams big-bang rewrite; ours was grounded in incremental delivery, parity on critical paths, and measurable wins on performance and developer velocity once the new stack was in place.",
    tech: ["React", "Node", "MongoDB", "Express", "PHP"],
    futureWork: [],
  },
  {
    slug: "vawsum-payments",
    heading: "Vawsum Payments",
    type: "office",
    summary:
      "School fee collection module and admin aggregator across multiple payment gateways. Replaced manual reconciliation with a single panel for schools and company ops to track every transaction type.",
    reason:
      "Schools in India collect fees through fragmented channels—cash, cards, different gateways—while admins need one place to see what was paid, what failed, and what is overdue. Before a unified module, that reconciliation work fell on staff with spreadsheets and phone calls. I designed and built the payments module and aggregator panel so schools could run all major transaction types through integrated gateways, with company and school admins sharing a single operational view. The outcome was practical: fee collection became a product feature instead of a manual process, and the company could onboard schools onto digital payments with far less custom work per site.",
    tech: ["Node", "Payment gateways", "MongoDB"],
    demoUrl: "https://vawsum.com/",
    futureWork: [],
  },
  {
    slug: "startup-stress-tester",
    heading: "Startup Stress Tester",
    type: "personal",
    summary:
      "Hands-on load and resilience testing tool for early-stage architectures. Simulates stress scenarios so you can see latency spikes and failure modes before production traffic does it for you.",
    resumeLine:
      "Load-testing tool for early-stage apps to surface latency and failure modes before production.",
    reason:
      "Startups often discover their breaking points in production—the first viral post or the first enterprise pilot—not in a planned test. I built Startup Stress Tester as a hands-on way to probe those weaknesses earlier: simulate load, see where latency spikes, and learn which assumptions in an architecture fall apart first. It is intentionally a learning and demo tool rather than a full commercial load platform, but it reflects how I think about reliability—make failure modes visible before users do. The project is also a playground for Next.js and TypeScript patterns I reuse on client work.",
    tech: ["Next.js", "TypeScript"],
    demoUrl: "https://startup-stress-tester.vercel.app/",
    futureWork: ["More scenario presets", "Exportable reports"],
  },
  {
    slug: "chat-and-more",
    heading: "Chat & More",
    type: "ai",
    featured: true,
    summary:
      "ChatGPT-style learning assistant powered by Gemini and LangGraph: each question triggers a graph that returns an answer, a summary, MCQs to check understanding, and follow-up prompts to go deeper.",
    resumeLine:
      "Gemini + LangGraph learning chat with answers, summaries, quizzes, and follow-up questions.",
    reason:
      "Most chat tools stop at a single reply. Chat & More is built for actually learning from a question—first a clear answer, then a short summary, then multiple-choice questions to verify you understood it, and finally suggested follow-ups for the next thing to ask. LangGraph orchestrates that multi-step pipeline so each stage runs in order with clear handoffs; Gemini generates the content at each step. The flow mirrors how people study: read, recap, test yourself, then continue. I built it as a product experiment in graph-based AI workflows and UX beyond a one-shot completion, deployed on Vercel for fast iteration.",
    tech: ["Next.js", "TypeScript", "React", "Gemini", "LangGraph", "Vercel"],
    demoUrl: "https://chat-and-more.vercel.app/",
    futureWork: [
      "Session history and saved study threads",
      "Difficulty levels for generated quizzes",
      "Export or share summary + MCQ sets",
    ],
  },
  {
    slug: "ai-debator",
    heading: "AI Debator",
    type: "ai",
    summary:
      "Multi-agent AI debate experience with opposing viewpoints and turn-taking. Experiments with prompt roles, real-time interaction, and UI patterns beyond single-assistant chat.",
    resumeLine:
      "Multi-agent AI debate app with opposing viewpoints and turn-taking beyond single-chat UIs.",
    reason:
      "Single-agent chat UIs hide a lot of interesting AI design space. AI Debator explores multi-perspective conversation: opposing arguments, turn-taking, and the feeling of a live debate rather than one assistant agreeing with you. I built it to experiment with prompt structure, agent roles, and real-time interaction patterns in a UI that is fun enough to share and technical enough to learn from. It is a product sketch for how structured disagreement and transparency might work in tools that go beyond Q&A—useful for interviews, demos, and sharpening my instincts on conversational product design.",
    tech: ["Next.js", "OpenAI", "TypeScript"],
    demoUrl: "https://ai-debator-liart.vercel.app/",
    futureWork: ["Topic packs", "Shareable debate transcripts"],
  },
  {
    slug: "daily-motivation-ai",
    heading: "Daily Motivation AI",
    type: "personal",
    summary:
      "Minimal daily motivation app with scheduled AI-generated quotes and stories. Make.com posts a LinkedIn summary of each day's content automatically — deployed on Vercel to iterate on retention, tone, and prompt design.",
    resumeLine:
      "Daily motivation app with scheduled AI quotes and stories, plus LinkedIn summaries via Make.com on Vercel.",
    reason:
      "Not every AI product needs a dashboard. Daily Motivation AI is the opposite—a deliberately small surface where the only job is to deliver something encouraging or useful once a day: an AI-generated quote and story, presented without noise. I wanted to test how little UI you need when the value is habitual and emotional rather than transactional, and how scheduling plus generation quality affects whether people actually return. A Make.com scenario closes the loop by posting a LinkedIn summary of each day's quote and story, so distribution runs without manual copy-paste—the same lightweight ops mindset as the app itself. Deployed on Vercel so I could iterate quickly on copy, prompts, and the automation flow without overbuilding infrastructure.",
    tech: ["Next.js", "OpenAI", "Make.com", "TypeScript"],
    demoUrl: "https://daily-motivation-ai-qfin.vercel.app/",
    futureWork: ["Personalization by mood/goals", "Push notifications"],
  },
];
