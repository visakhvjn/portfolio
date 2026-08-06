import { Navbar } from "@/components/Navbar";

export default function QrGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <div className="flex min-h-0 flex-1 flex-col pt-16">{children}</div>
    </div>
  );
}
