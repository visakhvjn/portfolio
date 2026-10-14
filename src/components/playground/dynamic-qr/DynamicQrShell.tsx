"use client";

import { ButtonSpinner } from "@/components/playground/ButtonSpinner";
import { AuthPanel } from "@/components/playground/mcq/AuthPanel";
import { createClient } from "@/lib/supabase/dynamic-qr/client";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";

function navClass(active: boolean) {
  return `rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
    active ? "bg-card text-ink shadow-sm" : "text-muted hover:text-ink"
  }`;
}

export function DynamicQrShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

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
    setSigningOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setUser(null);
    } catch {
      // ignore
    } finally {
      setSigningOut(false);
    }
  };

  const onNew = pathname.endsWith("/new");
  const onAll =
    pathname === "/playground/dynamic-qr" ||
    pathname === "/playground/dynamic-qr/";
  const onAbout = pathname === "/playground/dynamic-qr/about";
  const showLanding = ready && !user && !onAbout;

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="shrink-0 border-b border-line bg-canvas px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <div className="mr-2 flex items-center gap-2 text-sm text-muted">
              <Link href="/playground" className="hover:text-ink">
                Playground
              </Link>
              <span aria-hidden>/</span>
              <span className="text-ink-soft">Dynamic QR</span>
            </div>
            <nav className="flex items-center gap-1 rounded-xl border border-line bg-surface p-1">
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
              <Link href="/playground/dynamic-qr/about" className={navClass(onAbout)}>
                About
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {ready && user ? (
              <>
                <span className="hidden max-w-[200px] truncate text-xs text-muted sm:inline">
                  {user.email}
                </span>
                <button
                  type="button"
                  onClick={() => void signOut()}
                  disabled={signingOut}
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-xs font-medium text-ink-soft transition-colors hover:bg-surface hover:text-ink disabled:opacity-60"
                >
                  {signingOut ? (
                    <>
                      <ButtonSpinner className="h-3.5 w-3.5" />
                      Signing out…
                    </>
                  ) : (
                    "Sign out"
                  )}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setAuthOpen(true)}
                className="rounded-lg bg-ink px-3 py-2 text-xs font-medium text-canvas transition-colors hover:bg-ink-soft"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        {showLanding ? (
          <div className="h-full overflow-y-auto">
            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                Playground · Dynamic QR
              </p>
              <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
                QR codes that redirect — and tell you who scanned.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
                Point a QR at a short link on this site — not your final URL.
                When someone scans, we log what we can (device, region, time),
                then send them through. Change the destination later without
                reprinting. Same sticker, new landing page.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setAuthOpen(true)}
                  className="rounded-lg bg-ink px-5 py-3 text-sm font-medium text-canvas transition-colors hover:bg-ink-soft"
                >
                  Sign in with Google
                </button>
                <Link
                  href="/playground/qr-generator"
                  className="rounded-lg border border-line-strong bg-card px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface"
                >
                  Need a static QR instead?
                </Link>
              </div>

              <div className="mt-16 grid gap-5 sm:grid-cols-3">
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
                    className="rounded-2xl border border-line bg-card p-6"
                  >
                    <h2 className="font-serif text-lg font-medium text-ink">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>

              <section className="mt-14">
                <h2 className="font-serif text-xl font-medium text-ink">
                  Static vs dynamic
                </h2>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">
                  Our{" "}
                  <Link
                    href="/playground/qr-generator"
                    className="text-accent-strong underline-offset-4 hover:underline"
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
                <h2 className="font-serif text-xl font-medium text-ink">
                  What we track per scan
                </h2>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-ink-soft marker:text-accent">
                  <li>Timestamp</li>
                  <li>Device type (mobile, desktop, tablet, bot heuristics)</li>
                  <li>Country, region, and city when the host sends geo headers (best on Vercel prod)</li>
                  <li>Referrer when the scanner&apos;s browser sends one</li>
                </ul>
                <p className="mt-3 text-sm text-muted">
                  We don&apos;t show a full device fingerprint — just enough to
                  spot patterns in a chart, not to stalk individuals.
                </p>
              </section>

              <section className="mt-10 rounded-2xl border border-line bg-surface px-6 py-5 font-mono text-xs text-ink-soft">
                <p className="font-sans text-xs font-medium uppercase tracking-[0.14em] text-muted">Flow</p>
                <p className="mt-2">
                  QR →{" "}
                  <span className="text-accent-strong">yoursite.com/r/menu-abc</span>{" "}
                  → log scan →{" "}
                  <span className="text-ink">https://your-menu.com</span>
                </p>
              </section>

              <div className="mt-16 border-t border-line pt-10 text-center">
                <p className="text-sm text-muted">
                  Menus, event badges, slide decks, sticker tests — if you might
                  change the link later, go dynamic.
                </p>
                <button
                  type="button"
                  onClick={() => setAuthOpen(true)}
                  className="mt-4 rounded-lg bg-ink px-5 py-3 text-sm font-medium text-canvas transition-colors hover:bg-ink-soft"
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
