import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Let .md/.mdx files act as routes so blog posts can live as content files
  // instead of hand-written .tsx pages.
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  async redirects() {
    return [
      // The $500 founding-member prize promotion has ended and /prize was
      // removed. It was linked from the site nav and footer, so inbound links
      // and bookmarks exist — send them to pricing instead of a 404.
      { source: "/prize", destination: "/#pricing", permanent: true },
    ];
  },
};

// Plugins must be passed as STRINGS, not imported functions — Turbopack (the
// default bundler in Next 16) can't hand JS functions across to Rust.
//
// remark-gfm is not optional for this site's content: base MDX renders tables
// as literal pipe characters and ignores `- [ ]` task lists. Both appear in the
// commissioner guides.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
