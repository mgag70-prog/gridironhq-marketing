import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { postsByNewest } from "@/content/posts";

const SITE_URL = `https://${siteConfig.domain}`;

/**
 * Hand-maintained "last meaningfully updated" dates for the static routes.
 *
 * Deliberately NOT `new Date()`. A lastmod that changes on every deploy is
 * noise — search engines learn to discount it, which devalues the signal for
 * the pages where it is real. Blog posts don't appear here because their dates
 * come from the registry.
 *
 * BUMP THESE when the page's CONTENT changes — not for styling, metadata, or
 * dependency work. Dates below trace to real commits:
 *   /                 2026-08-14  nav restructure + Blog link (this changeset)
 *   /schedule-builder 2026-08-12  marketing truth pass (744b238)
 *   /blog             2026-08-14  index created (this changeset)
 *   /help/connect-espn 2026-08-25 page created (fe8dd49)
 *   /accuracy         2026-08-27  page created (this changeset)
 *   /nfl-bye-weeks    2026-08-31  page created (this changeset)
 *   /privacy          2026-09-03  page created (this changeset)
 *   /terms            2026-09-03  page created (this changeset)
 *   /accuracy/pre-registration 2026-09-03  page created (this changeset)
 */
const STATIC_LAST_MODIFIED = {
  home: "2026-08-14",
  scheduleBuilder: "2026-08-12",
  blogIndex: "2026-08-14",
  helpConnectEspn: "2026-08-25",
  accuracy: "2026-08-27",
  nflByeWeeks: "2026-08-31",
  privacy: "2026-09-03",
  terms: "2026-09-03",
  accuracyPreRegistration: "2026-09-03",
} as const;

/** Parse as UTC midnight so the date can't slip a day by timezone. */
const asDate = (iso: string) => new Date(`${iso}T00:00:00Z`);

/**
 * Sitemap.
 *
 * /demo is excluded deliberately — it is noindex (see app/demo/page.tsx), and
 * listing a noindex URL sends search engines a contradictory signal.
 *
 * Blog URLs come from the post registry (src/content/posts.ts), so a post that
 * exists as a route but was never registered will NOT appear here. That is the
 * intended trade-off of an explicit registry: nothing gets indexed by accident.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: asDate(STATIC_LAST_MODIFIED.home),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Priority 0.9, above every other subpage: /accuracy is the evidence page
    // behind the homepage's central claim, and it is the destination for
    // "is GridironHQ accurate"-shaped queries.
    {
      url: `${SITE_URL}/accuracy`,
      lastModified: asDate(STATIC_LAST_MODIFIED.accuracy),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/schedule-builder`,
      lastModified: asDate(STATIC_LAST_MODIFIED.scheduleBuilder),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/nfl-bye-weeks`,
      lastModified: asDate(STATIC_LAST_MODIFIED.nflByeWeeks),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: asDate(STATIC_LAST_MODIFIED.blogIndex),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/help/connect-espn`,
      lastModified: asDate(STATIC_LAST_MODIFIED.helpConnectEspn),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Supporting document for /accuracy — the pre-registered grading criteria.
    // A fixed reference by design, hence "yearly".
    {
      url: `${SITE_URL}/accuracy/pre-registration`,
      lastModified: asDate(STATIC_LAST_MODIFIED.accuracyPreRegistration),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    // Legal pages: indexable but low priority — nobody should land here from
    // search ahead of a product page.
    {
      url: `${SITE_URL}/privacy`,
      lastModified: asDate(STATIC_LAST_MODIFIED.privacy),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: asDate(STATIC_LAST_MODIFIED.terms),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = postsByNewest().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: asDate(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
