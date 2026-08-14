import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { siteConfig } from "@/config/site";
import { postsByNewest } from "@/content/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Commissioner guides and fantasy football strategy from GridironHQ — platform migrations, keeper rules, league history, and getting more out of your league.",
  alternates: { canonical: "/blog" },
  // Setting openGraph here means the root app/opengraph-image.tsx is no longer
  // inherited, so this route needs its own card — see ./opengraph-image.tsx.
  openGraph: {
    type: "website",
    url: `https://${siteConfig.domain}/blog`,
  },
};

/**
 * Blog index.
 *
 * Reads the same registry as the sitemap, the OG routes, and each post's own
 * metadata (src/content/posts.ts) — there is deliberately no second list of
 * posts anywhere in the codebase.
 */

/** "2026-08-14" -> "August 14, 2026", pinned to UTC so the date can't slip a day. */
function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogIndexPage() {
  const posts = postsByNewest();

  return (
    <div className="max-w-[880px] mx-auto px-6">
      <SectionHeader
        label="Blog"
        title="Commissioner Guides"
        titleAccent="Guides"
        subhead="Practical guides for running a league — platform migrations, keeper rules, and keeping your league's history intact."
      />

      <ul className="list-none mt-14 flex flex-col">
        {posts.map((post, i) => (
          <li key={post.slug}>
            {i > 0 && (
              <div
                className="h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--border), transparent)",
                }}
              />
            )}
            <Link
              href={`/blog/${post.slug}`}
              className="group block no-underline py-10 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-0.5 bg-orange" />
                <span className="font-condensed text-[12px] font-bold uppercase tracking-[1px] text-orange">
                  {post.category}
                </span>
                <span className="text-text-faint">·</span>
                <time
                  dateTime={post.date}
                  className="text-[12px] font-medium uppercase tracking-[0.5px] text-text-muted"
                >
                  {formatDate(post.date)}
                </time>
              </div>

              <h2 className="font-display text-[clamp(28px,3.4vw,42px)] leading-[1.08] tracking-[1px] uppercase text-text mb-4 transition-colors group-hover:text-orange">
                {post.title}
              </h2>

              <p className="text-[17px] leading-[1.7] text-text-muted max-w-[640px] mb-5">
                {post.description}
              </p>

              <span className="font-condensed text-[13px] font-bold uppercase tracking-[1px] text-orange inline-flex items-center gap-2">
                Read the guide
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
