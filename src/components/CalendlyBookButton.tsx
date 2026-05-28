"use client";

import { site } from "@/data/site";
import { calendlyPageSettings } from "@/lib/calendly";
import { useCalendlyRoot } from "@/hooks/useCalendlyRoot";
import dynamic from "next/dynamic";

const PopupButton = dynamic(
  () => import("react-calendly").then((mod) => mod.PopupButton),
  { ssr: false },
);

type CalendlyBookButtonProps = {
  text: string;
  className?: string;
};

export function CalendlyBookButton({ text, className }: CalendlyBookButtonProps) {
  const rootElement = useCalendlyRoot();

  if (!rootElement) return null;

  return (
    <PopupButton
      url={site.calendlyUrl}
      rootElement={rootElement}
      text={text}
      className={className}
      pageSettings={calendlyPageSettings}
    />
  );
}
