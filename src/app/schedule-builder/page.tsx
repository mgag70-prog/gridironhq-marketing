import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import ScheduleBuilder from "./ScheduleBuilder";

export const metadata: Metadata = {
  // No "— GridironHQ" suffix here: the root layout's title template already
  // appends it. Hardcoding it produced "… — GridironHQ — GridironHQ" (live on
  // production before this change).
  title: "Free Fantasy Football Schedule Builder",
  description:
    "Build a custom fantasy football schedule with pinned matchups, back-to-back prevention, and playoff brackets. Free tool from GridironHQ.",
  alternates: { canonical: "/schedule-builder" },
  // Own og:url so shares of this page don't point at the homepage. og:title and
  // og:description resolve from the title/description above. The site-default
  // OG card is inherited, which is correct — this page has no card of its own.
  openGraph: {
    url: `https://${siteConfig.domain}/schedule-builder`,
  },
};

export default function ScheduleBuilderPage() {
  return <ScheduleBuilder />;
}
