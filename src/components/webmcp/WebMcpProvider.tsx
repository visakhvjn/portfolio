"use client";

import "@mcp-b/webmcp-polyfill";
import { GlobalWebMcpTools } from "./GlobalWebMcpTools";

export function WebMcpProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {typeof document !== "undefined" && "modelContext" in document && (
        <GlobalWebMcpTools />
      )}
      {children}
    </>
  );
}
