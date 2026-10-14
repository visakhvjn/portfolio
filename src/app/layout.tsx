import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { WebMcpProvider } from "@/components/webmcp/WebMcpProvider";
import { WebSiteJsonLd } from "@/components/WebSiteJsonLd";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const defaultTitle = "Visakh Vijayan | Senior Full-Stack Engineer";
const defaultDescription =
  "Portfolio of Visakh Vijayan — senior full-stack engineer with 8+ years building SaaS, fintech, health, and AI-powered products.";

export const metadata: Metadata = {
  metadataBase: new URL(site.portfolioUrl),
  title: defaultTitle,
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: defaultTitle,
    description:
      "8+ years across React, Node, Next.js, cloud, and AI integrations.",
    type: "website",
    url: site.portfolioUrl,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} h-full`}
    >
      <body className="min-h-full bg-canvas text-ink antialiased">
        <PersonJsonLd />
        <WebSiteJsonLd />
        <WebMcpProvider>{children}</WebMcpProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
