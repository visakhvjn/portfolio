"use client";

import { certificates } from "@/data/certificates";
import { education } from "@/data/education";
import { linkedinRecommendations } from "@/data/linkedinRecommendations";
import { testimonials } from "@/data/testimonials";
import { useMemo, useState } from "react";
import { AnimateIn } from "./AnimateIn";
import { SectionHeading } from "./SectionHeading";
import { TestimonialSlider } from "./TestimonialSlider";

const tabs = [
  { id: "reviews", label: "Reviews" },
  { id: "education", label: "Education" },
  { id: "certificates", label: "Certificates" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function About() {
  const [active, setActive] = useState<TabId>("reviews");
  const reviews = useMemo(
    () => [...linkedinRecommendations, ...testimonials],
    [],
  );

  return (
    <section className="py-14 sm:py-20">
      <AnimateIn>
        <SectionHeading
          id="about"
          title="About"
          subtitle="Education, recommendations, and credentials — the rest of the story beyond the work."
        />
      </AnimateIn>

      <AnimateIn delay={80}>
        <div
          role="tablist"
          aria-label="About sections"
          className="mt-8 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-1.5"
        >
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`about-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`about-panel-${tab.id}`}
                onClick={() => setActive(tab.id)}
                className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-500 text-slate-950 shadow-sm"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </AnimateIn>

      <AnimateIn delay={120}>
        <div className="mt-8">
          {active === "education" && (
            <div
              role="tabpanel"
              id="about-panel-education"
              aria-labelledby="about-tab-education"
            >
              <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {education.map((item) => (
                  <li key={item.degree} className="list-none">
                    <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                      <h3 className="font-semibold text-white">{item.degree}</h3>
                      <p className="mt-1 text-emerald-400/80">{item.institution}</p>
                      <p className="mt-2 text-sm text-slate-400">
                        {item.period} · {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {active === "reviews" && (
            <div
              role="tabpanel"
              id="about-panel-reviews"
              aria-labelledby="about-tab-reviews"
            >
              <TestimonialSlider
                testimonials={reviews}
                title="Reviews"
                wideCards
                showArrows={false}
                ariaLabel="Reviews"
              />
            </div>
          )}

          {active === "certificates" && (
            <div
              role="tabpanel"
              id="about-panel-certificates"
              aria-labelledby="about-tab-certificates"
            >
              {certificates.length === 0 ? (
                <p className="text-sm text-slate-500">No certificates listed yet.</p>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/[0.04]">
                          <th
                            scope="col"
                            className="whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-5 sm:w-14"
                          >
                            SNo
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-400/90 sm:px-5"
                          >
                            Certificate
                          </th>
                          <th
                            scope="col"
                            className="whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-5 sm:w-28"
                          >
                            Issuer
                          </th>
                          <th
                            scope="col"
                            className="whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-5 sm:w-28"
                          >
                            Completed
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-5 sm:min-w-[12rem]"
                          >
                            Keywords
                          </th>
                          <th
                            scope="col"
                            className="whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-5 sm:w-24"
                          >
                            Credential
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {certificates.map((item, index) => (
                          <tr
                            key={item.id}
                            className="border-b border-white/10 last:border-b-0 hover:bg-white/[0.02]"
                          >
                            <td className="whitespace-nowrap px-4 py-2.5 text-slate-500 sm:px-5">
                              {index + 1}
                            </td>
                            <th
                              scope="row"
                              className="px-4 py-2.5 font-medium text-slate-300 sm:px-5"
                            >
                              {item.title}
                            </th>
                            <td className="whitespace-nowrap px-4 py-2.5 text-slate-400 sm:px-5">
                              {item.issuer}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2.5 text-slate-400 sm:px-5">
                              {item.completedOn}
                            </td>
                            <td className="px-4 py-2.5 leading-snug text-slate-400 sm:px-5">
                              {item.keywords.join(" · ")}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2.5 sm:px-5">
                              {item.credentialUrl ? (
                                <a
                                  href={item.credentialUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-emerald-400/90 hover:text-emerald-300"
                                >
                                  Verify
                                </a>
                              ) : (
                                <span className="text-slate-600">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
              )}
            </div>
          )}
        </div>
      </AnimateIn>
    </section>
  );
}
