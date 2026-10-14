"use client";

import { site } from "@/data/site";
import { AnimateIn } from "./AnimateIn";
import { CalendlyBookButton } from "./CalendlyBookButton";
import { ContactForm } from "./ContactForm";

const linkClass =
  "text-canvas/70 underline-offset-4 transition hover:text-canvas hover:underline";

export function Contact() {
  return (
    <section className="py-16 sm:py-24">
      <AnimateIn>
        <div className="grid gap-10 rounded-[2rem] bg-ink p-6 sm:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 lg:p-14">
          <div id="contact" className="flex scroll-mt-24 flex-col">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
              05 — Contact
            </p>
            <h2 className="mt-3 font-serif text-4xl font-medium tracking-tight text-canvas sm:text-5xl">
              Let&apos;s build something.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-canvas/70 sm:text-lg">
              Have a role, project, or idea in mind? Send a message or book a call.
            </p>

            <div className="mt-8">
              <CalendlyBookButton
                text="Book a call"
                className="inline-flex items-center justify-center rounded-lg border border-canvas/25 px-5 py-3 text-sm font-medium text-canvas transition hover:bg-canvas/10"
              />
            </div>

            <div className="mt-auto pt-10">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-canvas/50">
                Elsewhere
              </p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  LinkedIn
                </a>
                <a href={site.links.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  GitHub
                </a>
                <a href={site.links.medium} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Medium
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-card p-5 sm:p-7">
            <ContactForm />
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}
