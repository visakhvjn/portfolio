"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
};

export function Modal({ open, onClose, title, children, wide }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4" role="presentation">
      <button type="button" aria-label="Close overlay" className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`relative z-10 flex max-h-[92vh] w-full flex-col overflow-hidden border border-white/10 bg-[#0c1222] shadow-2xl sm:max-h-[85vh] sm:rounded-2xl ${wide ? "sm:max-w-2xl" : "sm:max-w-lg"} sm:rounded-2xl rounded-t-2xl`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h3 id="modal-title" className="text-lg font-semibold text-white">{title}</h3>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-5">{children}</div>
      </div>
    </div>
  );
}
