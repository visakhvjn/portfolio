"use client";

import { experience } from "@/data/experience";
import { AnimateIn } from "./AnimateIn";
import { SectionHeading } from "./SectionHeading";
import { useState } from "react";

export function Experience() {
  const [openId, setOpenId] = useState<string>("unify");

  return (
    <section className="py-14 sm:py-20">
      <AnimateIn>
        <SectionHeading id="experience" title="Experience" subtitle="8+ years across product companies — from payments and migrations to AI and team leadership." />
      </AnimateIn>
      <div className="relative mt-12">
        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-500/50 via-slate-700 to-transparent sm:left-5" aria-hidden />
        <ul className="space-y-6">
          {experience.map((job, i) => {
            const isOpen = openId === job.id;
            const canToggle = !job.current;
            return (
              <AnimateIn key={job.id} delay={i * 80}>
                <li className="relative pl-10 sm:pl-14">
                  <span className={`absolute left-0 top-6 flex h-6 w-6 items-center justify-center rounded-full border-2 sm:left-3 ${job.current ? "border-emerald-400 bg-emerald-500/20" : "border-slate-600 bg-[#0c1222]"}`}>
                    {job.current && <span className="h-2 w-2 rounded-full bg-emerald-400" />}
                  </span>
                  <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 transition hover:border-white/15">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold text-white">{job.company}</h3>
                          {job.current && <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-300">Current</span>}
                        </div>
                        <p className="mt-1 text-sm text-emerald-400/80">{job.role}</p>
                        <p className="text-sm text-slate-500">{job.location} · {job.period}</p>
                      </div>
                      {canToggle && (
                        <button type="button" onClick={() => setOpenId(isOpen ? "" : job.id)}
                          className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-400 ring-1 ring-white/10 hover:bg-white/5 hover:text-white"
                          aria-expanded={isOpen}>
                          {isOpen ? "Show less" : "Show more"}
                        </button>
                      )}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-slate-400">{isOpen || job.current ? job.summary : job.collapsedPreview}</p>
                    <ul
                      className={`mt-4 space-y-2 ${isOpen || job.current ? "" : "sr-only"}`}
                      aria-hidden={!(isOpen || job.current)}
                    >
                      {job.bullets.map((b) => (
                        <li key={b.slice(0, 40)} className="flex gap-2 text-sm text-slate-300">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div
                      className={`mt-4 flex flex-wrap gap-2 ${isOpen || job.current ? "" : "sr-only"}`}
                      aria-hidden={!(isOpen || job.current)}
                    >
                      {job.tech.map((t) => (
                        <span key={t} className="rounded-md bg-white/5 px-2 py-1 text-xs text-slate-400">{t}</span>
                      ))}
                    </div>
                  </article>
                </li>
              </AnimateIn>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
