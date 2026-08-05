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
  ...navItems.map((item) => ({ label: item.label, href: `/#${item.id}` })),
  { label: "Contact", href: "/#contact" },
] as const;

type FooterProps = {
  onContactClick?: () => void;
};

export function Footer({ onContactClick }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-white/10 pt-12 sm:mt-20 sm:pt-14">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-12">
        <div>
          <Link
            href="/#me"
            className="inline-block text-lg font-semibold tracking-tight text-white transition hover:text-emerald-300"
          >
            {site.name.split(" ")[0]}
            <span className="text-emerald-400">.</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
            {site.title}
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
            {site.tagline}
          </p>
          {onContactClick ? (
            <button
              type="button"
              onClick={onContactClick}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Get in touch
            </button>
          ) : (
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Get in touch
            </Link>
          )}
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Navigate
          </h2>
          <ul className="mt-4 space-y-2.5">
            {pageLinks.map((link) => (
              <li key={link.href}>
                {link.href === "/#contact" && onContactClick ? (
                  <button
                    type="button"
                    onClick={onContactClick}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Connect
          </h2>
          <ul className="mt-4 space-y-2.5">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 transition hover:text-emerald-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-white/10 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <p className="text-slate-600">Built with Next.js · Based in India</p>
      </div>
    </footer>
  );
}
