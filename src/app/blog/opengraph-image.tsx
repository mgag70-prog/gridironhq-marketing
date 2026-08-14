import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";
import { siteConfig } from "@/config/site";

/**
 * OG card for the blog index.
 *
 * Required because app/blog/page.tsx sets `openGraph`, which stops the root
 * app/opengraph-image.tsx from being inherited — without this the index would
 * ship a `summary_large_image` card with no image.
 *
 * Individual posts override this with their own card via postMetadata().
 */
export const alt = "GridironHQ — Commissioner Guides";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    title: "Commissioner Guides",
    eyebrow: "GridironHQ Blog",
    domain: siteConfig.domain,
  });
}
