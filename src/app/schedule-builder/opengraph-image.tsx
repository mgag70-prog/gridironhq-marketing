import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";
import { siteConfig } from "@/config/site";

/**
 * Own OG card for the schedule builder.
 *
 * Needed because declaring `openGraph` in a page's metadata stops the root
 * app/opengraph-image.tsx from being inherited — without this file the page
 * ships with no og:image at all, which is the blank-card bug all over again.
 */
export const alt = "Free Fantasy Football Schedule Builder — GridironHQ";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    title: "Free Fantasy Football Schedule Builder",
    eyebrow: "Free Tool",
    domain: siteConfig.domain,
  });
}
