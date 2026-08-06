import { QrGenerator } from "@/components/playground/QrGenerator";
import { site } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Generator | Playground | Visakh Vijayan",
  description:
    "Paste a URL, generate a QR code, and download the PNG. Static, client-side, no accounts.",
  alternates: {
    canonical: "/playground/qr-generator",
  },
  openGraph: {
    title: "QR Generator | Playground",
    description:
      "Paste a URL, generate a QR code, and download the PNG.",
    type: "website",
    url: `${site.portfolioUrl}/playground/qr-generator`,
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Generator | Playground",
    description:
      "Paste a URL, generate a QR code, and download the PNG.",
  },
};

export default function QrGeneratorPage() {
  return <QrGenerator />;
}
