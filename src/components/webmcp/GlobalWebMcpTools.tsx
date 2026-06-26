"use client";

import { certificates } from "@/data/certificates";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { linkedinRecommendations } from "@/data/linkedinRecommendations";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { skillCategories } from "@/data/skills";
import { getProjectBySlug } from "@/lib/projects";
import { useWebMCP } from "@mcp-b/react-webmcp";
import { z } from "zod";

export function GlobalWebMcpTools() {
  useWebMCP({
    name: "get_profile",
    description:
      "Get Visakh Vijayan's profile summary, contact info, social links, and resume URL.",
    inputSchema: z.object({}),
    annotations: { readOnlyHint: true },
    handler: async () => ({
      name: site.name,
      title: site.title,
      tagline: site.tagline,
      intro: site.intro,
      resumeBio: site.resumeBio,
      email: site.email,
      phone: site.phone,
      whatsappUrl: site.whatsappUrl,
      calendlyUrl: site.calendlyUrl,
      resumeUrl: `${site.portfolioUrl}${site.resumePath}`,
      links: site.links,
      languages: site.languages,
      achievement: site.achievement,
    }),
  });

  useWebMCP({
    name: "get_resume_links",
    description:
      "Get download URLs for resume (with and without photo) and cover letter.",
    inputSchema: z.object({}),
    annotations: { readOnlyHint: true },
    handler: async () => ({
      resume: `${site.portfolioUrl}${site.resumePath}`,
      resumeNoPhoto: `${site.portfolioUrl}${site.resumeNoPhotoPath}`,
      coverLetter: `${site.portfolioUrl}${site.coverLetterPath}`,
    }),
  });

  useWebMCP({
    name: "list_projects",
    description:
      "List portfolio projects with slug, heading, summary, tech stack, and demo links.",
    inputSchema: z.object({}),
    annotations: { readOnlyHint: true },
    handler: async () =>
      projects.map(({ slug, heading, summary, tech, demoUrl, repoUrl }) => ({
        slug,
        heading,
        summary,
        tech,
        demoUrl,
        repoUrl,
      })),
  });

  useWebMCP({
    name: "get_project",
    description: "Get full details for one portfolio project by slug.",
    inputSchema: {
      slug: z.string().describe("Project slug, e.g. dumpd or ident-dental"),
    },
    annotations: { readOnlyHint: true },
    handler: async ({ slug }) => {
      const project = getProjectBySlug(slug);
      if (!project) {
        throw new Error(`Project not found: ${slug}`);
      }
      return project;
    },
  });

  useWebMCP({
    name: "list_experience",
    description:
      "List work experience entries with company, role, period, summary, and tech stack.",
    inputSchema: z.object({}),
    annotations: { readOnlyHint: true },
    handler: async () =>
      experience.map(
        ({ id, company, location, role, period, current, summary, tech }) => ({
          id,
          company,
          location,
          role,
          period,
          current,
          summary,
          tech,
        }),
      ),
  });

  useWebMCP({
    name: "get_experience",
    description:
      "Get full details for one work experience entry by id (e.g. unify, better, seenit, vawsum).",
    inputSchema: {
      id: z
        .string()
        .describe("Experience id, e.g. unify, better, seenit, or vawsum"),
    },
    annotations: { readOnlyHint: true },
    handler: async ({ id }) => {
      const entry = experience.find((e) => e.id === id);
      if (!entry) {
        throw new Error(`Experience not found: ${id}`);
      }
      return entry;
    },
  });

  useWebMCP({
    name: "list_skills",
    description: "List skill categories and items from the portfolio.",
    inputSchema: z.object({}),
    annotations: { readOnlyHint: true },
    handler: async () => skillCategories,
  });

  useWebMCP({
    name: "list_education",
    description: "List education entries with degree, institution, and period.",
    inputSchema: z.object({}),
    annotations: { readOnlyHint: true },
    handler: async () => education,
  });

  useWebMCP({
    name: "list_services",
    description:
      "List freelance and contract service offerings with title, description, and tech.",
    inputSchema: z.object({}),
    annotations: { readOnlyHint: true },
    handler: async () =>
      services.map(({ id, title, description, tech }) => ({
        id,
        title,
        description,
        tech,
      })),
  });

  useWebMCP({
    name: "get_service",
    description:
      "Get full details for one service offering by id (full-stack, api, ai, modernization).",
    inputSchema: {
      id: z
        .string()
        .describe("Service id: full-stack, api, ai, or modernization"),
    },
    annotations: { readOnlyHint: true },
    handler: async ({ id }) => {
      const offering = services.find((s) => s.id === id);
      if (!offering) {
        throw new Error(`Service not found: ${id}`);
      }
      return offering;
    },
  });

  useWebMCP({
    name: "list_certificates",
    description: "List professional certificates and credentials.",
    inputSchema: z.object({}),
    annotations: { readOnlyHint: true },
    handler: async () => certificates,
  });

  useWebMCP({
    name: "list_recommendations",
    description:
      "List LinkedIn recommendations and testimonials from colleagues and managers.",
    inputSchema: z.object({}),
    annotations: { readOnlyHint: true },
    handler: async () =>
      linkedinRecommendations.map(
        ({ id, clientName, headline, relationship, review, source }) => ({
          id,
          clientName,
          headline,
          relationship,
          review,
          source,
        }),
      ),
  });

  return null;
}
