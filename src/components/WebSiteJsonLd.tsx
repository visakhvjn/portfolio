import { site } from "@/data/site";

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${site.name} — Portfolio`,
    url: site.portfolioUrl,
    description: site.tagline,
    author: {
      "@type": "Person",
      name: site.name,
      url: site.portfolioUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
