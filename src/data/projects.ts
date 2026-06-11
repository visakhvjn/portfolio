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
    slug: "ident-dental",
    heading: "iDent Dental",
    type: "personal",
    featured: true,
    summary:
      "Marketing site for a Kochi dental speciality and cosmetic centre — services across general, cosmetic, orthodontic, and implant care, before-and-after testimonials, doctor profiles, and appointment booking.",
    resumeLine:
      "Dental clinic marketing site with services, before/after testimonials, doctor profiles, and appointment booking in Kochi.",
    reason:
      "Dental clinics need a site that builds trust before the first visit—clear services, real patient outcomes, and an easy path to book. iDent Dental Speciality & Cosmetic Centre in Panampilly Nagar, Kochi needed that for a practice spanning preventive care, cosmetic transformations, orthodontics, implants, pediatric dentistry, and emergency visits. I built the marketing site end-to-end: navigation across service areas, a testimonials section with before-and-after transformations, specialist doctor profiles, and appointment booking so patients understand what the clinic offers and how to reach the team. The design leans into credibility for healthcare: readable service copy, social proof from real cases, and mobile-friendly layouts on Vercel so the practice can iterate as services and seasons change.",
    tech: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Vercel",
      "S3",
      "CloudFront",
      "Certificate Manager",
      "IAM",
    ],
    demoUrl: "https://www.identdentalcare.com/",
    futureWork: [
      "Online appointment scheduling with calendar integration",
      "Patient resources or blog for oral health tips",
      "Multilingual support (English / Malayalam)",
    ],
  },
  {
    slug: "dumpd",
    heading: "Dumpd!",
    type: "ai",
    featured: true,
    summary:
      "Content engine with an MCP server for AI assistants — draft, publish, and manage markdown posts from Cursor and other clients; public blogs at /username and a dashboard for manual edits.",
    resumeLine:
      "MCP-powered content engine: manage drafts and publishing from AI assistants, with public /username blogs and a creator dashboard.",
    reason:
      "Builders who live in Cursor and other AI assistants still treat publishing as a context switch—drafts pile up in the editor while nothing ships publicly. Dumpd is a content engine built around that workflow: an MCP server so assistants can create, draft, and publish markdown posts; a dashboard when you want to edit by hand; and a public blog at /username so output becomes a portfolio you maintain, not local files. Google sign-in, API keys for MCP clients, and tools like create_post with draft vs published status complete the loop. It is my bet on AI assistants as a real management surface for content—not just generation in chat, but operating a live publication from the same session where you work.",
    tech: [
      "Next.js",
      "TypeScript",
      "MCP",
      "Google OAuth",
      "Markdown",
      "Vercel",
    ],
    demoUrl: "https://dumpd.in/",
    futureWork: [
      "Custom domain support",
      "Post analytics",
      "Additional MCP tools for scheduling and SEO",
    ],
  },
  {
    slug: "relaxx-ai",
    heading: "Relaxx.AI",
    type: "office",
    nda: true,
    featured: true,
    summary:
      "ChatGPT wrapper for health — upload prescriptions, generate medical reports, and discuss them conversationally with context preserved across the session.",
    reason:
      "Relaxx.AI helps users make sense of medical information without feeling like they are fighting a chatbot. I built a ChatGPT/OpenAI wrapper where patients upload prescriptions and the system generates clearer medical reports they can then talk through like a conversation—voice and text—with context preserved so follow-up questions stay grounded in what was already shared. The work spanned API integration, report generation flows, and frontend patterns that keep the experience continuous rather than a series of disconnected prompts.",
    tech: ["React", "TypeScript", "OpenAI", "ChatGPT", "Node"],
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
      "Q&A platform for chemical sales companies — ingest product documents and let sales teams ask questions to understand offerings and close deals.",
    reason:
      "Chemical sales teams need fast, accurate product knowledge—not another document dump. Nesh is a Q&A platform where company documents are ingested and salespeople ask questions in natural language to understand what they are selling. I was on a large engineering team and owned backend work to build ingestion repositories for new companies—pipelines that take chemical product information in and make it queryable for the sales workflow. The goal was grounded answers that help reps move conversations forward, not generic AI completions.",
    tech: ["Node.js", "OpenAI", "NLP", "RAG"],
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
      "Compliance dashboard built from scratch — React UI wired to Python compliance APIs with TanStack Query for caching, retries, and state preservation.",
    reason:
      "For chemical companies in regulated environments, compliance means hours reading reports, cross-checking rules, and catching violations before they become liabilities. I built SUMMIT’s dashboard UI from scratch—a React front end that connects multiple compliance APIs from a Python backend. TanStack Query handled caching, retries, and state preservation so reviewers could move through regulatory data without losing context or hammering the server. The goal was predictable, auditable workflows: surface violations and report status fast when the stakes are high.",
    tech: ["React", "TypeScript", "TanStack Query", "Python"],
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
      "Team lead for a 3-engineer squad on a facility-management SaaS in India — client requirements, sprint planning, and delivery for operations teams who rely on the platform every day.",
    reason:
      "Facility management at scale is coordination under pressure—vendors, sites, tickets, and clients all expecting the platform to keep up. The Pinch Life is a widely used SaaS in that space in India, and I led a team of three engineers while we shipped features, stabilized delivery, and kept the product usable for operations teams who live in the tool daily. Leading here meant talking to clients to understand requirements, running sprints end to end, aligning the squad on priorities, and maintaining a bar for quality across a codebase that serves real businesses with real SLAs. The product succeeds when FM teams stop fighting the software and start relying on it for everyday workflows—which is the standard we held the team to.",
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
      "Closed social app for recommending nearby products from your nearest circle. Owned the entire backend.",
    reason:
      "Recco Joy is a closed social network built around trust in your nearest circle—not open feeds, but recommendations from people close to you for products nearby. I owned the full backend: APIs, data models, and services that power location-aware recommendations and the social graph behind them. The challenge was making nearby, circle-based recommendations feel relevant without the noise of a public social app.",
    tech: ["Node.js", "React", "TypeScript", "MongoDB"],
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
      "Micro-investment app for spare-change investing. Led technical research and documentation and aligned client and engineering leadership on requirements and system design.",
    reason:
      "Traditional investing apps assume users already have capital, confidence, and time to learn markets. Remus targets a different moment: spare change and small amounts, invested simply enough that the barrier to starting feels low. I researched the product space, documented the full engineering approach—requirements, architecture, flows, and delivery plan—and walked client stakeholders and engineering management through each decision so the team could build with clarity. The product only works for beginners if it feels safe and understandable on the first screen; that alignment work was as important as the implementation.",
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
      "Full-stack domain reseller on NameSilo — registration flows, Stripe/Razorpay escrow payments, payment-failure UX, and an admin panel for purchases, renewals, and activity.",
    reason:
      "Unify Domains is a domain reseller built on NameSilo. I worked across frontend and backend with a product manager and QA to ship the full reseller journey—availability and registration, back-and-forth integration with the NameSilo team, and payment flows that had to handle real money carefully. That included revamping the UI for payment failures, Stripe and Razorpay escrow accounts, and hold-and-authorize payment logic, plus an admin panel that gives operations a 360° view of purchases, renewals, and account activity. Domain products fail when checkout or renewals are opaque; we optimized for clarity when payments stall and when staff need full visibility into what customers bought and when.",
    tech: ["React", "TypeScript", "Node", "NestJS", "Stripe", "Razorpay", "NameSilo"],
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
      "Open edX LMS stood up on Kubernetes with DevOps — dockerized services and platform setup for reliable institutional course delivery.",
    reason:
      "LVPEI needed a learning platform that could run reliably at institutional scale. I worked with the DevOps team to set up Open edX on a Kubernetes cluster—learning new tools along the way, dockerizing components, and getting services running on k8s. The work was as much about deployment and operations as about the LMS itself: making sure course delivery had a stable foundation engineering could iterate on without relearning the stack every release.",
    tech: ["Open edX", "Docker", "Kubernetes", "Python"],
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
      "Introduced school fee payments single-handedly—backend, mobile, and gateway integration replacing a fully manual collection process, plus stakeholder training.",
    reason:
      "Before this module, school fee collection at Vawsum was handled entirely by hand—staff, parents, and schools juggling cash, calls, and spreadsheets. I single-handedly introduced the payments product: major changes across backend and mobile, integration with payment gateways, and an aggregator view for schools and ops. Rollout also meant training parents and school stakeholders so adoption stuck. Fee collection became a product capability instead of a manual process schools had to run on their own.",
    tech: ["Node.js", "Mobile", "Payment gateways", "MongoDB"],
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
  {
    slug: "guess-the-pic",
    heading: "Guess the Pic",
    type: "games",
    featured: true,
    summary:
      "One photo, one word — a quick picture-guessing game where you decode the image and type the answer. Built for fast rounds and shareable “can you get it?” moments.",
    resumeLine:
      "Picture-guessing word game: one image, one answer, built for quick playable rounds on the web.",
    reason:
      "I wanted a small game that is easy to open and hard to put down — no account, no tutorial wall, just a photo and a single word to figure out. Guess the Pic is that loop: show a striking image, let the player guess, and keep the UI light enough to work on mobile. I built it on Next.js and deployed to Vercel so I could iterate on image sourcing, difficulty, and feedback without overbuilding backend infrastructure. It sits in my portfolio as a contrast to dashboards and agents: product craft focused on delight, pacing, and clarity in a few seconds of play.",
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Vercel"],
    demoUrl: "https://guess-the-pic.vercel.app/",
    futureWork: [
      "Daily challenge mode and streaks",
      "Difficulty tiers and hint system",
      "Shareable score cards",
    ],
  },
];
