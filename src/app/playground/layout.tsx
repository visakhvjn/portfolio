import { SiteChrome } from "@/components/SiteChrome";

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteChrome>{children}</SiteChrome>;
}
