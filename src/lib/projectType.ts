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
      return "bg-violet-500/20 text-violet-300";
    case "personal":
      return "bg-sky-500/20 text-sky-300";
    case "ai":
      return "bg-fuchsia-500/20 text-fuchsia-300";
    case "games":
      return "bg-amber-500/20 text-amber-300";
  }
}
