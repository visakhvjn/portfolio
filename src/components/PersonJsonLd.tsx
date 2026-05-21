import { site } from "@/data/site";

export function PersonJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title,
    email: site.email,
    telephone: site.phone,
    url: site.portfolioUrl,
    sameAs: [
      site.links.linkedin,
      site.links.github,
      site.links.medium,
      site.links.leetcode,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
