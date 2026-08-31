"use client";

// Public NFL bye-week checker — the second free tool after /schedule-builder,
// and deliberately the same chrome: wordmark link, "Free Tool" eyebrow, card
// sections, ARGUS CTA at the bottom. All data comes from the committed
// snapshot at src/data/nfl-byes-2026.json (generated from the app's nfl_byes
// table); nothing here fetches at runtime. Client-side and stateless on
// purpose: no account, no saving, no URL state.

import Link from "next/link";
import { useMemo, useState } from "react";
import byeData from "@/data/nfl-byes-2026.json";

type Team = { code: string; name: string; mascot: string; bye: number };
type WeekRow = { week: number; count: number; teams: string[] };

const TEAMS: Team[] = byeData.teams;
const WEEKS: WeekRow[] = byeData.weeks;
const HEAVIEST = new Set<number>(byeData.heaviestWeeks);
const SEASON = byeData.season;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Deterministic UTC date rendering — toLocaleDateString would prerender in
// the build machine's locale and can differ from the visitor's at hydration.
function formatUtcDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

const teamByCode = new Map(TEAMS.map((t) => [t.code, t]));

function matchesQuery(team: Team, q: string): boolean {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  return (
    team.name.toLowerCase().includes(needle) ||
    team.mascot.toLowerCase().includes(needle) ||
    team.code.toLowerCase().includes(needle)
  );
}

export default function ByeWeekChecker() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const visibleTeams = useMemo(
    () => TEAMS.filter((t) => matchesQuery(t, query)),
    [query],
  );

  // Selected teams grouped by bye week, worst week first.
  const overlap = useMemo(() => {
    const byWeek = new Map<number, Team[]>();
    for (const code of selected) {
      const team = teamByCode.get(code);
      if (!team) continue;
      const list = byWeek.get(team.bye) ?? [];
      list.push(team);
      byWeek.set(team.bye, list);
    }
    return [...byWeek.entries()]
      .map(([week, teams]) => ({ week, teams }))
      .sort((a, b) => b.teams.length - a.teams.length || a.week - b.week);
  }, [selected]);

  const worst = overlap[0];

  function toggleTeam(code: string) {
    setSelected((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
    );
  }

  return (
    <main className="min-h-screen px-6 py-12 md:py-16 section-grid-bg">
      <div
        aria-hidden="true"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        <Link
          href="/"
          className="font-display text-[28px] tracking-[2px] no-underline block text-center mb-8"
        >
          <span className="text-orange">GRIDIRON</span>
          <span className="text-text">HQ</span>
        </Link>

        <header className="text-center mb-10">
          <p className="text-text-muted text-xs uppercase tracking-[2px] font-condensed font-bold mb-3">
            Free Tool
          </p>
          <h1 className="font-display text-[clamp(32px,5vw,52px)] uppercase tracking-[1px] leading-tight mb-3">
            NFL Bye Weeks
            <br />
            <span className="text-orange">{SEASON}</span>
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            Every {SEASON} bye in one place. Search your team, see which weeks
            hit hardest, and pick the teams your fantasy roster leans on to
            spot the weeks you&apos;re thin. No signup required.
          </p>
        </header>

        {byeData.warnings.length > 0 && (
          <div
            role="alert"
            className="bg-bg-card border border-red/60 rounded-2xl p-4 mb-6 text-sm text-red"
          >
            <p className="font-bold uppercase tracking-[1px] font-condensed mb-1">
              Data warnings
            </p>
            <ul className="list-disc pl-5">
              {byeData.warnings.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        )}

        {/* ── When is my team's bye? ──────────────────────────────────── */}
        <section
          className="bg-bg-card border border-border rounded-2xl p-6 md:p-8 mb-6"
          aria-labelledby="find-heading"
        >
          <h2
            id="find-heading"
            className="font-display text-[clamp(22px,3vw,32px)] uppercase tracking-[1px] mb-1"
          >
            When Is <span className="text-orange">My Team&apos;s</span> Bye?
          </h2>
          <p className="text-text-muted text-sm mb-5">
            Type a team, then tap to add it to your roster check below.
          </p>

          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 32 teams — “Lions”, “KC”, “Eagles”…"
            aria-label="Search NFL teams"
            className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-sm text-text placeholder:text-text-faint focus:outline-none focus:border-orange mb-5"
          />

          {visibleTeams.length === 0 ? (
            <p className="text-text-muted text-sm">
              No team matches “{query.trim()}”.
            </p>
          ) : (
            <ul className="list-none grid grid-cols-2 md:grid-cols-4 gap-2">
              {visibleTeams.map((team) => {
                const isSelected = selected.includes(team.code);
                return (
                  <li key={team.code}>
                    <button
                      type="button"
                      onClick={() => toggleTeam(team.code)}
                      aria-pressed={isSelected}
                      className={`w-full text-left rounded-lg border px-3 py-2.5 transition-colors cursor-pointer ${
                        isSelected
                          ? "border-orange bg-orange/10"
                          : "border-border bg-bg-card-2 hover:border-orange/60"
                      }`}
                    >
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="text-sm font-medium text-text truncate">
                          {team.mascot}
                        </span>
                        <span className="text-[11px] font-condensed font-bold uppercase tracking-[0.5px] text-text-faint">
                          {team.code}
                        </span>
                      </span>
                      <span
                        className={`block text-[13px] ${isSelected ? "text-orange font-bold" : "text-text-muted"}`}
                      >
                        Bye: Week {team.bye}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* ── Roster overlap ──────────────────────────────────────────── */}
        <section
          className="bg-bg-card border border-border rounded-2xl p-6 md:p-8 mb-6"
          aria-labelledby="overlap-heading"
        >
          <div className="flex items-baseline justify-between gap-4 mb-1">
            <h2
              id="overlap-heading"
              className="font-display text-[clamp(22px,3vw,32px)] uppercase tracking-[1px]"
            >
              Where Is <span className="text-orange">Your Roster</span> Thin?
            </h2>
            {selected.length > 0 && (
              <button
                type="button"
                onClick={() => setSelected([])}
                className="text-xs font-condensed font-bold uppercase tracking-[0.5px] text-text-muted hover:text-orange transition-colors cursor-pointer"
              >
                Clear ({selected.length})
              </button>
            )}
          </div>
          <p className="text-text-muted text-sm mb-5">
            Select the teams your starters play for — a plain bye table
            can&apos;t tell you that three of them sit out the same week.
          </p>

          {selected.length === 0 ? (
            <p className="text-text-muted text-sm border border-dashed border-border rounded-lg px-4 py-6 text-center">
              Pick teams above to check your bye-week overlap.
            </p>
          ) : (
            <>
              {worst && worst.teams.length >= 2 ? (
                <p className="text-sm mb-4">
                  <span className="font-bold text-red">
                    Your worst week is Week {worst.week}
                  </span>{" "}
                  — {worst.teams.length} of your {selected.length} teams are
                  off at once.
                </p>
              ) : (
                <p className="text-sm mb-4 text-green">
                  No overlap — no two of your {selected.length} teams share a
                  bye week.
                </p>
              )}
              <ul className="list-none flex flex-col gap-2">
                {overlap.map(({ week, teams }) => (
                  <li
                    key={week}
                    className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-lg border px-4 py-3 ${
                      teams.length >= 3
                        ? "border-red/60 bg-red/5"
                        : teams.length === 2
                          ? "border-orange/60 bg-orange/5"
                          : "border-border bg-bg-card-2"
                    }`}
                  >
                    <span className="font-display text-lg tracking-[1px] uppercase">
                      Week {week}
                    </span>
                    <span
                      className={`text-[11px] font-condensed font-bold uppercase tracking-[0.5px] ${
                        teams.length >= 3
                          ? "text-red"
                          : teams.length === 2
                            ? "text-orange"
                            : "text-text-faint"
                      }`}
                    >
                      {teams.length >= 2
                        ? `${teams.length} teams out`
                        : "1 team out"}
                    </span>
                    <span className="text-sm text-text-muted">
                      {teams.map((t) => t.mascot).join(", ")}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* What this page is not — once, plainly. */}
          <p className="text-[13px] text-text-muted border-t border-border-soft mt-6 pt-4">
            This checker only knows which NFL teams are off each week — it
            doesn&apos;t know your roster, your starting slots, or whether your
            bench covers a hole. GridironHQ&apos;s in-app bye coverage does:
            connect your Sleeper or ESPN league and it flags the exact weeks
            you can&apos;t field a legal lineup.{" "}
            <Link href="/#pricing" className="text-orange no-underline hover:text-orange-2">
              See the full version →
            </Link>
          </p>
        </section>

        {/* ── Week-by-week view ───────────────────────────────────────── */}
        <section
          className="bg-bg-card border border-border rounded-2xl p-6 md:p-8 mb-6"
          aria-labelledby="weeks-heading"
        >
          <h2
            id="weeks-heading"
            className="font-display text-[clamp(22px,3vw,32px)] uppercase tracking-[1px] mb-1"
          >
            Week by <span className="text-orange">Week</span>
          </h2>
          <p className="text-text-muted text-sm mb-5">
            Byes run Week {Math.min(...byeData.byeWeeks)}–
            {Math.max(...byeData.byeWeeks)} in {SEASON}. Week{" "}
            {byeData.heaviestWeeks.join(" and ")} is the one to plan around —
            six teams sit at once.
          </p>

          <ul className="list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {WEEKS.map(({ week, count, teams }) => {
              const heaviest = HEAVIEST.has(week);
              return (
                <li
                  key={week}
                  className={`rounded-lg border px-4 py-3 ${
                    heaviest
                      ? "border-orange bg-orange/5"
                      : count > 0
                        ? "border-border bg-bg-card-2"
                        : "border-border-soft"
                  }`}
                >
                  <span className="flex items-baseline justify-between gap-2 mb-0.5">
                    <span
                      className={`font-display text-lg tracking-[1px] uppercase ${count === 0 ? "text-text-faint" : "text-text"}`}
                    >
                      Week {week}
                    </span>
                    <span
                      className={`text-[11px] font-condensed font-bold uppercase tracking-[0.5px] ${
                        heaviest
                          ? "text-orange"
                          : count > 0
                            ? "text-text-muted"
                            : "text-text-faint"
                      }`}
                    >
                      {heaviest
                        ? `${count} teams — heaviest`
                        : count > 0
                          ? `${count} ${count === 1 ? "team" : "teams"}`
                          : "No byes"}
                    </span>
                  </span>
                  {count > 0 && (
                    <span className="text-[13px] text-text-muted">
                      {teams
                        .map((code) => teamByCode.get(code)?.mascot ?? code)
                        .join(", ")}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        {/* ── Product CTA — same block the schedule builder closes with ── */}
        <div className="mt-12 bg-bg-card border border-border rounded-2xl p-8 text-center">
          <h2 className="font-display text-[clamp(22px,3vw,32px)] uppercase tracking-[1px] mb-3">
            Want <span className="text-orange">ARGUS</span> watching your bye
            weeks all season?
          </h2>
          <p className="text-text-muted mb-6 max-w-xl mx-auto">
            GridironHQ&apos;s AI advisor knows your actual roster — it flags
            the weeks you can&apos;t fill a lineup and tells you who to start
            instead. 14-day free trial, no credit card required.
          </p>
          <Link href="/#pricing" className="btn btn-primary">
            Start Your Free Trial →
          </Link>
        </div>

        <p className="text-center text-xs text-text-faint mt-8">
          {SEASON} bye data generated {formatUtcDate(byeData.generatedAt)} ·
          schedule data fetched {formatUtcDate(byeData.source.byesFetchedAt)} ·
          source: NFL schedule via SportsDataIO
        </p>
      </div>
    </main>
  );
}
