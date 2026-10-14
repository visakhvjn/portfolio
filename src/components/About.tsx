"use client";

import { certificates } from "@/data/certificates";
import { education } from "@/data/education";
import { linkedinRecommendations } from "@/data/linkedinRecommendations";
import { testimonials } from "@/data/testimonials";
import { useMemo, useState } from "react";
import { AnimateIn } from "./AnimateIn";
import { TestimonialSlider } from "./TestimonialSlider";

const tabs = [
  { id: "reviews", label: "Reviews" },
  { id: "education", label: "Education" },
  { id: "certificates", label: "Certificates" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const headerCellClass =
  "whitespace-nowrap px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-muted sm:px-5";

export function About() {
  const [active, setActive] = useState<TabId>("reviews");
  const reviews = useMemo(
    () => [...linkedinRecommendations, ...testimonials],
    [],
  );

  return (
    <section className="py-16 sm:py-24">
      <div className="rounded-[2rem] bg-surface px-5 py-14 sm:px-10 sm:py-20">
        <AnimateIn>
          <div id="about" className="mx-auto max-w-2xl scroll-mt-24 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-accent-strong">
              04 — About
            </p>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              Beyond the work
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
              What colleagues and clients say, where I studied, and the credentials I&apos;ve picked up along the way.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={80}>
          <div className="mt-10 flex justify-center">
            <div
              role="tablist"
              aria-label="About sections"
              className="inline-flex flex-wrap gap-1 rounded-xl border border-line bg-canvas p-1"
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
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-card text-ink shadow-sm"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={120}>
          <div className="mt-10">
            {active === "education" && (
              <div
                role="tabpanel"
                id="about-panel-education"
                aria-labelledby="about-tab-education"
              >
                <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-4 lg:grid-cols-2">
                  {education.map((item) => (
                    <li key={item.degree} className="list-none">
                      <div className="h-full rounded-2xl border border-line bg-card p-6">
                        <h3 className="font-serif text-xl font-medium text-ink">{item.degree}</h3>
                        <p className="mt-1 text-sm font-medium text-accent-strong">{item.institution}</p>
                        <p className="mt-3 text-sm text-muted">
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
                  <p className="text-center text-sm text-muted">No certificates listed yet.</p>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-line bg-card">
                    <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-line">
                          <th scope="col" className={`${headerCellClass} sm:w-14`}>
                            No.
                          </th>
                          <th scope="col" className={headerCellClass}>
                            Certificate
                          </th>
                          <th scope="col" className={`${headerCellClass} sm:w-28`}>
                            Issuer
                          </th>
                          <th scope="col" className={`${headerCellClass} sm:w-28`}>
                            Completed
                          </th>
                          <th scope="col" className={`${headerCellClass} sm:min-w-[12rem]`}>
                            Keywords
                          </th>
                          <th scope="col" className={`${headerCellClass} sm:w-24`}>
                            Credential
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {certificates.map((item, index) => (
                          <tr
                            key={item.id}
                            className="border-b border-line last:border-b-0 hover:bg-canvas"
                          >
                            <td className="whitespace-nowrap px-4 py-3 text-faint sm:px-5">
                              {index + 1}
                            </td>
                            <th scope="row" className="px-4 py-3 font-medium text-ink sm:px-5">
                              {item.title}
                            </th>
                            <td className="whitespace-nowrap px-4 py-3 text-muted sm:px-5">
                              {item.issuer}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 text-muted sm:px-5">
                              {item.completedOn}
                            </td>
                            <td className="px-4 py-3 leading-snug text-muted sm:px-5">
                              {item.keywords.join(" · ")}
                            </td>
                            <td className="whitespace-nowrap px-4 py-3 sm:px-5">
                              {item.credentialUrl ? (
                                <a
                                  href={item.credentialUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-medium text-accent-strong underline-offset-4 hover:text-ink hover:underline"
                                >
                                  Verify
                                </a>
                              ) : (
                                <span className="text-faint">—</span>
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
      </div>
    </section>
  );
}
