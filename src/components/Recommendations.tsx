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
          subtitle="Colleagues, managers, and mentors on LinkedIn — professional work, not freelance gigs."
        />
      </AnimateIn>
      <AnimateIn delay={80}>
        <TestimonialSlider
          testimonials={linkedinRecommendations}
          title="LinkedIn recommendations"
          wideCards
          ariaLabel="LinkedIn recommendations"
        />
        <p className="mt-6 text-center text-sm text-slate-500">
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400/90 hover:text-emerald-300 hover:underline"
          >
            View profile on LinkedIn →
          </a>
        </p>
      </AnimateIn>
    </section>
  );
}
