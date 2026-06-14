import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { WebSiteJsonLd } from "@/components/WebSiteJsonLd";
import { site } from "@/data/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
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
    <html lang="en" className={`${dmSans.variable} h-full`}>
      <body className="mesh-bg min-h-full antialiased">
        <PersonJsonLd />
        <WebSiteJsonLd />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
