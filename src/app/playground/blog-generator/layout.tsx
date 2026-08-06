import { Navbar } from "@/components/Navbar";

export default function BlogGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Navbar />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden pt-16">
        {children}
      </div>
    </div>
  );
}
