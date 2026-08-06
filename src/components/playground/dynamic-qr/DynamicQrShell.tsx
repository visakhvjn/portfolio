"use client";

import { AuthPanel } from "@/components/playground/mcq/AuthPanel";
import { createClient } from "@/lib/supabase/dynamic-qr/client";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";

function navClass(active: boolean) {
  return `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    active ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
  }`;
}

export function DynamicQrShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [ready, setReady] = useState(false);

  const hydrate = useEffectEvent(async () => {
    try {
      const supabase = createClient();
      const {
        data: { user: current },
      } = await supabase.auth.getUser();
      setUser(current);
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
      setReady(true);
      return () => subscription.unsubscribe();
    } catch {
      setReady(true);
      return () => undefined;
    }
  });

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    void hydrate().then((fn) => {
      cleanup = fn;
    });
    return () => cleanup?.();
  }, []);

  const signOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setUser(null);
    } catch {
      // ignore
    }
  };

  const onNew = pathname.endsWith("/new");
  const onAll =
    pathname === "/playground/dynamic-qr" ||
    pathname === "/playground/dynamic-qr/";

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="shrink-0 border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <div className="mr-2 flex items-center gap-2 text-sm text-slate-500">
              <Link href="/playground" className="hover:text-emerald-400">
                Playground
              </Link>
              <span aria-hidden>/</span>
              <span className="text-slate-300">Dynamic QR</span>
            </div>
            <nav className="flex items-center gap-1">
              <Link
                href="/playground/dynamic-qr/new"
                className={navClass(onNew)}
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault();
                    setAuthOpen(true);
                  }
                }}
              >
                New QR
              </Link>
              <Link
                href="/playground/dynamic-qr"
                className={navClass(onAll)}
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault();
                    setAuthOpen(true);
                  }
                }}
              >
                All QRs
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {ready && user ? (
              <>
                <span className="hidden max-w-[200px] truncate text-xs text-slate-500 sm:inline">
                  {user.email}
                </span>
                <button
                  type="button"
                  onClick={() => void signOut()}
                  className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-400 transition hover:border-white/20 hover:text-white"
                >
                  Sign out
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setAuthOpen(true)}
                className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        {ready && !user ? (
          <div className="h-full overflow-y-auto">
            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-400/80">
                Playground · Dynamic QR
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                QR codes that redirect — and tell you who scanned.
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">
                Point a QR at a short link on this site — not your final URL.
                When someone scans, we log what we can (device, region, time),
                then send them through. Change the destination later without
                reprinting. Same sticker, new landing page.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setAuthOpen(true)}
                  className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  Sign in with Google
                </button>
                <Link
                  href="/playground/qr-generator"
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
                >
                  Need a static QR instead?
                </Link>
              </div>

              <div className="mt-14 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    title: "Create & encode",
                    body: "Add a label and destination URL. We mint a short link like /r/your-slug and a QR PNG you can download.",
                  },
                  {
                    title: "Scan → redirect",
                    body: "The QR never points at your site directly — it hits our redirect, logs the scan, then 302s to your real URL.",
                  },
                  {
                    title: "Analytics",
                    body: "Open All QRs, pick one, and see scans over time, devices, countries/regions, and recent hits.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <h2 className="text-sm font-semibold text-white">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>

              <section className="mt-14">
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Static vs dynamic
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  Our{" "}
                  <Link
                    href="/playground/qr-generator"
                    className="text-emerald-400 hover:underline"
                  >
                    static QR generator
                  </Link>{" "}
                  bakes the URL into the image — fine for one-off links, zero
                  tracking. Dynamic QR keeps the image fixed on a short link you
                  control: update the target URL anytime, and every scan shows up
                  in your dashboard.
                </p>
              </section>

              <section className="mt-10">
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  What we track per scan
                </h2>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-400 marker:text-emerald-400/80">
                  <li>Timestamp</li>
                  <li>Device type (mobile, desktop, tablet, bot heuristics)</li>
                  <li>Country, region, and city when the host sends geo headers (best on Vercel prod)</li>
                  <li>Referrer when the scanner&apos;s browser sends one</li>
                </ul>
                <p className="mt-3 text-sm text-slate-500">
                  We don&apos;t show a full device fingerprint — just enough to
                  spot patterns in a chart, not to stalk individuals.
                </p>
              </section>

              <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 font-mono text-xs text-slate-400">
                <p className="text-slate-500">Flow</p>
                <p className="mt-2">
                  QR →{" "}
                  <span className="text-emerald-300/90">yoursite.com/r/menu-abc</span>{" "}
                  → log scan →{" "}
                  <span className="text-slate-300">https://your-menu.com</span>
                </p>
              </section>

              <div className="mt-12 border-t border-white/10 pt-8 text-center">
                <p className="text-sm text-slate-500">
                  Menus, event badges, slide decks, sticker tests — if you might
                  change the link later, go dynamic.
                </p>
                <button
                  type="button"
                  onClick={() => setAuthOpen(true)}
                  className="mt-4 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  Get started
                </button>
              </div>
            </div>
          </div>
        ) : (
          children
        )}
      </div>

      <AuthPanel
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        title="Sign in to Dynamic QR"
        project="dynamic-qr"
        nextPath={
          pathname.startsWith("/playground/dynamic-qr")
            ? pathname
            : "/playground/dynamic-qr"
        }
      />
    </div>
  );
}
