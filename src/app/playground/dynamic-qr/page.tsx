import { AllDynamicQrList } from "@/components/playground/dynamic-qr/AllDynamicQrList";
import { site } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dynamic QR | Playground | Visakh Vijayan",
  description:
    "Create trackable QR codes with short links, redirects, and scan analytics.",
  alternates: { canonical: "/playground/dynamic-qr" },
  openGraph: {
    title: "Dynamic QR | Playground",
    url: `${site.portfolioUrl}/playground/dynamic-qr`,
  },
};

export default function DynamicQrIndexPage() {
  return <AllDynamicQrList />;
}
