import { site } from "@/data/site";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Dynamic QR | Playground | Visakh Vijayan",
  description:
    "How Dynamic QR works: short-link redirects, scan analytics, editable destinations, and owner dashboards.",
  alternates: { canonical: "/playground/dynamic-qr/about" },
  openGraph: {
    title: "About Dynamic QR | Playground",
    url: `${site.portfolioUrl}/playground/dynamic-qr/about`,
  },
};

export default function DynamicQrAboutPage() {
  return (
    <div className="h-full overflow-y-auto px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-2 text-sm text-muted">
          <Link href="/playground" className="transition-colors hover:text-ink">
            Playground
          </Link>
          <span aria-hidden>/</span>
          <Link href="/playground/dynamic-qr" className="transition-colors hover:text-ink">
            Dynamic QR
          </Link>
          <span aria-hidden>/</span>
          <span className="text-ink-soft">About</span>
        </div>
        <h1 className="mt-6 font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">About Dynamic QR</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">
          Dynamic QR creates a permanent short link (`/r/slug`) behind the QR image. Scans hit the
          redirect endpoint first, get logged, then continue to your destination URL.
        </p>
        <ul className="mt-8 list-disc space-y-3 border-t border-line pl-5 pt-8 text-base leading-relaxed text-ink-soft marker:text-accent">
          <li>Edit destination later without reprinting the QR.</li>
          <li>See trends for scans, locations, devices, OS, and browsers.</li>
          <li>Use one dashboard to copy links and download QR PNGs again.</li>
        </ul>
        <Link
          href="/playground/dynamic-qr/new"
          className="mt-10 inline-flex rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-canvas hover:bg-ink-soft"
        >
          Create dynamic QR
        </Link>
      </div>
    </div>
  );
}
