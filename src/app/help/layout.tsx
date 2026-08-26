import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

/**
 * Site chrome + reading column for every /help route.
 *
 * Same shape as app/blog/layout.tsx: the root layout renders only {children},
 * so subpages compose Nav and Footer themselves. Help docs are long-form prose
 * like blog posts, so they get the same 720px <article> column the (post)
 * route group gives posts — folded into this one layout because /help has no
 * wide index page that needs a different width.
 */
export default function HelpLayout({
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
