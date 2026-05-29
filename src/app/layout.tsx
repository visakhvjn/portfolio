import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { site } from "@/data/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.portfolioUrl),
  title: "Visakh Vijayan | Senior Full-Stack Engineer",
  description:
    "Portfolio of Visakh Vijayan — senior full-stack engineer with 8+ years building SaaS, fintech, health, and AI-powered products.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Visakh Vijayan | Senior Full-Stack Engineer",
    description:
      "8+ years across React, Node, Next.js, cloud, and AI integrations.",
    type: "website",
    url: site.portfolioUrl,
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
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
