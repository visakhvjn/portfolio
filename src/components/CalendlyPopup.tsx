"use client";

import { site } from "@/data/site";
import { calendlyPageSettings } from "@/lib/calendly";
import { useCalendlyRoot } from "@/hooks/useCalendlyRoot";
import dynamic from "next/dynamic";

const PopupWidget = dynamic(
  () => import("react-calendly").then((mod) => mod.PopupWidget),
  { ssr: false },
);

export function CalendlyPopup() {
  const rootElement = useCalendlyRoot();

  if (!rootElement) return null;

  return (
    <PopupWidget
      url={site.calendlyUrl}
      rootElement={rootElement}
      text="Schedule time"
      color="#10b981"
      textColor="#ffffff"
      pageSettings={calendlyPageSettings}
    />
  );
}
