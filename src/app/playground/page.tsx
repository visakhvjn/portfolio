import { site } from "@/data/site";
import type { Metadata } from "next";

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
    </div>
  );
}
