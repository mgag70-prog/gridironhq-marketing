import { siteConfig } from "@/config/site";
import { getPost, posts } from "@/content/posts";
import { renderOgCard } from "@/lib/og-card";

/**
 * Per-post OG card: /og/<slug>
 *
 * One dynamic route reading the post registry, rather than an
 * `opengraph-image.tsx` file per post — at one post a month that's the same
 * output with none of the duplicated boilerplate.
 *
 * force-static + generateStaticParams means every card is rendered to a PNG at
 * build time, so there is no per-request image generation cost and no runtime
 * dependency on the vendored font file.
 */
export const dynamic = "force-static";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  return renderOgCard({
    title: post.title,
    eyebrow: post.category,
    domain: siteConfig.domain,
  });
}
