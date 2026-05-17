"use client";

import { education } from "@/data/education";
import { site } from "@/data/site";
import { AnimateIn } from "./AnimateIn";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  return (
    <section className="py-14 sm:py-20">
      <AnimateIn>
        <SectionHeading id="education" title="Education" subtitle="Strong foundations from NIT Jamshedpur and honors in computer science." />
      </AnimateIn>
      <ul className="mt-10 space-y-4">
        {education.map((item, i) => (
          <AnimateIn key={item.degree} delay={i * 100}>
            <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <h3 className="font-semibold text-white">{item.degree}</h3>
              <p className="mt-1 text-emerald-400/80">{item.institution}</p>
              <p className="mt-2 text-sm text-slate-400">{item.period} · {item.detail}</p>
            </li>
          </AnimateIn>
        ))}
      </ul>
      <AnimateIn delay={200}>
        <p className="mt-8 text-sm text-slate-500">{site.achievement}</p>
        <p className="mt-2 text-sm text-slate-500">Languages: {site.languages.join(", ")}</p>
        <p className="mt-1 text-sm text-slate-500">Interests: {site.interests.join(", ")}</p>
      </AnimateIn>
    </section>
  );
}
