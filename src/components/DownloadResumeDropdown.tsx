"use client";

import { site } from "@/data/site";
import { useEffect, useId, useRef, useState } from "react";

const downloadOptions = [
  {
    label: "Resume",
    href: site.resumePath,
    download: site.resumeDownloadName,
  },
  {
    label: "Resume (no photo)",
    href: site.resumeNoPhotoPath,
    download: site.resumeNoPhotoDownloadName,
    hint: "ATS-friendly",
  },
  {
    label: "Cover letter",
    href: site.coverLetterPath,
    download: site.coverLetterDownloadName,
  },
] as const;

type DownloadResumeDropdownProps = {
  variant?: "primary" | "outline";
  fullWidth?: boolean;
  className?: string;
  onSelect?: () => void;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export function DownloadResumeDropdown({
  variant = "outline",
  fullWidth,
  className = "",
  onSelect,
}: DownloadResumeDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const buttonClass =
    variant === "primary"
      ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
      : "border border-white/10 text-slate-200 hover:border-emerald-500/40 hover:bg-white/5";

  return (
    <div
      ref={rootRef}
      className={`relative ${fullWidth ? "w-full" : ""} ${className}`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${fullWidth ? "w-full" : ""} ${buttonClass} ${
          variant === "primary" ? "rounded-xl px-6 py-3 font-semibold" : ""
        }`}
      >
        Download Resume
        <Chevron open={open} />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          className={`absolute z-[60] mt-1 overflow-hidden rounded-lg border border-white/10 bg-[#0c1222] py-1 shadow-xl ${
            fullWidth ? "inset-x-0" : "right-0 min-w-[220px]"
          }`}
        >
          {downloadOptions.map((item) => (
            <a
              key={item.label}
              role="menuitem"
              href={item.href}
              download={item.download}
              onClick={() => {
                setOpen(false);
                onSelect?.();
              }}
              className="block px-3 py-2.5 text-sm text-slate-200 transition hover:bg-white/5 hover:text-white"
            >
              <span className="font-medium">{item.label}</span>
              {"hint" in item && item.hint ? (
                <span className="mt-0.5 block text-xs text-slate-500">{item.hint}</span>
              ) : null}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
