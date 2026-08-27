import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

/**
 * Site chrome + reading column for /accuracy.
 *
 * Same shape as app/help/layout.tsx and app/blog/(post)/layout.tsx: the root
 * layout renders only {children}, so every top-level route composes Nav and
 * Footer itself.
 *
 * The column is 820px rather than help's 720px. This page carries three data
 * tables; at 720px the widest of them starts horizontal-scrolling inside its
 * own overflow wrapper on a laptop, which hides columns from exactly the
 * reader who came here to check the numbers. Prose measure at 820px is still
 * inside a comfortable range at the 17px body size set in mdx-components.tsx.
 */
export default function AccuracyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="relative z-10 pt-[120px] pb-[100px]">
        <article className="max-w-[820px] mx-auto px-6">{children}</article>
      </main>
      <Footer />
    </>
  );
}
