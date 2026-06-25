"use client";

import { projects } from "@/data/projects";
import { site } from "@/data/site";
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
      email: site.email,
      calendlyUrl: site.calendlyUrl,
      resumeUrl: `${site.portfolioUrl}${site.resumePath}`,
      links: site.links,
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

  return null;
}
