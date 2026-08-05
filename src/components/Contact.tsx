"use client";

import { site } from "@/data/site";
import { AnimateIn } from "./AnimateIn";
import { CalendlyBookButton } from "./CalendlyBookButton";
import { ContactForm } from "./ContactForm";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  return (
    <section className="py-14 sm:py-20">
      <AnimateIn>
        <SectionHeading
          id="contact"
          title="Contact"
          subtitle="Have a role, project, or idea in mind? Send a message or book a call."
        />
      </AnimateIn>

      <AnimateIn delay={80}>
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-10">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <ContactForm />
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Book a call
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Prefer a live chat? Grab a slot on Calendly.
              </p>
              <CalendlyBookButton
                text="Open calendar"
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Elsewhere
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-sm">
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition hover:text-emerald-400"
                >
                  LinkedIn
                </a>
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition hover:text-emerald-400"
                >
                  GitHub
                </a>
                <a
                  href={site.links.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition hover:text-emerald-400"
                >
                  Medium
                </a>
              </div>
            </div>
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}
