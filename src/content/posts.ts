import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * Blog post registry — the single source of truth for post metadata.
 *
 * Deliberately an explicit array rather than filesystem scanning or frontmatter
 * parsing. At roughly one post a month, auto-discovery buys nothing and costs a
 * dependency (gray-matter) plus build-time IO. The registry is read by:
 *
 *   - app/sitemap.ts        (which URLs exist, and lastModified)
 *   - app/og/[slug]/route.tsx (OG card title)
 *   - each post's page.mdx  (via postMetadata(), below)
 *   - the blog index         (phase 3)
 *
 * ADDING A POST: create src/app/blog/<slug>/page.mdx, add an entry here with a
 * matching slug, and set `export const metadata = postMetadata("<slug>")` in
 * the MDX. The slug in the registry MUST match the route folder name — nothing
 * enforces that at compile time, so it is the one thing to double-check.
 */

export type Post = {
  /** URL segment under /blog/ — must match the route folder name. */
  slug: string;
  /** Full headline — used for the OG card, the index, and JSON-LD. */
  title: string;
  /**
   * Optional shorter title for the <title> tag. The root template appends
   * " — GridironHQ", and Google truncates around 60 characters, so a 90-char
   * headline gets cut off in results. Falls back to `title`.
   */
  metaTitle?: string;
  /** Meta description and OG description. Aim for 140–160 characters. */
  description: string;
  /** ISO date (YYYY-MM-DD). Drives sitemap lastModified and article:published_time. */
  date: string;
  /** Shown on the index and in the OG card. */
  category: string;
  /** Optional ISO date for substantive edits; falls back to `date`. */
  updated?: string;
};

export const posts: Post[] = [
  {
    slug: "college-football-playoff-conference-revenue-sharing",
    title:
      "The Big Ten never changed its rules. Its schools ended up $14 million apart anyway.",
    metaTitle: "How the Playoff Broke Big Ten Revenue Sharing",
    description:
      "Big Ten schools were paid within $175,000 of each other in 2022-23, then $14 million apart two years later. What the 12-team playoff did to revenue sharing.",
    date: "2026-08-30",
    category: "Research",
  },
  {
    slug: "nfl-fantasy-shutdown-keeper-league-draft-history",
    title:
      "NFL Fantasy Is Gone. Here's What Your Keeper League Just Lost — And How to Get It Back",
    metaTitle:
      "NFL Fantasy Shutdown: What Keeper Leagues Lost in the ESPN Migration",
    description:
      "NFL Fantasy shut down for 2026 and ESPN is the official replacement. The migration saves your standings and champions — but not your draft results. How keeper commissioners recover draft-round data.",
    date: "2026-08-14",
    category: "Commissioner Guides",
  },
];

/** Newest first — the order the index should render. */
export const postsByNewest = (): Post[] =>
  [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string): Post | undefined =>
  posts.find((p) => p.slug === slug);

const SITE_URL = `https://${siteConfig.domain}`;

export const postUrl = (slug: string) => `${SITE_URL}/blog/${slug}`;

/** Absolute URL of a post's generated OG card. */
export const postOgImageUrl = (slug: string) => `${SITE_URL}/og/${slug}`;

/**
 * Full Metadata for a post — canonical, OG, and Twitter in one call.
 *
 * MDX files support `export const metadata`, but not a practical
 * `generateMetadata()`; building the object here keeps each post to one line
 * and guarantees no post ships without a canonical or an OG image.
 *
 * Throws on an unknown slug rather than emitting a page with no metadata — a
 * failed build is a much cheaper problem than a silently unindexable post.
 */
export function postMetadata(slug: string): Metadata {
  const post = getPost(slug);
  if (!post) {
    throw new Error(
      `postMetadata("${slug}"): no entry in src/content/posts.ts. Add one, or fix the slug to match the route folder.`,
    );
  }

  return {
    // <title> gets the short form; social cards keep the full headline.
    title: post.metaTitle ?? post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: postUrl(post.slug),
      siteName: siteConfig.name,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      images: [
        {
          url: `/og/${post.slug}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/og/${post.slug}`],
    },
  };
}
