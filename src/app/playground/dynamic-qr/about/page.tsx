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
    <div className="h-full overflow-y-auto px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/playground" className="hover:text-emerald-400">
            Playground
          </Link>
          <span aria-hidden>/</span>
          <Link href="/playground/dynamic-qr" className="hover:text-emerald-400">
            Dynamic QR
          </Link>
          <span aria-hidden>/</span>
          <span className="text-slate-300">About</span>
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-white">About Dynamic QR</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Dynamic QR creates a permanent short link (`/r/slug`) behind the QR image. Scans hit the
          redirect endpoint first, get logged, then continue to your destination URL.
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-slate-300 marker:text-emerald-400/80">
          <li>Edit destination later without reprinting the QR.</li>
          <li>See trends for scans, locations, devices, OS, and browsers.</li>
          <li>Use one dashboard to copy links and download QR PNGs again.</li>
        </ul>
        <Link
          href="/playground/dynamic-qr/new"
          className="mt-8 inline-flex rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
        >
          Create dynamic QR
        </Link>
      </div>
    </div>
  );
}
