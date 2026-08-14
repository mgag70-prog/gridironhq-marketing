/**
 * Reading column for blog posts.
 *
 * `(post)` is a route group — it does not appear in the URL, so a post at
 * src/app/blog/(post)/<slug>/page.mdx still serves at /blog/<slug>. The group
 * exists purely so posts get this <article> container while the index at
 * /blog does not.
 *
 * (The MDX `wrapper` component could do this instead, but it is undocumented in
 * Next 16 — if it silently stopped working, posts would quietly lose their
 * column. A route group is documented behaviour and fails loudly.)
 */
export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="max-w-[720px] mx-auto px-6">{children}</article>
  );
}
