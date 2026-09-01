# Product Marketing Context

**Document version:** v2
**Last updated:** 2026-08-31

> **Source of truth.** Tier contents in this file must match the tier definitions in the app's entitlements module (`~/code/gridironhq/src/lib/entitlements.ts` — `STARTER_FEATURES` and the cumulative lists above it). Prices, annual totals, and the "Most Popular" badge must match `siteConfig.pricing` in `src/config/site.ts`. When this file and either source disagree, this file is wrong; fix it here, never by copying it back to the site.

> Auto-drafted from the repo (`src/config/site.ts`, landing page components, live site headers). Sections marked **[UNVERIFIED]** were inferred and need Matt's correction — especially competitive landscape, customer language, and proof points, which have no source in the codebase.

## Product Overview
**One-liner:** The fantasy football advisor that actually knows your team.

**What it does:** GridironHQ is an AI advisory layer that sits on top of your existing fantasy league. It connects to Sleeper (full support) or imports an ESPN league, loads your actual roster, scoring format, record and playoff situation, and answers questions through ARGUS — a proprietary AI advisor. Every decision is expressed as championship probability impact rather than raw projected points.

**Product category:** Fantasy football AI advisory / league management tools. Customers search for it alongside FantasyPros, PFF, and dynasty-specific tooling.

**Product type:** SaaS subscription, monthly or annual billing per tier.

**Business model:** Four cumulative tiers; **Free is FREE** (no card, not a trial — the free tier, since 2026-08-31). Paid tiers carry a 14-day free trial, cancel any time. Each tier includes everything below it. **Names (2026-08-31 rename):** Free / Advisor / Commissioner / Front Office. The app's internal keys are unchanged (`starter` / `league_member` / `commissioner` / `dynasty_elite`) — never surface those, and never use the old names Starter, League Member, or Dynasty Elite in copy. Each name is its own explanation: Advisor is where ARGUS starts; Front Office is the analysis of your league's history.
- Free — $0: **The Vault — complete league history** (all-time standings, championships, H2H, milestone chases, CSV import, read-only share link), keeper calculator (is he worth the round he costs?), Pick'Em pools. THE RULE: free is computed from held data and never calls a model — anything AI is Advisor and up. Sleeper and ESPN support
- Advisor — $5.99/mo or $59/yr — *Most Popular*: + ARGUS personalized start/sit, trade analyzer (the full analyzer), waiver roster-fit scoring, player news with AI notes, Draft Guide and live Draft Center, championship probability on every decision, ARGUS Offseason Report and team grade (trade analyzer and waiver scoring are computed, not model-called — they sit here as deliberate packaging, not because the rule requires it)
- Commissioner — $7.99/mo or $79/yr: + League Treasury with dues tracking, League Intel behavioral profiles
- Front Office — $9.99/mo or $89/yr (repriced 2026-08-31 from $11.99/$119; existing Dynasty Elite subscribers keep their old price): + the analytics made from league history — Luck Index, Clutch Factor, Consistency Score, Dynasty Power Rankings, ARGUS historical league analysis. NOT the Vault's data (free since 2026-08-31: what happened is free, what to make of it is paid); NOT keeper tools (Free); NOT "career outcome models" or "rookie profiling" — those do not exist and were removed from the tier card 2026-08-27.

**Platform support (load-bearing — do not overstate):** Sleeper and ESPN. Site wording: "Connects to Sleeper and ESPN today. Yahoo isn't supported yet" — no date, because the Yahoo API approval isn't ours to grant. **CBS is not on the roadmap and must not appear as a promise anywhere.** The Vault works with Sleeper and ESPN leagues (ESPN Vault shipped 2026-08-30). The keeper calculator reads Sleeper draft history today.

**Free entry points:** interactive demo at /demo (no account), free schedule builder at /schedule-builder, ARGUS Offseason Report inside trial.

## Target Audience
**Target customers:** Serious, competitive fantasy football managers — explicitly *not* casual players. Skews commissioner, keeper, and dynasty.

**Decision-makers:** The individual manager buys for themselves. The commissioner is the high-value persona: they make platform decisions for 10–12 people and carry the league's administrative burden.

**Primary use case:** Get roster-specific advice instead of the generic rankings every other tool serves to millions of people identically.

**Jobs to be done:**
- Tell me what *my* team should do, given *my* league — not what the average team should do
- Give me a defensible reason for a decision (championship probability delta, not vibes)
- Take the commissioner admin load off me — dues tracking, schedule building, league history

**Use cases:** Weekly start/sit; trade evaluation and negotiation; waiver targeting; draft prep and mock drafts; offseason roster assessment; multi-league portfolio management; league dues collection; league history and all-time records.

## Personas
| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| Competitive manager | Winning, edge, precision | Every tool gives the same advice to everyone | Advice built around your exact roster |
| Commissioner | League running smoothly, staying trusted | Chasing Venmo payments, no paper trail, manual everything | Treasury ledger + schedule builder + league history |
| Keeper/dynasty manager | Multi-year roster building, keeper cost, continuity | Tools are built for redraft and one season at a time | Keeper calculator and The Vault on the Free plan; Front Office adds the analytics — Dynasty Power Rankings, Luck Index, ARGUS history analysis |

## Problems & Pain Points
**Core problem:** Existing platforms were built for casual players. Serious managers get generic rankings that ignore their roster, projections without context, and zero financial/administrative tooling.

**Why alternatives fall short:**
- FantasyPros/PFF tell millions of people the same thing — no knowledge of your bench, record, or playoff position
- A projection of "14 points" says nothing about what it does to championship odds
- No competitor offers league behavioral analytics, dues tracking, or all-time league history

**What it costs them:** Losing winnable weeks to bad lineup calls; losing trades because they can't read the other manager; commissioner hours spent chasing payments and rebuilding records by hand.

**Emotional tension:** Being underserved despite taking the game seriously. For commissioners specifically: being the one person responsible when league records, money, or history go missing.

## Competitive Landscape
**[UNVERIFIED — from landing-page comparison table, not customer research]**

**Direct:** FantasyPros ($8.99/mo), PFF ($9.99/mo) — advice is identical for every subscriber, no roster personalization, no championship-probability framing, no league history or analytics.

**Secondary:** The host platform's own tools (Sleeper, ESPN, Yahoo) — free and already in-hand, but shallow advisory value and, as the 2026 NFL Fantasy shutdown proved, no guarantee your history survives.

**Indirect:** Spreadsheets, Discord/group-chat consensus, and "just knowing ball." Free, trusted, socially reinforced — and the default GridironHQ actually has to displace.

## Differentiation
**Key differentiators:**
- ARGUS — proprietary AI advisor with the actual roster loaded
- Decision EV Framework — championship probability delta on every lineup/trade/waiver choice
- League Intel — AI behavioral profiles of every manager in the league (accept rates, FAAB patterns, hoarding tendencies)
- The Vault — all-time standings, H2H, championship history, milestone chases, CSV import, read-only share link — FREE for every league (the four analytics metrics on top of it are Front Office)
- League Treasury — dues directory and ledger that never holds or moves money
- Works on top of the existing league; no migration required

**How we do it differently:** Advisory layer, not a replacement platform. League continuity and history are treated as first-class product surface, not an afterthought.

**Why that's better:** No switching cost for the other 11 managers, and the league's history becomes an asset instead of something a platform can delete.

## Objections
| Objection | Response |
|-----------|----------|
| "Do I have to move my league?" | No. GridironHQ layers on top — Sleeper connects, ESPN imports. League stays where it is. |
| "Another subscription?" | Free to start; paid plans $5.99–$9.99/mo or $59–$89/yr, 14-day trial with no card. Cheaper than FantasyPros or PFF. |
| "Is my league's money safe?" | Treasury is a directory and ledger only. GridironHQ never holds, moves, escrows, or pays out money. |
| "My league is on Yahoo/CBS" | Not supported yet — say so plainly. Do not imply otherwise. |

**Anti-persona:** The casual one-league redraft player who checks in on Sunday morning. Not underserved by free tools, won't pay for precision.

## Switching Dynamics
**Push:** Generic advice that ignores their roster; commissioner admin drudgery; **and as of July 2026, platform shutdowns that destroy league history.**

**Pull:** Roster-specific AI; championship probability as a decision currency; league history that survives a platform move.

**Habit:** The league has been on one platform for years; the group chat and the spreadsheet already "work"; nobody wants to teach 11 people a new tool.

**Anxiety:** Will an AI actually know my team, or is this a wrapper? Is my league's money involved? Will this survive next season?

## Customer Language
**[UNVERIFIED — needs real customer quotes; below is inferred from site copy]**

**Words to use:** commissioner, keeper, dynasty, championship odds, roster, league history, all-time records, continuity, your team.

**Words to avoid:** anything implying Yahoo/CBS support; anything implying GridironHQ holds league money; expired promotions or deadlines; "guaranteed" outcomes.

**Glossary:**
| Term | Meaning |
|------|---------|
| ARGUS | GridironHQ's proprietary AI advisory engine (renamed from SCOUT) |
| The Vault | League history module, free — all-time standings, H2H, championship history, chases, share link. The 4 analytics metrics on top are Front Office |
| Advisor | The first paid tier — where ARGUS starts (internal key `league_member`; formerly "League Member") |
| Front Office | The top tier — the analysis of your league's history (internal key `dynasty_elite`; formerly "Dynasty Elite", repriced 2026-08-31) |
| Decision EV Framework | Every decision expressed as championship probability impact |
| League Intel | AI behavioral profiles of the managers in your league |
| Treasury | Dues directory + ledger; never holds or moves money |
| Offseason Report | Personalized A–F team grade, strengths/concerns, spotlights, draft strategy |

## Brand Voice
**Tone:** Confident, blunt, anti-fluff. Talks to someone who already knows the game — never explains what a waiver wire is.

**Style:** Direct and specific. Concrete numbers over adjectives ("increases your championship odds by 2.1%"). Short declaratives. Visual language is Bebas Neue caps, navy + orange, stadium-grid texture.

**Personality:** Sharp, competitive, precise, honest, unimpressed by hype.

**Truth constraint (standing):** This site went through a truth pass in August 2026 removing false claims, expired dates, and dead offers. Never ship a capability claim that isn't in `src/config/site.ts` or verified in the app. Roadmap items must be labeled as roadmap.

## Proof Points
**Metrics on site:** 14-day free trial (no card); 9 feature modules; $3.99 starting price; A–F ARGUS team grade.

**Customers:** No logos. One early-member testimonial (Jake R., ESPN 10-team PPR). Chris M.'s quote was removed 2026-08-27 — it praised a decimal-precision championship figure the product no longer shows; do not paraphrase it back. Framed honestly as "Early Feedback," not scale.

**Value themes:**
| Theme | Proof |
|-------|-------|
| It knows *your* team | Roster/scoring/record imported; every ARGUS answer roster-specific |
| Decisions in championship terms | Decision EV Framework, playoff probability modeling |
| Nobody else has this | League Intel behavioral profiles |
| Your history is an asset | The Vault: all-time standings, H2H, championship history, 4 metrics |
| No migration tax | Layers on Sleeper/ESPN; league stays put |

## Goals
**Business goal:** Paid trial starts during the 2026 draft season, with commissioners as the wedge (one commissioner brings 10–12 managers).

**Conversion action:** Start the 14-day free trial (`app.gridironhq.ai/subscribe?plan=…`). Soft conversions: the no-account demo and the free schedule builder.

**Current metrics:** Not known — no analytics data in repo. Vercel Analytics is installed.

**Deployment context:** Marketing site is its own Vercel project, auto-deploys on push to `main`. Canonical host is `www.gridironhq.ai` (apex 307-redirects to www). Blog (/blog), sitemap.xml, robots.txt, and per-page OG images exist as of 2026-08-31; a public ESPN connection guide lives at /help/connect-espn.

## Changelog
*Newest first. One line per revision: what changed and why.*
- v3 (2026-08-31) — Tier rename and Front Office repricing: Starter → Free, League Member → Advisor, Dynasty Elite → Front Office at $9.99/$89 (was $11.99/$119). Internal keys unchanged; each card carries a line explaining its name; FAQ says what each plan is for.
- v2 (2026-08-31) — Reconciled to `site.ts` and `entitlements.ts`: four tiers (League Member was missing), annuals $39/$59/$79/$119, badge on League Member, keeper calculator on Starter, phantom Dynasty features struck, Yahoo/CBS wording aligned with the public site, Vault on ESPN, one testimonial, blog/sitemap/OG now exist. Added the source-of-truth rule at the top.
- v1 (2026-08-14) — Initial context, auto-drafted from `src/config/site.ts` and landing components ahead of the NFL-shutdown blog post. Competitive landscape, customer language, and proof points flagged UNVERIFIED — no customer research in repo.
