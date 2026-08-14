import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const SITE_URL = `https://${siteConfig.domain}`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /demo is an iframe wrapper around a static HTML build and is already
      // noindex via its own metadata; keep crawlers out of the raw file too.
      disallow: ["/demo.html"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
