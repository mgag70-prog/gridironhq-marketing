export type PricingTier = {
  id: "starter" | "pro" | "dynasty";
  name: string;
  price: number;
  cadence: string;
  annualTotal: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
  badge?: string;
  note?: string;
};

export type FoundingTier = {
  id: "commissioner" | "league-member" | "dynasty-elite";
  name: string;
  price: number;
  cadence: string;
  stripeUrl: string;
  ctaLabel: string;
  ctaVariant: "primary" | "outline";
};

export type SeasonPass = {
  id: "season-pass-pro" | "league-pass-pro";
  name: string;
  price: number;
  description: string;
  cta: { label: string; href: string };
};

export type Feature = {
  id: string;
  icon: string;
  title: string;
  description: string;
  tag: string;
};

export type ProblemItem = {
  icon: string;
  title: string;
  description: string;
};

export type HowItWorksStep = {
  step: number;
  title: string;
  description: string;
};

export type ComparisonRow = {
  feature: string;
  gridironhq: "yes" | "no" | string;
  gridironhqNote?: string;
  competitors: string[];
  inverted?: boolean;
};

export type Testimonial = {
  quote: string;
  author: string;
  initials: string;
  meta: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ProofStat = {
  value: string;
  label: string;
};

export const siteConfig = {
  name: "GridironHQ",
  domain: "gridironhq.ai",
  tagline: "The Fantasy Football Advisor That Actually Knows Your Team",
  description:
    "Stop getting generic rankings. GridironHQ is the AI-powered fantasy football advisor built around your roster, your league, and your championship odds. Founding member pricing available now.",

  urls: {
    app: "https://app.gridironhq.ai",
    demo: "https://gridironhq.ai/demo",
  },

  contact: {
    email: "hello@gridironhq.ai",
  },

  company: {
    legalName: "HQ Sports Technologies LLC",
    copyright: "© 2026 HQ Sports Technologies LLC. All rights reserved.",
  },

  launch: {
    window: "late July to early August 2026",
    short: "Late July – Early August 2026",
  },

  nav: {
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
      { label: "Schedule Builder", href: "/schedule-builder" },
      { label: "Prizes", href: "/prize" },
    ],
    signInHref: "https://app.gridironhq.ai",
    ctaLabel: "Get Early Access",
    ctaHref: "#pricing",
  },

  hero: {
    eyebrow: "Founding Member Access Open Now",
    headline: {
      lines: ["The Fantasy", "Advisor That", "Actually Knows", "Your Team"],
      accentLine: "Actually Knows",
    },
    subhead:
      "Stop getting the same generic rankings as everyone else. GridironHQ is the AI-powered advisor built around your specific roster, your league, and your championship odds — plus The Vault for complete league history and the Portfolio Dashboard to manage every league from one command center.",
    primaryCta: { label: "Lock In Founding Rate", href: "#pricing" },
    secondaryCta: { label: "Try the Demo", href: "https://gridironhq.ai/demo" },
    socialProof:
      "200 founding member spots — first 200 commissioners lock in $4.99/mo for life",
    avatars: ["CM", "JR", "AB", "TK", "+"],
  },

  proofStats: [
    { value: "200", label: "Founding Member Spots" },
    { value: "9", label: "Feature Modules" },
    { value: "HYSA", label: "Competitive Rate on Prize Pool" },
    { value: "A–F", label: "Personalized ARGUS Team Grade" },
  ] satisfies ProofStat[],

  problem: {
    label: "The Problem",
    title: "Every Tool Gives You the Same Advice",
    titleAccent: "Same Advice",
    subhead:
      "The platforms that exist today were built for casual players. If you're serious about winning, you've been underserved.",
    items: [
      {
        icon: "📊",
        title: "Generic rankings that ignore your roster",
        description:
          "FantasyPros tells 5 million people to start the same player. None of them know you have a better option on your bench.",
      },
      {
        icon: "🤷",
        title: "Projections without context",
        description:
          "A player projected for 14 points means nothing if you don't know what it does to your playoff odds — or your championship probability.",
      },
      {
        icon: "💸",
        title: "Zero financial management tools",
        description:
          "You're chasing Venmo payments, losing the prize-pool paper trail, and manually tracking who's paid. Every commissioner knows this pain.",
      },
    ] satisfies ProblemItem[],
    solution: {
      title: "GridironHQ Fixes All Three",
      titleAccent: "Fixes",
      points: [
        "AI that knows your exact roster, your record, and your playoff situation",
        "Every decision framed as championship probability impact — not just points",
        "Built-in league treasury with dues collection and rules-based payouts (coming soon)",
        "Behavioral profiles on every manager in your league — negotiate smarter",
        "Mock draft simulator with real-time championship probability modeling",
        "Works with Sleeper, ESPN, Yahoo, and CBS — no new platform required",
      ],
    },
  },

  features: {
    label: "Features",
    title: "Everything Serious Players Actually Need",
    titleAccent: "Actually Need",
    subhead:
      "Built from the ground up for competitive fantasy managers who want every edge available.",
    items: [
      {
        id: "ai-advisor",
        icon: "🤖",
        title: "ARGUS AI Advisor",
        description:
          "Ask anything in plain English. ARGUS, GridironHQ's proprietary AI advisory engine, has your full roster loaded — start/sit, trade analysis, waiver targets, playoff strategy, plus the ARGUS Offseason Report with personalized team grade, draft strategy, and player spotlights. Every answer is specific to your team, not a generic list.",
        tag: "Personalized to your roster →",
      },
      {
        id: "offseason-report",
        icon: "📋",
        title: "ARGUS Offseason Report",
        description:
          "Get your personalized team grade, roster strengths and concerns, player spotlights, and draft strategy right now — before the season even starts. ARGUS analyzes your specific roster and delivers a printable PDF report.",
        tag: "Available right now →",
      },
      {
        id: "decision-ev",
        icon: "🎯",
        title: "Decision EV Framework",
        description:
          "Every decision — lineup, trade, waiver — expressed as championship probability impact. \"Starting Williams over Gibbs increases your championship odds by 2.1%.\" That's the level of precision you deserve.",
        tag: "Championship equity on every choice →",
      },
      {
        id: "league-intel",
        icon: "🧠",
        title: "League Intel",
        description:
          "AI-built behavioral profiles on every manager in your league. Accept rates, FAAB patterns, positional hoarding tendencies. Know how to structure a trade before you even send it.",
        tag: "Nobody else has built this →",
      },
      {
        id: "trade-analyzer",
        icon: "🤝",
        title: "Trade Analyzer",
        description:
          "Not just value comparison — championship delta. See exactly how your championship probability changes if you accept, decline, or counter. The AI gives you a verdict and explains why.",
        tag: "Accept, decline, or counter →",
      },
      {
        id: "draft-center",
        icon: "🎯",
        title: "Draft Center",
        description:
          "Mock draft simulator where every pick is scored by championship probability. AI opponents draft realistically. \"Drafting a WR here increases your championship odds by 4%.\" Know before you pick.",
        tag: "Real-time championship modeling →",
      },
      {
        id: "vault",
        icon: "🏛️",
        title: "The Vault",
        description:
          "Complete league history, all-time standings, H2H records, Luck Index, Clutch Factor, Dynasty Power Rankings, and ARGUS analysis of your league's all-time trends. Built for dynasty and keeper leagues.",
        tag: "All-time stats unlocked →",
      },
      {
        id: "portfolio-dashboard",
        icon: "📈",
        title: "Portfolio Dashboard",
        description:
          "All your leagues in one command center. Combined record, championship probability across all leagues, ARGUS cross-league alerts, and player exposure tracking across every team you manage.",
        tag: "Every league, one view →",
      },
      {
        id: "league-treasury",
        icon: "💳",
        title: "League Treasury (Coming Soon)",
        description:
          "A protected league treasury is on our roadmap — collect dues, hold the prize pool in a segregated account, and pay out winners on your league's rules. Launching after our financial partner review; founding members get first access.",
        tag: "Stop chasing Venmo payments →",
      },
    ] satisfies Feature[],
  },

  howItWorks: {
    label: "How It Works",
    title: "Up and Running in Three Minutes",
    titleAccent: "Three Minutes",
    subhead:
      "GridironHQ works on top of your existing platform. No migration, no starting over.",
    steps: [
      {
        step: 1,
        title: "Connect Your League",
        description:
          "Enter your fantasy league platform username — Sleeper, ESPN, Yahoo, or CBS. GridironHQ imports your league settings, your roster, your record, your scoring format — everything. Takes about 30 seconds.",
      },
      {
        step: 2,
        title: "Get Personalized Advice",
        description:
          "Ask ARGUS anything or check your personalized Offseason Report — team grade, concerns, player spotlights, and draft strategy ready before the season starts.",
      },
      {
        step: 3,
        title: "Win Your League",
        description:
          "Make better decisions every week. The championship probability framework keeps your eye on the prize — not just this week's matchup, but the whole season.",
      },
    ] satisfies HowItWorksStep[],
  },

  demoBanner: {
    title: "See It In Action",
    titleAccent: "In Action",
    description:
      "Try the fully interactive demo — live ARGUS, real EV framework, League Intel behavioral profiles, mock draft simulator. No account required.",
    cta: { label: "Try the Live Demo", href: "https://gridironhq.ai/demo" },
  },

  comparison: {
    label: "Comparison",
    title: "GridironHQ vs Everyone Else",
    titleAccent: "Everyone Else",
    subhead:
      "The platforms that exist today were built for casual players. GridironHQ is built for you.",
    competitors: ["FantasyPros", "PFF", "The Field"],
    rows: [
      { feature: "Advice personalized to your roster", gridironhq: "yes", competitors: ["no", "no", "no"] },
      { feature: "Championship probability on every decision", gridironhq: "yes", competitors: ["no", "no", "no"] },
      { feature: "ARGUS proprietary AI advisor", gridironhq: "yes", competitors: ["no", "no", "no"] },
      { feature: "League behavioral analytics", gridironhq: "yes", competitors: ["no", "no", "no"] },
      { feature: "League treasury & dues collection", gridironhq: "Coming soon", competitors: ["no", "no", "no"] },
      { feature: "Flat-fee treasury, not percentage-based", gridironhq: "Coming soon", competitors: ["N/A", "N/A", "N/A"] },
      { feature: "Start/sit advice same for every user", gridironhq: "no", gridironhqNote: "personalized", competitors: ["yes", "yes", "yes"], inverted: true },
      { feature: "Draft simulator with EV modeling", gridironhq: "yes", competitors: ["Partial", "Partial", "Partial"] },
      { feature: "Works with your existing platform", gridironhq: "yes", competitors: ["yes", "yes", "yes"] },
      { feature: "Waiver wire ranked by roster fit", gridironhq: "yes", competitors: ["Generic", "Generic", "Generic"] },
      { feature: "Complete league history & analytics (The Vault)", gridironhq: "yes", competitors: ["no", "no", "no"] },
      { feature: "Portfolio view across all leagues", gridironhq: "yes", competitors: ["no", "no", "no"] },
      { feature: "Personalized AI team grade & report", gridironhq: "yes", competitors: ["no", "no", "no"] },
      { feature: "Free schedule builder with divisions", gridironhq: "yes", competitors: ["no", "no", "no"] },
      { feature: "Price", gridironhq: "$4.99/mo founding", competitors: ["$8.99/mo", "$9.99/mo", "$8-15/mo"] },
    ] satisfies ComparisonRow[],
  },

  pricing: {
    label: "Pricing",
    title: "Simple, Transparent Pricing",
    titleAccent: "Transparent",
    subhead:
      "Start with the founding member rate while it lasts. Regular pricing takes effect at launch.",
    tiers: [
      {
        id: "starter",
        name: "Starter",
        price: 3.99,
        cadence: "/month, billed annually ($47.88/yr)",
        annualTotal: "$47.88/yr",
        description:
          "Core ARGUS access for the serious casual player. Everything you need to make better decisions every week.",
        features: [
          "ARGUS — personalized start/sit",
          "Waiver wire with roster fit scoring",
          "Basic trade analyzer",
          "Player news with AI impact notes",
          "Sleeper, ESPN, Yahoo, CBS support",
        ],
        cta: { label: "Join Waitlist", href: "#waitlist" },
        note: "Launches July 15, 2026 at $3.99/mo",
      },
      {
        id: "pro",
        name: "Pro Advisor",
        price: 7.99,
        cadence: "/month, billed annually ($95.88/yr)",
        annualTotal: "$95.88/yr",
        description:
          "The full GridironHQ experience. Championship probability on every decision, League Intel, and the complete draft center.",
        features: [
          "Everything in Starter",
          "Championship EV on all decisions",
          "League Intel behavioral profiles",
          "Full trade analyzer + AI verdict",
          "Draft Center + mock draft simulator",
          "League Treasury + dues collection (coming soon)",
          "Playoff probability modeling",
        ],
        cta: { label: "Lock In Founding Rate", href: "#founding" },
        featured: true,
        badge: "Most Popular",
      },
      {
        id: "dynasty",
        name: "Dynasty Elite",
        price: 9.99,
        cadence: "/mo",
        annualTotal: "$120/yr",
        description:
          "Built for the dynasty and keeper manager. Career outcome models, prospect profiling, and multi-season behavioral analytics.",
        features: [
          "Everything in Pro Advisor",
          "Dynasty rankings + valuations",
          "Career outcome models",
          "Rookie profiling + breakout scores",
          "Keeper value engine",
          "Multi-season behavioral analytics",
        ],
        cta: {
          label: "Lock In Founding Rate → $9.99/mo",
          href: "https://app.gridironhq.ai/subscribe?plan=dynasty",
        },
        note: "$9.99/mo or $120/yr · locked for life · Regular price $11.99/mo after July 15",
      },
    ] satisfies PricingTier[],
  },

  founding: {
    heading: "Founding Member Offer — First 200 Founding Members",
    description:
      "Three founding rates for three roles — commissioners at $4.99/mo, league members at $5.99/mo, and dynasty players at $9.99/mo. Founding member pricing closes July 15, 2026 — every rate is locked forever at signup. Regular pricing resumes after July 15.",
    spots: 200,
    tiers: [
      {
        id: "commissioner",
        name: "Commissioner Rate",
        price: 4.99,
        cadence: "/mo",
        stripeUrl: "https://app.gridironhq.ai/subscribe?plan=commissioner",
        ctaLabel: "Subscribe Now",
        ctaVariant: "primary",
      },
      {
        id: "league-member",
        name: "League Member Rate",
        price: 5.99,
        cadence: "/mo",
        stripeUrl: "https://app.gridironhq.ai/subscribe?plan=league",
        ctaLabel: "Subscribe Now",
        ctaVariant: "outline",
      },
      {
        id: "dynasty-elite",
        name: "Dynasty Elite",
        price: 9.99,
        cadence: "/mo locked for life",
        stripeUrl: "https://app.gridironhq.ai/subscribe?plan=dynasty",
        ctaLabel: "Subscribe Now",
        ctaVariant: "outline",
      },
    ] satisfies FoundingTier[],
  },

  seasonPasses: [
    {
      id: "season-pass-pro",
      name: "Season Pass — Pro",
      price: 44.99,
      description:
        "Full Pro Advisor access August – February. One payment, no recurring.",
      cta: { label: "Get Season Pass", href: "https://app.gridironhq.ai" },
    },
    {
      id: "league-pass-pro",
      name: "League Pass — Pro",
      price: 79.99,
      description:
        "All 12 league members get Pro Advisor for the full season. Commissioner pays once.",
      cta: { label: "Get League Pass", href: "https://app.gridironhq.ai" },
    },
  ] satisfies SeasonPass[],

  testimonials: {
    label: "Early Feedback",
    title: "What Founding Members Are Saying",
    titleAccent: "Saying",
    items: [
      {
        quote:
          "The championship probability framework is exactly what I've been wanting for years. Instead of guessing whether to accept a trade, I can see the exact impact. No other platform does this.",
        author: "Chris M.",
        initials: "CM",
        meta: "8-year commissioner · 12-team dynasty",
      },
      {
        quote:
          "The League Intel tab is wild. It showed me that our league's biggest trader is 40% more likely to accept when you offer 2 players instead of 1. Used it immediately on a deal and it worked.",
        author: "Jake R.",
        initials: "JR",
        meta: "Founding member · ESPN 10-team PPR",
      },
      {
        quote:
          "Finally solved the 'chasing people for money' problem. Everyone in our league paid through the Stripe link, the money stays protected until the season ends, then one-click payout. Dream feature.",
        author: "Alex B.",
        initials: "AB",
        meta: "Commissioner · $100 buy-in · 12 teams",
      },
    ] satisfies Testimonial[],
  },

  faq: {
    label: "FAQ",
    title: "Common Questions",
    titleAccent: "Questions",
    items: [
      {
        question: "Does GridironHQ replace my current fantasy platform?",
        answer:
          "No — GridironHQ works on top of Sleeper, ESPN, Yahoo, and CBS. You keep your league exactly where it is. GridironHQ connects to it and gives you a smarter advisory layer on top. No migration, no convincing your league to switch platforms.",
      },
      {
        question: "What does \"founding member rate locked for life\" actually mean?",
        answer:
          "Your $4.99/mo (or $5.99/mo for league members) rate never goes up — even as we raise prices for new subscribers, add features, or change tiers. You locked in your price before launch and it stays forever as long as you keep your subscription active.",
      },
      {
        question: "When does GridironHQ launch?",
        answer:
          "We're targeting late July to early August 2026 — in advance of your league draft. Founding members will get early access and will be the first to connect their leagues. You're not paying for a finished product yet, which is why the founding rate is 37% off regular price.",
      },
      {
        question: "What if GridironHQ doesn't launch?",
        answer:
          "Full refund, no questions asked. You can cancel any time before launch from your Stripe account. We're not asking you to take a risk — if the product doesn't ship, you don't pay for it.",
      },
      {
        question: "Does ARGUS actually know my roster?",
        answer:
          "Yes — this is the whole point. When you connect your Sleeper league, GridironHQ imports your actual roster, your scoring format, your record, and your playoff situation. Every AI response is built around your specific team, not generic advice.",
      },
      {
        question: "What platforms does GridironHQ support at launch?",
        answer:
          "Sleeper at launch, with ESPN, Yahoo, and CBS to follow in rapid succession. Sleeper has the best developer API and is where we're starting — if your league is on Sleeper, you'll be first in the door.",
      },
      {
        question: "How does GridironHQ Treasury work?",
        answer:
          "League Treasury is coming soon. It will let commissioners collect dues and hold the prize pool in a segregated account with rules-based payouts at season's end. We're finalizing our financial partner and will open it to founding members first.",
      },
      {
        question: "Does GridironHQ work for dynasty leagues?",
        answer:
          "Yes — Dynasty Elite tier includes dynasty rankings, career outcome models, rookie profiling, and keeper value tools. ARGUS understands multi-year roster building, not just week-to-week decisions.",
      },
      {
        question: "What is The Vault?",
        answer:
          "The Vault is GridironHQ's league history module. It connects to your Sleeper league, walks your complete season history, and builds all-time standings, H2H records, championship history, and four analytics metrics: Luck Index, Clutch Factor, Consistency Score, and Dynasty Power Rankings. ARGUS analyzes your league's history and surfaces patterns, rivalries, and trends.",
      },
      {
        question: "What is the ARGUS Offseason Report?",
        answer:
          "ARGUS analyzes your current roster, recent player news, and depth chart positions to generate a personalized team grade (A–F), key strengths and concerns, player spotlights with buy/sell/hold ratings, and a customized draft strategy. Available right now during the offseason — no need to wait for September.",
      },
      {
        question: "Can I connect multiple leagues?",
        answer:
          "Yes. GridironHQ supports multiple Sleeper leagues per account. Connect all your leagues and view them together on the Portfolio Dashboard. ESPN, Yahoo, and CBS integrations are coming in July 2026.",
      },
    ] satisfies FaqItem[],
  },

  finalCta: {
    label: "Get Started",
    headline: {
      lines: ["Ready to", "Actually Win", "Your League?"],
      accentLine: "Actually Win",
    },
    subhead:
      "Founding member pricing is available for a limited time. First 200 commissioners lock in $4.99/mo for life. Your league members lock in $5.99/mo.",
    signInPrompt: "Already have an account?",
    signInLabel: "Sign in to your dashboard →",
    demoPrompt: "Not ready to pay?",
    demoLabel: "Try the free demo first →",
  },

  footer: {
    tagline:
      "The AI-powered fantasy football advisor that actually knows your team. Built for serious players who want every edge available.",
    columns: [
      {
        heading: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Free Schedule Builder", href: "/schedule-builder" },
          { label: "Founding Member Prizes", href: "/prize" },
          { label: "Live Demo", href: "https://gridironhq.ai/demo" },
          { label: "Sign In", href: "https://app.gridironhq.ai" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About", href: "#" },
          { label: "FAQ", href: "#faq" },
          { label: "Contact", href: "mailto:hello@gridironhq.ai" },
        ],
      },
      {
        heading: "Coming Soon",
        links: [
          { label: "DiamondHQ — MLB", href: "#" },
          { label: "NBA", href: "#" },
          { label: "NHL", href: "#" },
          { label: "Soccer", href: "#" },
          { label: "Golf", href: "#" },
        ],
      },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Refund Policy", href: "#" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
