import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ProofBar } from "@/components/ProofBar";
import { Problem } from "@/components/Problem";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { DemoBanner } from "@/components/DemoBanner";
import { Comparison } from "@/components/Comparison";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

// Homepage-specific canonical and og:url. Set here rather than in the root
// layout because both are per-page — anything put in the layout is inherited by
// every subpage. og:title/og:description come from the layout's title/description
// defaults, which for this route are already the homepage's.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    url: `https://${siteConfig.domain}`,
  },
};

function Divider() {
  return (
    <div
      className="h-px relative z-10"
      style={{
        background:
          "linear-gradient(90deg, transparent, var(--border), transparent)",
      }}
    />
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProofBar />
        <Divider />
        <Problem />
        <Divider />
        <Features />
        <Divider />
        <HowItWorks />
        <Divider />
        <DemoBanner />
        <Divider />
        <Comparison />
        <Divider />
        <Pricing />
        <Divider />
        <Testimonials />
        <Divider />
        <FAQ />
        <Divider />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
