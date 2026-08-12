import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The $500 founding-member prize promotion has ended and /prize was
      // removed. It was linked from the site nav and footer, so inbound links
      // and bookmarks exist — send them to pricing instead of a 404.
      { source: "/prize", destination: "/#pricing", permanent: true },
    ];
  },
};

export default nextConfig;
