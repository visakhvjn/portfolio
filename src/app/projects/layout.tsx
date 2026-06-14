import { SiteChrome } from "@/components/SiteChrome";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteChrome>{children}</SiteChrome>;
}
