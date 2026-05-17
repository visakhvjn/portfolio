import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Visakh Vijayan | Full-Stack Developer",
  description:
    "Portfolio of Visakh Vijayan — full-stack developer with 8+ years building SaaS, fintech, health, and AI-powered products.",
  openGraph: {
    title: "Visakh Vijayan | Full-Stack Developer",
    description:
      "8+ years across React, Node, Next.js, cloud, and AI integrations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full`}>
      <body className="mesh-bg min-h-full antialiased">{children}</body>
    </html>
  );
}
