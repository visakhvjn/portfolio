"use client";

import { site } from "@/data/site";
import { Navbar } from "./Navbar";

type SiteChromeProps = {
  children: React.ReactNode;
  onContactClick?: () => void;
};

export function SiteChrome({ children, onContactClick }: SiteChromeProps) {
  return (
    <>
      <Navbar onContactClick={onContactClick} />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-24 sm:px-6">
        {children}
        <footer className="mt-10 border-t border-white/10 pt-8 text-center text-sm text-slate-500">
          <p>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline"
            >
              WhatsApp
            </a>
            {" · "}
            <a href={`mailto:${site.email}`} className="hover:text-emerald-400">
              {site.email}
            </a>
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Visakh Vijayan.</p>
        </footer>
      </main>
    </>
  );
}
