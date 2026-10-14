import type { ProjectType } from "@/types";

export function projectTypeLabel(type: ProjectType): string {
  switch (type) {
    case "office":
      return "Work";
    case "personal":
      return "Personal";
    case "ai":
      return "AI";
    case "games":
      return "Games";
  }
}

/** Filter tab label (longer for the AI tab). */
export function projectTypeFilterLabel(type: ProjectType): string {
  if (type === "ai") return "AI & Agents";
  return projectTypeLabel(type);
}

export function projectTypeBadgeClass(type: ProjectType): string {
  switch (type) {
    case "office":
      return "bg-surface text-ink-soft border border-line";
    case "personal":
      return "bg-accent-soft text-accent-strong border border-transparent";
    case "ai":
      return "bg-ink text-canvas border border-ink";
    case "games":
      return "bg-card text-ink border border-line-strong";
  }
}
