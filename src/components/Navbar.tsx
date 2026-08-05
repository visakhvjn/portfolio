"use client";

import { navItems, site } from "@/data/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type NavbarProps = {
  onContactClick?: () => void;
};

type NavId = (typeof navItems)[number]["id"];
type SectionId = NavId | "me";

const HEADER_OFFSET = 88;

function isNavSectionId(id: string): id is NavId {
  return navItems.some((item) => item.id === id && !("href" in item && item.href));
}

function isSectionId(id: string): id is SectionId {
  return id === "me" || isNavSectionId(id);
}

function isInternalHref(href: string) {
  return href.startsWith("/");
}

function navLinkClass(active: boolean, mobile = false) {
  return mobile
    ? `rounded-lg px-3 py-3 text-left text-sm font-medium ${
        active ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
      }`
    : `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
      }`;
}

export function Navbar({ onContactClick }: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState<NavId | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollLockRef = useRef<NavId | null>(null);
  const scrollLockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateActiveSection = useCallback(() => {
    if (!isHome) return;

    if (scrollLockRef.current) {
      setActive(scrollLockRef.current);
      return;
    }

    let current: NavId | null = null;

    for (const item of navItems) {
      if ("href" in item && item.href) continue;

      const el = document.getElementById(item.id);
      if (!el) continue;

      const top = el.getBoundingClientRect().top;
      if (top <= HEADER_OFFSET) {
        current = item.id;
      }
    }

    setActive(current);
  }, [isHome]);

  useEffect(() => {
    if (!isHome) return;

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
  }, [isHome, updateActiveSection]);

  useEffect(() => {
    if (!isHome) return;

    const scrollToHash = () => {
      const hash = window.location.hash.slice(1);
      if (!isSectionId(hash)) return;

      const el = document.getElementById(hash);
      if (!el) return;

      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth" });
        setActive(isNavSectionId(hash) ? hash : null);
      });
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [isHome, pathname]);

  const scrollTo = (id: SectionId) => {
    setMenuOpen(false);
    setActive(isNavSectionId(id) ? id : null);
    scrollLockRef.current = isNavSectionId(id) ? id : null;

    if (scrollLockTimerRef.current) clearTimeout(scrollLockTimerRef.current);
    scrollLockTimerRef.current = setTimeout(() => {
      scrollLockRef.current = null;
      updateActiveSection();
    }, 900);

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const sectionLinkClass = (id: NavId, mobile = false) =>
    navLinkClass(isHome && active === id, mobile);

  const logo = (
    <>
      {site.name.split(" ")[0]}
      <span className="text-emerald-400">.</span>
    </>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#070b14]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {isHome ? (
          <button
            type="button"
            onClick={() => scrollTo("me")}
            className="font-semibold tracking-tight text-white"
          >
            {logo}
          </button>
        ) : (
          <Link href="/#me" className="font-semibold tracking-tight text-white">
            {logo}
          </Link>
        )}

        <div className="hidden items-center gap-1 md:flex">
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              if ("href" in item && item.href) {
                const href = item.href;
                const active = isInternalHref(href) && pathname.startsWith(href);
                if (isInternalHref(href)) {
                  return (
                    <Link
                      key={item.id}
                      href={href}
                      className={navLinkClass(active)}
                    >
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <a
                    key={item.id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={navLinkClass(false)}
                  >
                    {item.label}
                  </a>
                );
              }

              return isHome ? (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className={sectionLinkClass(item.id)}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.id}
                  href={`/#${item.id}`}
                  className={sectionLinkClass(item.id)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          {onContactClick ? (
            <button
              type="button"
              onClick={onContactClick}
              className="ml-1 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Contact
            </button>
          ) : (
            <a
              href="/#contact"
              className="ml-1 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Contact
            </a>
          )}
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
            {navItems.map((item) => {
              if ("href" in item && item.href) {
                const href = item.href;
                const active = isInternalHref(href) && pathname.startsWith(href);
                if (isInternalHref(href)) {
                  return (
                    <Link
                      key={item.id}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={navLinkClass(active, true)}
                    >
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <a
                    key={item.id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className={navLinkClass(false, true)}
                  >
                    {item.label}
                  </a>
                );
              }

              return isHome ? (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className={sectionLinkClass(item.id, true)}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.id}
                  href={`/#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={sectionLinkClass(item.id, true)}
                >
                  {item.label}
                </Link>
              );
            })}
            {onContactClick ? (
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
            ) : (
              <a
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 block rounded-lg bg-emerald-500 px-3 py-3 text-center text-sm font-semibold text-slate-950"
              >
                Contact me
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
