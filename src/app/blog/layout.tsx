import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="blog-surface min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-8 pt-24 sm:px-6">
        {children}
        <Footer />
      </main>
    </div>
  );
}
