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
      <div className="py-8 sm:py-12">
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Playground
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            This is where half-baked ideas come to hang out. I try a lot of stuff
            here — some of it works, some of it becomes a learning opportunity,
            and some of it just stares back at me until I ship it anyway. I keep
            track of them all on this page so they don&apos;t vanish into the void
            of &quot;I&apos;ll finish that later.&quot;
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            You&apos;re free to poke around and use whatever you find. For AI
            projects though: bring your own key.
          </p>
        </header>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {playgroundProjects.map((project) => (
            <li key={project.slug}>
              <Link
                href={project.href}
                className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-emerald-400/40 hover:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold text-white group-hover:text-emerald-300">
                    {project.title}
                  </h2>
                  {project.ai ? (
                    <span className="shrink-0 rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-amber-200">
                      BYO key
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {project.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SiteChrome>
  );
}
