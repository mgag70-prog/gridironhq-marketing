import type { Metadata, Viewport } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/config/site";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteConfig.domain}`),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  // NOTE: deliberately no `alternates.canonical` here. Root-layout metadata is
  // inherited by every route, so a canonical set here would tell search engines
  // that /schedule-builder and every blog post ARE the homepage. Canonicals are
  // set per page instead.
  keywords: [
    "fantasy football",
    "ARGUS",
    "AI advisor",
    "fantasy football AI",
    "Sleeper",
    "ESPN fantasy",
    "dynasty fantasy",
    "championship probability",
    "league treasury",
  ],
  authors: [{ name: siteConfig.company.legalName }],
  // Only site-wide-safe fields belong here. `title`, `description`, and `url`
  // are per-page and were previously set at this level, which meant every
  // subpage advertised the HOMEPAGE's og:title/og:description/og:url — so
  // sharing /schedule-builder showed the homepage. Next fills og:title and
  // og:description from each page's own title/description when they aren't
  // overridden here, and pages that need og:url set it themselves.
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/icon-512.png",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030d1c" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bebasNeue.variable} ${dmSans.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
