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
      <p className="text-base leading-relaxed text-ink-soft">{serviceIntro}</p>

      <ul className="mt-6 space-y-4">
        {services.map((service) => (
          <li
            key={service.id}
            className="rounded-2xl border border-line bg-card p-5"
          >
            <h4 className="font-serif text-lg font-medium text-ink">{service.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {service.description}
            </p>
            <ul className="mt-3 space-y-1.5">
              {service.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-2.5 text-sm text-ink-soft"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {service.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs text-ink-soft"
                >
                  {t}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>

      <TestimonialSlider testimonials={testimonials} embedded title="Client reviews" />

      <div className="mt-6 border-t border-line pt-6">
        <h4 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
          How I work
        </h4>
        <ul className="mt-3 space-y-2">
          {howIWork.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-ink-soft">
              <span className="text-accent">→</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={handleContact}
        className="mt-8 w-full rounded-lg bg-ink py-3 text-sm font-medium text-canvas transition hover:bg-ink-soft"
      >
        Discuss a project
      </button>
    </Modal>
  );
}
