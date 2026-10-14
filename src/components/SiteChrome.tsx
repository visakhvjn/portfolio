"use client";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

type SiteChromeProps = {
  children: React.ReactNode;
  onContactClick?: () => void;
};

export function SiteChrome({ children, onContactClick }: SiteChromeProps) {
  return (
    <>
      <Navbar onContactClick={onContactClick} />
      <main className="mx-auto max-w-6xl px-5 pb-8 pt-24 sm:px-8">
        {children}
        <Footer onContactClick={onContactClick} />
      </main>
    </>
  );
}
