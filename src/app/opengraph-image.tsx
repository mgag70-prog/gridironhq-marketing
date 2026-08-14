import { siteConfig } from "@/config/site";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";

/**
 * Site-wide default OG image.
 *
 * Next applies this to the homepage and inherits it into any route that does
 * not set its own openGraph.images — so /schedule-builder gets a real card too.
 * Blog posts override it with their per-post card via postMetadata().
 *
 * This is what fixes the blank-share problem on the most-shared URL: the site
 * already declared `twitter:card: summary_large_image` with no image at all.
 */
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    title: siteConfig.tagline,
    eyebrow: "Fantasy Football AI",
    domain: siteConfig.domain,
  });
}
