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
  // Canonical host. The apex (gridironhq.ai) 307-redirects to www in
  // production, so every canonical, OG url, and sitemap entry derived from
  // this must say www — otherwise search engines and social scrapers are
  // pointed at a redirecting host.
  domain: "www.gridironhq.ai",
  tagline: "The Fantasy Football Advisor That Actually Knows Your Team",
  description:
    "Stop getting generic rankings. GridironHQ is the AI-powered fantasy football advisor built around your roster, your league, and your championship odds. Free 14-day trial, no credit card required.",

  urls: {
    app: "https://app.gridironhq.ai",
    demo: "/demo",
  },

  contact: {
    email: "hello@gridironhq.ai",
  },

  company: {
    legalName: "HQ Sports Technologies LLC",
    copyright: "© 2026 HQ Sports Technologies LLC. All rights reserved.",
  },

  nav: {
    // Section links are root-relative ("/#features", not "#features") so the
    // nav works on subpages too. A bare hash on /blog/* or /schedule-builder
    // resolves to nothing; "/#features" navigates home and scrolls. Behaviour
    // on the homepage itself is unchanged.
    links: [
      { label: "Features", href: "/#features" },
      { label: "How It Works", href: "/#how" },
      { label: "Pricing", href: "/#pricing" },
      { label: "FAQ", href: "/#faq" },
      { label: "Schedule Builder", href: "/schedule-builder" },
      // Nav items render `hidden md:inline` and there is no mobile menu, so this
      // link is desktop-only. The footer Blog link is the mobile-reachable path.
      { label: "Blog", href: "/blog" },
      { label: "Help", href: "/help/connect-espn" },
    ],
    signInHref: "https://app.gridironhq.ai",
    ctaLabel: "Start Free Trial",
    ctaHref: "/#pricing",
  },

  hero: {
    eyebrow: "Live Now — 14-Day Free Trial",
    headline: {
      lines: ["The Fantasy", "Advisor That", "Actually Knows", "Your Team"],
      accentLine: "Actually Knows",
    },
    subhead:
      "Stop getting the same generic rankings as everyone else. GridironHQ is the AI-powered advisor built around your specific roster, your league, and your championship odds — plus The Vault for complete league history and the Portfolio Dashboard to manage every league from one command center.",
    primaryCta: { label: "Start Free Trial", href: "#pricing" },
    secondaryCta: { label: "Try the Demo", href: "/demo" },
    socialProof:
      "14-day free trial — no credit card required, cancel any time",
    avatars: ["CM", "JR", "AB", "TK", "+"],
  },

  proofStats: [
    { value: "14", label: "Day Free Trial — No Card" },
    { value: "9", label: "Feature Modules" },
    { value: "$3.99", label: "Starting Price Per Month" },
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
        "Built-in league treasury with dues tracking and payment status",
        "Behavioral profiles on every manager in your league — negotiate smarter",
        "Mock draft simulator with real-time championship probability modeling",
        "Works with Sleeper and ESPN — no new platform required (Yahoo and CBS planned)",
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
        title: "League Treasury",
        description:
          "A shared payment directory for your league. Publish the payment methods you already use — Venmo, Cash App, Zelle, PayPal, bank transfer — members send you money directly and mark themselves paid, and you approve or reject each claim. GridironHQ tracks who has paid. It never holds, moves, or handles your league's money.",
        tag: "Stop chasing who's paid →",
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
          "Connect your Sleeper league with your username, or import an ESPN league. GridironHQ pulls in your league settings, your roster, your record, and your scoring format. Takes about 30 seconds. Yahoo and CBS are planned but not available yet.",
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
    cta: { label: "Try the Live Demo", href: "/demo" },
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
      { feature: "League dues tracking (no money held)", gridironhq: "yes", competitors: ["no", "no", "no"] },
      { feature: "Start/sit advice same for every user", gridironhq: "no", gridironhqNote: "personalized", competitors: ["yes", "yes", "yes"], inverted: true },
      { feature: "Draft simulator with EV modeling", gridironhq: "yes", competitors: ["Partial", "Partial", "Partial"] },
      { feature: "Works with your existing platform", gridironhq: "Partial", gridironhqNote: "Sleeper + ESPN", competitors: ["yes", "yes", "yes"] },
      { feature: "Waiver wire ranked by roster fit", gridironhq: "yes", competitors: ["Generic", "Generic", "Generic"] },
      { feature: "Complete league history & analytics (The Vault)", gridironhq: "yes", competitors: ["no", "no", "no"] },
      { feature: "Portfolio view across all leagues", gridironhq: "yes", competitors: ["no", "no", "no"] },
      { feature: "Personalized AI team grade & report", gridironhq: "yes", competitors: ["no", "no", "no"] },
      { feature: "Free schedule builder with divisions", gridironhq: "yes", competitors: ["no", "no", "no"] },
      { feature: "Price", gridironhq: "$3.99–$11.99/mo", competitors: ["$8.99/mo", "$9.99/mo", "$8-15/mo"] },
    ] satisfies ComparisonRow[],
  },

  pricing: {
    label: "Pricing",
    title: "Simple, Transparent Pricing",
    titleAccent: "Transparent",
    subhead:
      "Every plan starts with a 14-day free trial. No credit card to start, cancel any time.",
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
          "Sleeper and ESPN support",
        ],
        cta: {
          label: "Start Free Trial",
          href: "https://app.gridironhq.ai/subscribe?plan=starter",
        },
      },
      {
        id: "pro",
        name: "Commissioner",
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
          "League Treasury + dues tracking",
          "Playoff probability modeling",
        ],
        cta: {
          label: "Start Free Trial",
          href: "https://app.gridironhq.ai/subscribe?plan=commissioner",
        },
        featured: true,
        badge: "Most Popular",
      },
      {
        id: "dynasty",
        name: "Dynasty Elite",
        price: 11.99,
        cadence: "/mo, or billed annually",
        annualTotal: "$143.88/yr",
        description:
          "Built for the dynasty and keeper manager. Career outcome models, prospect profiling, and multi-season behavioral analytics.",
        features: [
          "Everything in Commissioner",
          "Dynasty rankings + valuations",
          "Career outcome models",
          "Rookie profiling + breakout scores",
          "Keeper value engine",
          "Multi-season behavioral analytics",
        ],
        cta: {
          label: "Start Free Trial",
          href: "https://app.gridironhq.ai/subscribe?plan=dynasty",
        },
      },
    ] satisfies PricingTier[],
  },

  testimonials: {
    label: "Early Feedback",
    title: "What Early Members Are Saying",
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
        meta: "Early member · ESPN 10-team PPR",
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
          "No — GridironHQ works on top of your league. You keep your league exactly where it is; GridironHQ connects to it and gives you a smarter advisory layer on top. Sleeper is fully supported and ESPN leagues can be imported today. Yahoo and CBS are planned but not available yet.",
      },
      {
        question: "How do I try GridironHQ before I pay?",
        answer:
          "Every plan starts with a 14-day free trial and no credit card is required to begin. If you don't add a payment method by the end of the trial, access simply pauses — you're never charged by surprise. You can also try the full interactive demo with no account at all.",
      },
      {
        question: "Can I cancel?",
        answer:
          "Yes — one click from your account page, any time. Cancelling stops future billing and you keep access through the end of the period you've already paid for.",
      },
      {
        question: "Does ARGUS actually know my roster?",
        answer:
          "Yes — this is the whole point. When you connect your Sleeper league, GridironHQ imports your actual roster, your scoring format, your record, and your playoff situation. Every AI response is built around your specific team, not generic advice.",
      },
      {
        question: "What platforms does GridironHQ support?",
        answer:
          "Sleeper is fully supported — connect with your username and everything imports automatically. ESPN leagues can be imported today. Yahoo and CBS are on the roadmap and are not available yet.",
      },
      {
        question: "How does GridironHQ Treasury work?",
        answer:
          "It's a payment directory and a ledger — not a bank. You publish the payment methods your league already uses (Venmo, Cash App, Zelle, PayPal, bank transfer) on a shareable page, members pay you directly through those methods and mark themselves as paid, and you approve or reject each claim. GridironHQ shows you who has paid and who hasn't. GridironHQ never holds, moves, escrows, or pays out your league's money — the money never touches us.",
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
          "Yes. GridironHQ supports multiple leagues per account. Connect your Sleeper leagues and import your ESPN leagues, then view them all together on the Portfolio Dashboard. Yahoo and CBS integrations are planned.",
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
      "Start with a 14-day free trial — no credit card required. Plans start at $3.99/mo and you can cancel any time.",
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
          { label: "Features", href: "/#features" },
          { label: "Pricing", href: "/#pricing" },
          { label: "Free Schedule Builder", href: "/schedule-builder" },
          { label: "Blog", href: "/blog" },
          { label: "Help", href: "/help/connect-espn" },
          { label: "Live Demo", href: "/demo" },
          { label: "Sign In", href: "https://app.gridironhq.ai" },
        ],
      },
      {
        heading: "Company",
        links: [
          { label: "About", href: "#" },
          { label: "FAQ", href: "/#faq" },
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
