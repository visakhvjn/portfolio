import { site } from "@/data/site";
import { projectThumbnailPath } from "@/lib/projectThumbnail";
import type { Project } from "@/types";

type ProjectJsonLdProps = {
  project: Project;
};

export function ProjectJsonLd({ project }: ProjectJsonLdProps) {
  const pageUrl = `${site.portfolioUrl}/projects/${project.slug}`;
  const imageUrl = `${site.portfolioUrl}${projectThumbnailPath(project)}`;

  const creativeWork = {
    "@context": "https://schema.org",
    "@type": project.demoUrl ? "SoftwareApplication" : "CreativeWork",
    name: project.heading,
    description: project.summary,
    url: project.demoUrl ?? pageUrl,
    image: imageUrl,
    keywords: project.tech.join(", "),
    author: {
      "@type": "Person",
      name: site.name,
      url: site.portfolioUrl,
    },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.portfolioUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${site.portfolioUrl}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.heading,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWork) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </>
  );
}
