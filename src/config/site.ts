export type PricingTier = {
  id: "starter" | "member" | "pro" | "dynasty";
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
      { label: "Accuracy", href: "/accuracy" },
      { label: "Pick'Em", href: "https://app.gridironhq.ai/pools" },
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
    // Third, quieter hero link. The alternative label "77 real league seasons,
    // tested" is now sourceable — src/content/accuracy.mdx states 77 leagues
    // across 2023-2025 — so it is available if a specific hook beats a generic
    // one here. Kept generic for now: the figure is the page's headline and
    // restating it in the hero spends it before the reader arrives.
    tertiaryCta: { label: "See the accuracy testing", href: "/accuracy" },
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
          "Every decision — lineup, trade, waiver — framed by what it does to your title outlook: improves, neutral, or weakens, with the reasoning attached. A directional read of your starting lineup, not a probability. Points tell you what a player might score; this tells you what the choice does to your season.",
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
          "Not just value comparison. See whether a deal improves, weakens, or leaves your title outlook flat — a directional read of your starting lineup, not a probability — and get a verdict on accept, decline, or counter with the reasoning behind it.",
        tag: "Accept, decline, or counter →",
      },
      {
        id: "draft-center",
        icon: "🎯",
        title: "Draft Center",
        description:
          "Mock draft simulator where every pick is scored by what it does to your title outlook, not just by best-player-available. AI opponents draft realistically. Know what a pick costs you before you make it.",
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

  // Every claim below is verified against the app repo (2026-08-27):
  //   • sport modes nfl | cfb | combined and scoring modes confidence |
  //     straight | ats are CHECK-constrained in migrations/013_pickem.sql and
  //     all three scoring modes are really graded (lib/pickem/grading.ts).
  //   • /pools is a TOP-LEVEL route outside the /dashboard subscription gate;
  //     grepping src/app/pools, src/lib/pickem and the pickem API routes for
  //     hasEntitlement / requireSubscribed / entitlements / trial returns no
  //     functional hits. Signed-in Clerk user is the ONLY gate.
  //   • Commissioner actions (invite, curate, publish, settle, standings,
  //     recap email) are guarded by commissioner_user_id only — no tier.
  //
  // Three things this copy must NEVER say, all deliberate:
  //   1. "No account needed" / "no sign-up". Joining and picking REQUIRE a
  //      signed-in account (joinPool returns `unauthorized` without a userId;
  //      the picks page redirects to /sign-in). Only the invite PREVIEW
  //      renders signed-out. "Free" here means free-with-an-account.
  //   2. "Unlimited" pools or members. No cap was found in actions.ts or the
  //      migration — but not finding a limit is not a documented no-limit.
  //   3. Anything implying we handle pool money. Pools carry an
  //      entry_fee_cents field; it is commissioner-side TRACKING only, the
  //      same posture as Treasury. GridironHQ never holds or moves funds.
  pickem: {
    label: "Free",
    title: "Try the real thing before you pay for anything",
    titleAccent: "the real thing",
    subhead:
      "Most tools give you a countdown. GridironHQ gives you a whole product.",
    body: [
      "Pick'Em pools are free — NFL, college, or both, with straight, spread, or confidence scoring. Weekly slates, automatic settlement, live standings, and an AI recap your league will actually read.",
      "Everything a commissioner needs to run a pool for the season, at no cost and with no card on file. Nothing here is on a clock.",
      "The paid tiers are for the advisor, your league history, and the dues tracker. The pool is just free.",
    ],
    primaryCta: { label: "Start a pool", href: "https://app.gridironhq.ai/pools" },
    secondaryCta: { label: "See what's paid", href: "#pricing" },
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
        cadence: "/month, or $39/year",
        annualTotal: "$39/yr",
        description:
          "Core ARGUS access for the serious casual player. Everything you need to make better decisions every week.",
        features: [
          "ARGUS — personalized start/sit",
          "Waiver wire with roster fit scoring",
          "Trade analyzer — values, fit, and a verdict",
          "Player news with AI impact notes",
          "Sleeper and ESPN support",
        ],
        cta: {
          label: "Start Free Trial",
          href: "https://app.gridironhq.ai/subscribe?plan=starter",
        },
      },
      // ─────────────────────────────────────────────────────────────────────
      // TIER LADDER — sourced from the app, not written here.
      //
      // Every tier's bullets below its own name are the features that tier
      // ADDS. The authority is the app repo's canonical entitlements map plus
      // the customer-facing copy kept in lockstep with it:
      //   ~/code/gridironhq/src/lib/entitlements.ts
      //   ~/code/gridironhq/src/app/subscribe/_components/tier-grid.tsx
      //
      //   Starter        argus_advisor, waiver, trade_analyzer, player_news
      //   League Member  + championship_probability, offseason_report,
      //                    draft_center
      //   Commissioner   + treasury, league_intel  (+ schedule_builder,
      //                    PLANNED — see the note below; not on the card)
      //   Dynasty Elite  + vault, dynasty_rankings, historical_analysis
      //
      // Rules for editing this block:
      //   • A bullet must name something in the FEATURES tuple in
      //     entitlements.ts. Two bullets have already been removed for
      //     failing this, both on 2026-08-27:
      //       - "Priority support" (proposed) — zero hits in the app repo.
      //       - Dynasty's "Career outcome models" / "Rookie profiling +
      //         breakout scores" / "Keeper value engine" (shipped) — each
      //         appeared in exactly ONE place in the app,
      //         src/lib/email/templates/subscription-confirmation.ts, a
      //         marketing email. No gate, no route, no product surface. They
      //         were advertised features that do not exist. Meanwhile The
      //         Vault — a real gated Dynasty-exclusive with a live route at
      //         app/dashboard/vault/page.tsx — was missing from the card.
      //       - Commissioner's "Free schedule builder" (shipped, removed
      //         2026-08-27). Two separate problems. First, the word "free"
      //         cannot sit inside a paid tier's list: the schedule builder on
      //         THIS site is genuinely free and public to everyone — it is in
      //         the nav, the footer and the comparison table, and it stays
      //         there. Second, `schedule_builder` IS in entitlements.ts at
      //         Commissioner, but the in-app league-aware version it gates is
      //         PLANNED, NOT BUILT: `find src/app -ipath "*schedule*"` in the
      //         app repo returns nothing. The entitlement exists ahead of the
      //         route. Do not restore this bullet until that route does.
      //     A bullet that only appears in marketing copy is not evidence that
      //     the feature exists; grep for the ROUTE or the gate. An entitlement
      //     in entitlements.ts is not evidence either — it can be reserved
      //     ahead of the feature, as schedule_builder is.
      //   • Never restate a lower tier's feature on a higher tier. The ladder
      //     line ("Everything in X") already carries it, and repeating it
      //     makes two adjacent cards look identical to a buyer.
      //   • Don't downgrade a bullet's wording below what the tier actually
      //     unlocks. Starter said "Basic trade analyzer" while entitlements.ts
      //     grants the full trade_analyzer — that pushes buyers to a higher
      //     tier for something they already had.
      //
      // Subscribe plan keys are `starter` | `league` | `commissioner` |
      // `dynasty` — see PlanKey in ~/code/gridironhq/src/lib/tier-presentation.ts
      // and VALID_PLANS in its src/app/subscribe/page.tsx. NOT the tier ids
      // used in this file.
      // ─────────────────────────────────────────────────────────────────────
      {
        id: "member",
        name: "League Member",
        price: 5.99,
        cadence: "/month, or $59/year",
        annualTotal: "$59/yr",
        description:
          "The step up for the manager who drafts to win. Adds the draft tools and championship math on top of everything in Starter.",
        features: [
          "Everything in Starter",
          "Draft Guide + live Draft Center",
          "Championship probability on every decision",
          "ARGUS Offseason Report + team grade",
        ],
        cta: {
          label: "Start Free Trial",
          href: "https://app.gridironhq.ai/subscribe?plan=league",
        },
        // Moved here from Commissioner 2026-08-27, on the actual numbers:
        // of active + trialing subscribers, four are on League Member and one
        // is on Commissioner. `featured` moves with `badge` deliberately —
        // they are two halves of one treatment (badge pill, orange card
        // border/glow, orange tier name, and the primary-button CTA in both
        // Pricing and FinalCTA). Splitting them would badge one card and
        // highlight a different one.
        featured: true,
        badge: "Most Popular",
      },
      {
        id: "pro",
        name: "Commissioner",
        price: 7.99,
        cadence: "/month, or $79/year",
        annualTotal: "$79/yr",
        description:
          "Everything a League Member gets, plus the tools for running the league itself — treasury and manager intel.",
        features: [
          "Everything in League Member",
          "League Treasury + dues tracking",
          "League Intel behavioral profiles",
        ],
        cta: {
          label: "Start Free Trial",
          href: "https://app.gridironhq.ai/subscribe?plan=commissioner",
        },
      },
      {
        id: "dynasty",
        name: "Dynasty Elite",
        price: 11.99,
        cadence: "/month, or $119/year",
        annualTotal: "$119/yr",
        description:
          "Built for the dynasty and keeper manager. Your league's complete history, its all-time analytics, and dynasty valuations on top of everything else.",
        features: [
          "Everything in Commissioner",
          "The Vault — full league history, H2H records, analytics",
          "Dynasty Power Rankings and Luck Index",
          "ARGUS historical league analysis",
        ],
        cta: {
          label: "Start Free Trial",
          href: "https://app.gridironhq.ai/subscribe?plan=dynasty",
        },
      },
    ] satisfies PricingTier[],
  },

  testimonials: {
    // Chris M.'s quote was removed 2026-08-27. It praised the trade analyzer
    // for "the exact impact" — the one to two decimal championship figure that
    // surface specifically withdrew (it now renders a directional Title
    // outlook). It contradicted both the product and /accuracy. Deliberately
    // NOT paraphrased: it is a real person's words. If it comes back it has to
    // come back as a new quote from him, about what the product does now.
    label: "Early Feedback",
    title: "What an Early Member Said",
    titleAccent: "Said",
    items: [
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
        question: "Is Pick'Em really free?",
        answer:
          "Yes. Pick'Em pools cost nothing, take no credit card, and don't run on a trial clock — you can run a pool all season without ever paying. You do need a free GridironHQ account to join a pool and make picks; an invite link lets you see the pool before you sign in. Commissioners get the whole thing free too: weekly slates, slate curation, invites, automatic settlement, standings, and the AI recap. You don't need to connect a fantasy league to use it. If your pool charges an entry fee, that's between you and your league — GridironHQ tracks who has paid but never holds or moves the money.",
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
          // Nav links render `hidden md:inline` with no mobile menu, so this
          // footer entry is the mobile-reachable path to /accuracy.
          { label: "Accuracy", href: "/accuracy" },
          // Nav is desktop-only with no mobile menu, so this is the
          // mobile-reachable path to the free Pick'Em product.
          { label: "Free Pick'Em Pools", href: "https://app.gridironhq.ai/pools" },
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
