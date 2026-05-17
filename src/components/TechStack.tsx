"use client";

import { skillCategories } from "@/data/skills";
import { AnimateIn } from "./AnimateIn";
import { SectionHeading } from "./SectionHeading";

export function TechStack() {
  return (
    <section className="py-10 sm:py-14">
      <AnimateIn>
        <SectionHeading
          id="skills"
          title="Skills"
          subtitle="Stacks I use across full-stack, cloud, and AI work."
        />
      </AnimateIn>

      <AnimateIn delay={60}>
        <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04]">
                <th
                  scope="col"
                  className="whitespace-nowrap px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-emerald-400/90 sm:px-5 sm:w-48"
                >
                  Area
                </th>
                <th
                  scope="col"
                  className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-5"
                >
                  Technologies
                </th>
              </tr>
            </thead>
            <tbody>
              {skillCategories.map((category) => (
                <tr
                  key={category.title}
                  className="border-b border-white/10 last:border-b-0 hover:bg-white/[0.02]"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap align-top px-4 py-2.5 font-medium text-slate-300 sm:px-5"
                  >
                    {category.title}
                  </th>
                  <td className="px-4 py-2.5 leading-snug text-slate-400 sm:px-5">
                    {category.items.join(" · ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimateIn>
    </section>
  );
}
