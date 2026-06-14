import { site } from "@/data/site";
import { projectThumbnailPath } from "@/lib/projectThumbnail";
import { getProjectBySlug } from "@/lib/projects";
import type { Metadata } from "next";

export function buildProjectMetadata(slug: string): Metadata {
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = `${project.heading} | Visakh Vijayan`;
  const description = project.summary;
  const canonical = `/projects/${slug}`;
  const image = projectThumbnailPath(project);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${site.portfolioUrl}${canonical}`,
      images: [{ url: image, alt: `${project.heading} preview` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
