"use client";

import { navItems, site } from "@/data/site";
import { useCallback, useEffect, useRef, useState } from "react";

type NavbarProps = {
  onContactClick: () => void;
};

type NavId = (typeof navItems)[number]["id"];

const HEADER_OFFSET = 88;

export function Navbar({ onContactClick }: NavbarProps) {
  const [active, setActive] = useState<NavId>("me");
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollLockRef = useRef<NavId | null>(null);
  const scrollLockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateActiveSection = useCallback(() => {
    if (scrollLockRef.current) {
      setActive(scrollLockRef.current);
      return;
    }

    let current: NavId = navItems[0].id;

    for (const { id } of navItems) {
      const el = document.getElementById(id);
      if (!el) continue;

      const top = el.getBoundingClientRect().top;
      if (top <= HEADER_OFFSET) {
        current = id;
      }
    }

    setActive(current);
  }, []);

  useEffect(() => {
    updateActiveSection();

    const onScroll = () => {
      requestAnimationFrame(updateActiveSection);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveSection);
      if (scrollLockTimerRef.current) clearTimeout(scrollLockTimerRef.current);
    };
  }, [updateActiveSection]);

  const scrollTo = (id: NavId) => {
    setMenuOpen(false);
    setActive(id);
    scrollLockRef.current = id;

    if (scrollLockTimerRef.current) clearTimeout(scrollLockTimerRef.current);
    scrollLockTimerRef.current = setTimeout(() => {
      scrollLockRef.current = null;
      updateActiveSection();
    }, 900);

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#070b14]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <button
          type="button"
          onClick={() => scrollTo("me")}
          className="font-semibold tracking-tight text-white"
        >
          {site.name.split(" ")[0]}
          <span className="text-emerald-400">.</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active === item.id
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <a
            href={site.resumePath}
            download={site.resumeDownloadName}
            className="rounded-lg border border-white/10 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-emerald-500/40 hover:bg-white/5"
          >
            Resume
          </a>
          <button
            type="button"
            onClick={onContactClick}
            className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Contact
          </button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="rounded-lg p-2 text-slate-300 md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/5 bg-[#070b14] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className={`rounded-lg px-3 py-3 text-left text-sm font-medium ${
                  active === item.id ? "bg-white/10 text-white" : "text-slate-400"
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href={site.resumePath}
              download={site.resumeDownloadName}
              className="mt-2 rounded-lg border border-white/10 px-3 py-3 text-center text-sm font-medium text-slate-200"
            >
              Download Resume
            </a>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onContactClick();
              }}
              className="mt-2 rounded-lg bg-emerald-500 px-3 py-3 text-sm font-semibold text-slate-950"
            >
              Contact me
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
