import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

/**
 * Site chrome for every /blog route — index and posts alike.
 *
 * The root layout renders only {children} (Nav and Footer are composed per
 * page, see app/page.tsx), so blog routes have to bring their own.
 *
 * Width and semantics are deliberately NOT set here: the index needs a wide
 * grid and the posts need a narrow <article> column. Posts get theirs from
 * app/blog/(post)/layout.tsx.
 *
 * `relative z-10` keeps content above the fixed 60px grid texture that
 * body::before paints at z-0 (globals.css). Top padding clears the fixed
 * h-16 nav, matching the Hero's pt-[100px] convention.
 */
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="relative z-10 pt-[120px] pb-[100px]">{children}</main>
      <Footer />
    </>
  );
}
