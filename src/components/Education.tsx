"use client";

import { education } from "@/data/education";
import { AnimateIn } from "./AnimateIn";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  return (
    <section className="py-14 sm:py-20">
      <AnimateIn>
        <SectionHeading id="education" title="Education" subtitle="Strong foundations from NIT Jamshedpur and honors in computer science." />
      </AnimateIn>
      <ul className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {education.map((item, i) => (
          <li key={item.degree} className="list-none">
            <AnimateIn delay={i * 100} className="h-full">
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <h3 className="font-semibold text-white">{item.degree}</h3>
                <p className="mt-1 text-emerald-400/80">{item.institution}</p>
                <p className="mt-2 text-sm text-slate-400">
                  {item.period} · {item.detail}
                </p>
              </div>
            </AnimateIn>
          </li>
        ))}
      </ul>
    </section>
  );
}
