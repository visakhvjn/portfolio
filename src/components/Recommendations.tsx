"use client";

import { linkedinRecommendations } from "@/data/linkedinRecommendations";
import { site } from "@/data/site";
import { AnimateIn } from "./AnimateIn";
import { SectionHeading } from "./SectionHeading";
import { TestimonialSlider } from "./TestimonialSlider";

export function Recommendations() {
  return (
    <section className="py-14 sm:py-20">
      <AnimateIn>
        <SectionHeading
          id="recommendations"
          title="Recommendations"
          subtitle="Written recommendations from colleagues, managers, and mentors I've worked with."
          subtitleNoWrap
        />
      </AnimateIn>
      <AnimateIn delay={80}>
        <TestimonialSlider
          testimonials={linkedinRecommendations}
          title="LinkedIn recommendations"
          wideCards
          ariaLabel="LinkedIn recommendations"
        />
        <div className="mt-8 flex justify-center">
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/10 px-6 py-2.5 text-sm font-medium text-slate-300 transition hover:border-emerald-500/30 hover:bg-white/5 hover:text-white"
          >
            View profile on LinkedIn
          </a>
        </div>
      </AnimateIn>
    </section>
  );
}
