"use client";

import { certificates } from "@/data/certificates";
import { AnimateIn } from "./AnimateIn";
import { SectionHeading } from "./SectionHeading";

export function Certificates() {
  if (certificates.length === 0) return null;

  return (
    <section className="py-14 sm:py-20">
      <AnimateIn>
        <SectionHeading
          id="certificates"
          title="Certificates"
          subtitle="Verified credentials from courses and platforms."
        />
      </AnimateIn>

      <AnimateIn delay={60}>
        <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
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
                  <th scope="row" className="px-4 py-2.5 font-medium text-slate-300 sm:px-5">
                    {item.title}
                  </th>
                  <td className="whitespace-nowrap px-4 py-2.5 text-slate-400 sm:px-5">
                    {item.issuer}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-slate-400 sm:px-5">
                    {item.completedOn}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 sm:px-5">
                    {item.credentialUrl ? (
                      <a
                        href={item.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-emerald-400/80"
                      >
                        Verify →
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
      </AnimateIn>
    </section>
  );
}
