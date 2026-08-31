import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import ByeWeekChecker from "./ByeWeekChecker";

// No "— GridironHQ" suffix: the root layout's title template appends it.
// Title/H1 phrased the way the query is typed ("NFL bye weeks 2026").
export const metadata: Metadata = {
  title: "NFL Bye Weeks 2026: Full Schedule & Fantasy Overlap Checker",
  description:
    "Every 2026 NFL bye week in one place. Find your team's bye fast, see which weeks hit hardest (six teams sit in Week 11), and pick your fantasy roster's teams to spot the weeks you're thin. Free, no account.",
  alternates: { canonical: "/nfl-bye-weeks" },
  // Own og:url so shares don't point at the homepage. Setting `openGraph` at
  // all drops the inherited root app/opengraph-image.tsx (verified in built
  // HTML for /help/connect-espn), so the site-default card is referenced
  // explicitly — this page has no card of its own.
  openGraph: {
    url: `https://${siteConfig.domain}/nfl-bye-weeks`,
    images: ["/opengraph-image"],
  },
};

export default function NflByeWeeksPage() {
  return <ByeWeekChecker />;
}
