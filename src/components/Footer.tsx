"use client";

import { navItems, site } from "@/data/site";
import Link from "next/link";

const socialLinks = [
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "GitHub", href: site.links.github },
  { label: "Medium", href: site.links.medium },
  { label: "LeetCode", href: site.links.leetcode },
  { label: "YouTube", href: site.links.youtube },
] as const;

const pageLinks = [
  ...navItems.map((item) => ({
    label: item.label,
    href: "href" in item && item.href ? item.href : `/#${item.id}`,
  })),
  { label: "Contact", href: "/#contact" },
] as const;

const linkClass = "text-sm text-muted transition hover:text-ink";

type FooterProps = {
  onContactClick?: () => void;
};

export function Footer({ onContactClick }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-line pt-12 sm:mt-20 sm:pt-14">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-12">
        <div>
          <Link
            href="/#me"
            className="inline-block font-serif text-2xl font-medium tracking-tight text-ink"
          >
            {site.name.split(" ")[0]}
            <span className="text-accent">.</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
            {site.title}
          </p>
          <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted">
            {site.tagline}
          </p>
          {onContactClick ? (
            <button
              type="button"
              onClick={onContactClick}
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-canvas transition hover:bg-ink-soft"
            >
              Get in touch
            </button>
          ) : (
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-canvas transition hover:bg-ink-soft"
            >
              Get in touch
            </Link>
          )}
        </div>

        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-faint">
            Navigate
          </h2>
          <ul className="mt-4 space-y-2.5">
            {pageLinks.map((link) => (
              <li key={link.href}>
                {link.href === "/#contact" && onContactClick ? (
                  <button type="button" onClick={onContactClick} className={linkClass}>
                    {link.label}
                  </button>
                ) : (
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-faint">
            Connect
          </h2>
          <ul className="mt-4 space-y-2.5">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-line py-6 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <p>Built with Next.js · Based in India</p>
      </div>
    </footer>
  );
}
