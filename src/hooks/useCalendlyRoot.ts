"use client";

import { useEffect, useState } from "react";

export function useCalendlyRoot() {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRootElement(document.body);
  }, []);

  return rootElement;
}
