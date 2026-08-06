import { Navbar } from "@/components/Navbar";
import { McqQuizShell } from "@/components/playground/mcq/McqQuizShell";

export default function McqQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Navbar />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden pt-16">
        <McqQuizShell>{children}</McqQuizShell>
      </div>
    </div>
  );
}
