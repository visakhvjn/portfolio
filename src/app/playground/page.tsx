import { SiteChrome } from "@/components/SiteChrome";
import { playgroundProjects } from "@/data/playground";
import { site } from "@/data/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Playground | Visakh Vijayan",
  description:
    "Experiments and side ideas by Visakh Vijayan — free to try. For AI projects, bring your own API key.",
  alternates: {
    canonical: "/playground",
  },
  openGraph: {
    title: "Playground | Visakh Vijayan",
    description:
      "Experiments and side ideas — free to try. AI projects need your own API key.",
    type: "website",
    url: `${site.portfolioUrl}/playground`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Playground | Visakh Vijayan",
    description:
      "Experiments and side ideas — free to try. AI projects need your own API key.",
  },
};

export default function PlaygroundPage() {
  return (
    <SiteChrome>
      <div className="py-10 sm:py-16">
        <header className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
            Experiments
          </p>
          <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">
            Playground
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            This is where half-baked ideas come to hang out. I try a lot of stuff
            here — some of it works, some of it becomes a learning opportunity,
            and some of it just stares back at me until I ship it anyway. I keep
            track of them all on this page so they don&apos;t vanish into the void
            of &quot;I&apos;ll finish that later.&quot;
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            You&apos;re free to poke around and use whatever you find. For AI
            projects though: bring your own key.
          </p>
        </header>

        <ul className="mt-12 grid gap-5 border-t border-line pt-12 sm:grid-cols-2">
          {playgroundProjects.map((project) => (
            <li key={project.slug}>
              <Link
                href={project.href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-colors hover:border-line-strong"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-serif text-xl font-medium text-ink transition-colors group-hover:text-accent-strong">
                    {project.title}
                  </h2>
                  {project.ai ? (
                    <span className="shrink-0 rounded-full border border-accent/20 bg-accent-soft px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-accent-strong">
                      BYO key
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                  {project.description}
                </p>
                <span className="mt-5 text-sm font-medium text-muted transition-colors group-hover:text-ink">
                  Open <span aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SiteChrome>
  );
}
