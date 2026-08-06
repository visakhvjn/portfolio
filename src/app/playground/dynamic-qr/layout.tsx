import { Navbar } from "@/components/Navbar";
import { DynamicQrShell } from "@/components/playground/dynamic-qr/DynamicQrShell";

export default function DynamicQrLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Navbar />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden pt-16">
        <DynamicQrShell>{children}</DynamicQrShell>
      </div>
    </div>
  );
}
