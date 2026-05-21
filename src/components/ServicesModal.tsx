"use client";

import { howIWork, serviceIntro, services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { Modal } from "./Modal";
import { TestimonialSlider } from "./TestimonialSlider";

type ServicesModalProps = {
  open: boolean;
  onClose: () => void;
  onContactClick: () => void;
};

export function ServicesModal({
  open,
  onClose,
  onContactClick,
}: ServicesModalProps) {
  function handleContact() {
    onClose();
    onContactClick();
  }

  return (
    <Modal open={open} onClose={onClose} title="Services" wide>
      <p className="text-sm leading-relaxed text-slate-300">{serviceIntro}</p>

      <ul className="mt-6 space-y-4">
        {services.map((service) => (
          <li
            key={service.id}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
          >
            <h4 className="font-semibold text-white">{service.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {service.description}
            </p>
            <ul className="mt-3 space-y-1.5">
              {service.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-2 text-sm text-slate-300"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {service.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-500"
                >
                  {t}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>

      <TestimonialSlider testimonials={testimonials} embedded title="Client reviews" />

      <div className="mt-6 border-t border-white/10 pt-6">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          How I work
        </h4>
        <ul className="mt-3 space-y-2">
          {howIWork.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-slate-300">
              <span className="text-emerald-400">→</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={handleContact}
        className="mt-6 w-full rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
      >
        Discuss a project
      </button>
    </Modal>
  );
}
