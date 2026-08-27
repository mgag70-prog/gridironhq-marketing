import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import Accuracy from "@/content/accuracy.mdx";

// No "— GridironHQ" suffix: the root layout's title template appends it.
// Phrasing targets the literal query a skeptical buyer types — "is GridironHQ
// accurate", "does GridironHQ actually work" — rather than a brand slogan.
export const metadata: Metadata = {
  title: "Is GridironHQ accurate? The backtest, in full",
  description:
    "How accurate is GridironHQ? The published backtest against real league seasons, the pre-registered 2026 prediction, the methodology, and the honest limits of what the model can and cannot do.",
  alternates: { canonical: "/accuracy" },
  // Own og:url so shares don't point at the homepage. og:title/og:description
  // resolve from the fields above. Setting `openGraph` at all means the root
  // app/opengraph-image.tsx is NOT inherited (verified in the built HTML on
  // /help/connect-espn), so the site-default card is referenced explicitly —
  // this page has no card of its own.
  openGraph: {
    url: `https://${siteConfig.domain}/accuracy`,
    images: ["/opengraph-image"],
  },
};

/**
 * Public accuracy page — the published backtest, the pre-registered 2026
 * prediction, and the stated limits. Content lives in src/content/accuracy.mdx
 * and renders through the global element map in src/mdx-components.tsx, which
 * is where the table styling comes from. GFM tables/task lists work because
 * remark-gfm is registered in next.config.ts.
 */
export default function AccuracyPage() {
  return <Accuracy />;
}
