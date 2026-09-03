import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

/**
 * Chrome + reading column for the legal pages (/privacy, /terms).
 *
 * `(legal)` is a route group — it does not appear in the URL. It exists so
 * these pages get the blog post reading column (same 720px <article>, same
 * MDX typography from src/mdx-components.tsx) without living under /blog:
 * they are not posts, have no registry entry, no author line, no OG card.
 *
 * Spacing mirrors app/blog/layout.tsx: pt-[120px] clears the fixed h-16 nav,
 * `relative z-10` keeps content above the body::before grid texture.
 */
export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="relative z-10 pt-[120px] pb-[100px]">
        <article className="max-w-[720px] mx-auto px-6">{children}</article>
      </main>
      <Footer />
    </>
  );
}
