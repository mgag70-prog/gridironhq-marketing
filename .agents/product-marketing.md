# Product Marketing Context

**Document version:** v1
**Last updated:** 2026-08-14

> Auto-drafted from the repo (`src/config/site.ts`, landing page components, live site headers). Sections marked **[UNVERIFIED]** were inferred and need Matt's correction — especially competitive landscape, customer language, and proof points, which have no source in the codebase.

## Product Overview
**One-liner:** The fantasy football advisor that actually knows your team.

**What it does:** GridironHQ is an AI advisory layer that sits on top of your existing fantasy league. It connects to Sleeper (full support) or imports an ESPN league, loads your actual roster, scoring format, record and playoff situation, and answers questions through ARGUS — a proprietary AI advisor. Every decision is expressed as championship probability impact rather than raw projected points.

**Product category:** Fantasy football AI advisory / league management tools. Customers search for it alongside FantasyPros, PFF, and dynasty-specific tooling.

**Product type:** SaaS subscription, annual-billed tiers.

**Business model:** Three tiers, 14-day free trial, no credit card to start, cancel any time.
- Starter — $3.99/mo ($47.88/yr): ARGUS start/sit, waiver roster-fit scoring, basic trade analyzer, player news
- Commissioner — $7.99/mo ($95.88/yr) — *Most Popular*: + championship EV on all decisions, League Intel, full trade analyzer, Draft Center, League Treasury, playoff modeling
- Dynasty Elite — $11.99/mo ($143.88/yr): + dynasty rankings & valuations, career outcome models, rookie profiling, keeper value engine, multi-season behavioral analytics

**Platform support (load-bearing — do not overstate):** Sleeper fully supported. ESPN leagues can be imported today. **Yahoo and CBS are planned and NOT available.** The Vault's history walk is described as connecting to *Sleeper* leagues specifically (`site.ts:438`).

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
| Keeper/dynasty manager | Multi-year roster building, keeper cost, continuity | Tools are built for redraft and one season at a time | Dynasty tier: career outcome models, keeper value engine, The Vault |

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
- The Vault — all-time standings, H2H, championship history, Luck Index, Clutch Factor, Consistency Score, Dynasty Power Rankings
- League Treasury — dues directory and ledger that never holds or moves money
- Works on top of the existing league; no migration required

**How we do it differently:** Advisory layer, not a replacement platform. League continuity and history are treated as first-class product surface, not an afterthought.

**Why that's better:** No switching cost for the other 11 managers, and the league's history becomes an asset instead of something a platform can delete.

## Objections
| Objection | Response |
|-----------|----------|
| "Do I have to move my league?" | No. GridironHQ layers on top — Sleeper connects, ESPN imports. League stays where it is. |
| "Another subscription?" | $3.99–$11.99/mo, annual billing, 14-day trial with no card. Cheaper than FantasyPros or PFF. |
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
| The Vault | League history module — all-time standings, H2H, championship history, 4 analytics metrics |
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

**Customers:** No logos. Two early-member testimonials (Chris M., 8-year commissioner, 12-team dynasty; Jake R., ESPN 10-team PPR). Framed honestly as "Early Feedback," not scale.

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

**Deployment context:** Marketing site is its own Vercel project, auto-deploys on push to `main`. Canonical host is `www.gridironhq.ai` (apex 307-redirects to www). No blog, sitemap, robots.txt, or OG image exists yet as of 2026-08-14.

## Changelog
*Newest first. One line per revision: what changed and why.*
- v1 (2026-08-14) — Initial context, auto-drafted from `src/config/site.ts` and landing components ahead of the NFL-shutdown blog post. Competitive landscape, customer language, and proof points flagged UNVERIFIED — no customer research in repo.
