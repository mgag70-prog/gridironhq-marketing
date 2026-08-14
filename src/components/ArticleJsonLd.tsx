import { siteConfig } from "@/config/site";
import { getPost, postOgImageUrl, postUrl } from "@/content/posts";

/**
 * Article structured data for a blog post.
 *
 * Rendered inside the post's MDX (`<ArticleJsonLd slug="..." />`) because MDX
 * has no practical generateMetadata hook and JSON-LD isn't expressible through
 * the Metadata API anyway.
 *
 * The JSON is built from the registry — never from user input — so
 * dangerouslySetInnerHTML here carries no injection surface. JSON.stringify
 * also escapes the quotes that would otherwise break out of the script tag.
 */
export function ArticleJsonLd({ slug }: { slug: string }) {
  const post = getPost(slug);
  if (!post) {
    throw new Error(
      `ArticleJsonLd: no registry entry for "${slug}" (src/content/posts.ts).`,
    );
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    articleSection: post.category,
    image: postOgImageUrl(post.slug),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl(post.slug),
    },
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: `https://${siteConfig.domain}`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.company.legalName,
      url: `https://${siteConfig.domain}`,
    },
  };

  // JSON.stringify does not escape "/", so a value containing "</script>" would
  // still break out of the tag. Registry data is developer-authored, but escaping
  // "<" costs one replace and removes the failure mode entirely.
  const json = JSON.stringify(schema).replace(/</g, "\\u003c");

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
