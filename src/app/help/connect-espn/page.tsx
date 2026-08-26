import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import ConnectEspn from "@/content/connect-espn.mdx";

// No "— GridironHQ" suffix: the root layout's title template appends it.
export const metadata: Metadata = {
  title: "Connecting your ESPN league",
  description:
    "How to connect your ESPN fantasy football league to GridironHQ: the 60-second copy-paste method, the manual cookie method, reconnecting, and troubleshooting.",
  alternates: { canonical: "/help/connect-espn" },
  // Own og:url so shares don't point at the homepage. og:title/og:description
  // resolve from the fields above. Setting `openGraph` at all means the root
  // app/opengraph-image.tsx is NOT inherited (verified in the built HTML), so
  // the site-default card is referenced explicitly — this page has no card of
  // its own.
  openGraph: {
    url: `https://${siteConfig.domain}/help/connect-espn`,
    images: ["/opengraph-image"],
  },
};

/**
 * Public help doc for the ESPN connection flow. Content lives in
 * src/content/connect-espn.mdx and is kept in lockstep (same words) with the
 * app repo's ESPN_CONNECT_INSTRUCTIONS_MD in src/content/espn-connect-instructions.ts
 * — that file is the source of truth; edit there, then mirror here. Rendering
 * goes through the global element map in src/mdx-components.tsx.
 */
export default function ConnectEspnHelpPage() {
  return <ConnectEspn />;
}
