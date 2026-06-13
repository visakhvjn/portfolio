import type { Project } from "@/types";

/** Drop images in public/images/projects/ named {slug}.jpg (or set project.thumbnail). */
export function projectThumbnailPath(project: Project) {
  return project.thumbnail ?? `/images/projects/${project.slug}.jpg`;
}
