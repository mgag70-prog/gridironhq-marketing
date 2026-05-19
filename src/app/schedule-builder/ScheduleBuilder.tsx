"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Matchup = {
  week: number;
  home: number;
  away: number;
  pinned: boolean;
};

type Pin = {
  id: string;
  week: number;
  teamA: number;
  teamB: number;
};

type Constraints = {
  maxMeetings: 1 | 2;
  noBackToBack: boolean;
  balanceHomeAway: boolean;
};

type PlayoffGame = {
  round: number;
  weekLabel: string;
  seedA: number | null;
  seedB: number | null;
  label: string;
};

const TEAM_OPTIONS = [8, 10, 12, 14] as const;
const WEEK_OPTIONS = [10, 11, 12, 13, 14] as const;
const PLAYOFF_OPTIONS = [2, 4, 6] as const;

function pairKey(a: number, b: number): string {
  return a < b ? `${a}-${b}` : `${b}-${a}`;
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type GenerateInput = {
  teams: number;
  weeks: number;
  pins: Pin[];
  constraints: Constraints;
};

type GenerateResult =
  | { ok: true; schedule: Matchup[][] }
  | { ok: false; error: string };

function generateSchedule(input: GenerateInput): GenerateResult {
  const { teams, weeks, pins, constraints } = input;

  if (teams % 2 !== 0) {
    return { ok: false, error: "Team count must be even." };
  }
  const gamesPerWeek = teams / 2;

  if (constraints.maxMeetings === 1 && weeks > teams - 1) {
    return {
      ok: false,
      error: `With ${teams} teams and 1x max meetings, the maximum number of regular-season weeks is ${
        teams - 1
      }. Either raise max meetings to 2x or reduce weeks.`,
    };
  }

  for (const pin of pins) {
    if (pin.teamA === pin.teamB) {
      return {
        ok: false,
        error: `Pinned matchup in week ${pin.week} has a team playing itself.`,
      };
    }
    if (pin.week < 1 || pin.week > weeks) {
      return {
        ok: false,
        error: `Pinned matchup is set for week ${pin.week}, which is outside the ${weeks}-week regular season.`,
      };
    }
  }

  const seenPerWeek = new Map<number, Set<number>>();
  for (const pin of pins) {
    const set = seenPerWeek.get(pin.week) ?? new Set<number>();
    if (set.has(pin.teamA) || set.has(pin.teamB)) {
      return {
        ok: false,
        error: `Conflict in week ${pin.week}: a team is pinned to more than one matchup.`,
      };
    }
    set.add(pin.teamA);
    set.add(pin.teamB);
    seenPerWeek.set(pin.week, set);
  }

  const pinPairCount = new Map<string, number>();
  for (const pin of pins) {
    const k = pairKey(pin.teamA, pin.teamB);
    pinPairCount.set(k, (pinPairCount.get(k) ?? 0) + 1);
  }
  for (const [k, count] of pinPairCount.entries()) {
    if (count > constraints.maxMeetings) {
      const [a, b] = k.split("-").map(Number);
      return {
        ok: false,
        error: `Team ${a} and Team ${b} are pinned ${count} times but max meetings is ${constraints.maxMeetings}x.`,
      };
    }
  }

  if (constraints.noBackToBack) {
    const pinsByPair = new Map<string, number[]>();
    for (const pin of pins) {
      const k = pairKey(pin.teamA, pin.teamB);
      const arr = pinsByPair.get(k) ?? [];
      arr.push(pin.week);
      pinsByPair.set(k, arr);
    }
    for (const [k, ws] of pinsByPair.entries()) {
      ws.sort((a, b) => a - b);
      for (let i = 1; i < ws.length; i++) {
        if (ws[i] - ws[i - 1] === 1) {
          const [a, b] = k.split("-").map(Number);
          return {
            ok: false,
            error: `Pinned matchups for Team ${a} vs Team ${b} are in consecutive weeks (${ws[i - 1]} and ${ws[i]}), which violates the no back-to-back rule.`,
          };
        }
      }
    }
  }

  const ATTEMPTS = 250;
  for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
    const rand = mulberry32(0xc0ffee + attempt * 1009);
    const result = tryBuild(teams, weeks, gamesPerWeek, pins, constraints, rand);
    if (result) {
      const finalized = assignHomeAway(result, teams, constraints, rand, pins);
      return { ok: true, schedule: finalized };
    }
  }

  return {
    ok: false,
    error:
      "Could not generate a valid schedule with these constraints. Try relaxing rules — raise max meetings to 2x, remove some pinned matchups, or disable back-to-back prevention.",
  };
}

function tryBuild(
  teams: number,
  weeks: number,
  gamesPerWeek: number,
  pins: Pin[],
  constraints: Constraints,
  rand: () => number,
): Matchup[][] | null {
  const weekPairs: { a: number; b: number; pinned: boolean }[][] = Array.from(
    { length: weeks },
    () => [],
  );
  const weekUsed: Set<number>[] = Array.from(
    { length: weeks },
    () => new Set<number>(),
  );
  const pairCount = new Map<string, number>();

  for (const pin of pins) {
    const wIdx = pin.week - 1;
    weekPairs[wIdx].push({ a: pin.teamA, b: pin.teamB, pinned: true });
    weekUsed[wIdx].add(pin.teamA);
    weekUsed[wIdx].add(pin.teamB);
    const k = pairKey(pin.teamA, pin.teamB);
    pairCount.set(k, (pairCount.get(k) ?? 0) + 1);
  }

  const allTeams = Array.from({ length: teams }, (_, i) => i + 1);

  function fillWeek(wIdx: number): boolean {
    if (weekPairs[wIdx].length === gamesPerWeek) return true;

    const remaining = allTeams.filter((t) => !weekUsed[wIdx].has(t));
    if (remaining.length < 2) return false;

    const shuffled = shuffle(remaining, rand);
    const t = shuffled[0];
    const candidates = shuffle(
      shuffled.slice(1).filter((c) => {
        const k = pairKey(t, c);
        if ((pairCount.get(k) ?? 0) >= constraints.maxMeetings) return false;
        if (constraints.noBackToBack) {
          if (wIdx > 0 && weekHasPair(weekPairs[wIdx - 1], t, c)) return false;
          if (
            wIdx < weeks - 1 &&
            weekHasPair(weekPairs[wIdx + 1], t, c)
          )
            return false;
        }
        return true;
      }),
      rand,
    );

    for (const c of candidates) {
      const k = pairKey(t, c);
      weekPairs[wIdx].push({ a: t, b: c, pinned: false });
      weekUsed[wIdx].add(t);
      weekUsed[wIdx].add(c);
      pairCount.set(k, (pairCount.get(k) ?? 0) + 1);

      if (fillWeek(wIdx)) return true;

      weekPairs[wIdx].pop();
      weekUsed[wIdx].delete(t);
      weekUsed[wIdx].delete(c);
      pairCount.set(k, (pairCount.get(k) ?? 1) - 1);
    }

    return false;
  }

  const weekOrder = shuffle(
    Array.from({ length: weeks }, (_, i) => i),
    rand,
  );

  for (const wIdx of weekOrder) {
    if (!fillWeek(wIdx)) return null;
  }

  const result: Matchup[][] = Array.from({ length: weeks }, () => []);
  for (let w = 0; w < weeks; w++) {
    for (const p of weekPairs[w]) {
      result[w].push({
        week: w + 1,
        home: p.a,
        away: p.b,
        pinned: p.pinned,
      });
    }
  }
  return result;
}

function weekHasPair(
  pairs: { a: number; b: number }[],
  x: number,
  y: number,
): boolean {
  return pairs.some(
    (p) => (p.a === x && p.b === y) || (p.a === y && p.b === x),
  );
}

function assignHomeAway(
  schedule: Matchup[][],
  teams: number,
  constraints: Constraints,
  rand: () => number,
  pins: Pin[],
): Matchup[][] {
  if (!constraints.balanceHomeAway) {
    return schedule.map((week) =>
      week.map((m) => {
        if (m.pinned) return m;
        return rand() < 0.5 ? m : { ...m, home: m.away, away: m.home };
      }),
    );
  }

  const homeCount = new Array(teams + 1).fill(0);
  const pinnedSet = new Set<string>();
  for (const pin of pins) {
    pinnedSet.add(`${pin.week}-${pairKey(pin.teamA, pin.teamB)}`);
  }

  for (const week of schedule) {
    for (const m of week) {
      if (m.pinned) homeCount[m.home]++;
    }
  }

  for (const week of schedule) {
    const order = shuffle(week, rand);
    for (const m of order) {
      if (m.pinned) continue;
      if (homeCount[m.home] > homeCount[m.away]) {
        const tmp = m.home;
        m.home = m.away;
        m.away = tmp;
      } else if (
        homeCount[m.home] === homeCount[m.away] &&
        rand() < 0.5
      ) {
        const tmp = m.home;
        m.home = m.away;
        m.away = tmp;
      }
      homeCount[m.home]++;
    }
  }

  return schedule;
}

function buildPlayoffs(
  teams: number,
  playoffTeams: number,
  regSeasonWeeks: number,
): PlayoffGame[] {
  const games: PlayoffGame[] = [];
  let weekIdx = regSeasonWeeks + 1;

  if (playoffTeams === 2) {
    games.push({
      round: 1,
      weekLabel: `Week ${weekIdx}`,
      seedA: 1,
      seedB: 2,
      label: "Championship",
    });
    return games;
  }

  if (playoffTeams === 4) {
    games.push({
      round: 1,
      weekLabel: `Week ${weekIdx}`,
      seedA: 1,
      seedB: 4,
      label: "Semifinal",
    });
    games.push({
      round: 1,
      weekLabel: `Week ${weekIdx}`,
      seedA: 2,
      seedB: 3,
      label: "Semifinal",
    });
    weekIdx++;
    games.push({
      round: 2,
      weekLabel: `Week ${weekIdx}`,
      seedA: null,
      seedB: null,
      label: "Championship",
    });
    return games;
  }

  // 6 teams: top 2 seeds get bye
  games.push({
    round: 1,
    weekLabel: `Week ${weekIdx}`,
    seedA: 3,
    seedB: 6,
    label: "Wild Card",
  });
  games.push({
    round: 1,
    weekLabel: `Week ${weekIdx}`,
    seedA: 4,
    seedB: 5,
    label: "Wild Card",
  });
  weekIdx++;
  games.push({
    round: 2,
    weekLabel: `Week ${weekIdx}`,
    seedA: 1,
    seedB: null,
    label: "Semifinal — 1 seed vs lowest remaining",
  });
  games.push({
    round: 2,
    weekLabel: `Week ${weekIdx}`,
    seedA: 2,
    seedB: null,
    label: "Semifinal — 2 seed vs higher remaining",
  });
  weekIdx++;
  games.push({
    round: 3,
    weekLabel: `Week ${weekIdx}`,
    seedA: null,
    seedB: null,
    label: "Championship",
  });
  // suppress unused-var warning in some configurations
  void teams;
  return games;
}

function toCsv(
  schedule: Matchup[][],
  playoffs: PlayoffGame[],
  leagueName: string,
): string {
  const rows: string[][] = [];
  if (leagueName) rows.push([`League: ${leagueName}`]);
  rows.push(["Week", "Home", "Away", "Pinned"]);
  for (const week of schedule) {
    for (const m of week) {
      rows.push([
        String(m.week),
        `Team ${m.home}`,
        `Team ${m.away}`,
        m.pinned ? "Yes" : "",
      ]);
    }
  }
  rows.push([]);
  rows.push(["Playoffs"]);
  rows.push(["Week", "Round", "Matchup", "Seed A", "Seed B"]);
  for (const g of playoffs) {
    rows.push([
      g.weekLabel,
      `Round ${g.round}`,
      g.label,
      g.seedA ? `Seed ${g.seedA}` : "TBD",
      g.seedB ? `Seed ${g.seedB}` : "TBD",
    ]);
  }
  return rows
    .map((r) => r.map((v) => (v.includes(",") ? `"${v}"` : v)).join(","))
    .join("\n");
}

type Step = 1 | 2 | 3;

export default function ScheduleBuilder() {
  const [teams, setTeams] = useState<number>(12);
  const [weeks, setWeeks] = useState<number>(13);
  const [playoffTeams, setPlayoffTeams] = useState<number>(4);
  const [leagueName, setLeagueName] = useState<string>("");

  const [pins, setPins] = useState<Pin[]>([]);
  const [pinWeek, setPinWeek] = useState<number>(1);
  const [pinTeamA, setPinTeamA] = useState<number>(1);
  const [pinTeamB, setPinTeamB] = useState<number>(2);

  const [maxMeetings, setMaxMeetings] = useState<1 | 2>(1);
  const [noBackToBack, setNoBackToBack] = useState<boolean>(true);
  const [balanceHomeAway, setBalanceHomeAway] = useState<boolean>(true);

  const [step, setStep] = useState<Step>(1);
  const [schedule, setSchedule] = useState<Matchup[][] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState<boolean>(false);
  const [expandedTeam, setExpandedTeam] = useState<number | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [printTeam, setPrintTeam] = useState<number | null>(null);
  const [showTeamMenu, setShowTeamMenu] = useState<boolean>(false);

  const playoffs = useMemo(
    () => (schedule ? buildPlayoffs(teams, playoffTeams, weeks) : []),
    [schedule, teams, playoffTeams, weeks],
  );

  const pinConflicts = useMemo(() => {
    const issues: string[] = [];
    const byWeek = new Map<number, Set<number>>();
    for (const pin of pins) {
      if (pin.teamA === pin.teamB) {
        issues.push(`Week ${pin.week}: team cannot play itself.`);
        continue;
      }
      const set = byWeek.get(pin.week) ?? new Set();
      if (set.has(pin.teamA))
        issues.push(`Week ${pin.week}: Team ${pin.teamA} pinned twice.`);
      if (set.has(pin.teamB))
        issues.push(`Week ${pin.week}: Team ${pin.teamB} pinned twice.`);
      set.add(pin.teamA);
      set.add(pin.teamB);
      byWeek.set(pin.week, set);
    }
    return issues;
  }, [pins]);

  function addPin() {
    if (pinTeamA === pinTeamB) return;
    setPins((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        week: pinWeek,
        teamA: pinTeamA,
        teamB: pinTeamB,
      },
    ]);
  }

  function removePin(id: string) {
    setPins((prev) => prev.filter((p) => p.id !== id));
  }

  function handleGenerate() {
    setError(null);
    setSchedule(null);
    setExpandedTeam(null);
    setGenerating(true);
    setTimeout(() => {
      const result = generateSchedule({
        teams,
        weeks,
        pins,
        constraints: {
          maxMeetings,
          noBackToBack,
          balanceHomeAway,
        },
      });
      if (result.ok) {
        setSchedule(result.schedule);
      } else {
        setError(result.error);
      }
      setGenerating(false);
    }, 30);
  }

  function teamLabel(n: number): string {
    return `Team ${n}`;
  }

  function exportCsv() {
    if (!schedule) return;
    const csv = toCsv(schedule, playoffs, leagueName);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${leagueName || "schedule"}.csv`.replace(/\s+/g, "-");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function copyToClipboard() {
    if (!schedule) return;
    const text = toCsv(schedule, playoffs, leagueName);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const teamSchedule = useMemo(() => {
    if (!schedule || expandedTeam == null) return [] as Matchup[];
    const games: Matchup[] = [];
    for (const week of schedule) {
      for (const m of week) {
        if (m.home === expandedTeam || m.away === expandedTeam) {
          games.push(m);
        }
      }
    }
    return games;
  }, [schedule, expandedTeam]);

  const teamPrintSchedule = useMemo(() => {
    if (!schedule || printTeam == null) return [] as Matchup[];
    const games: Matchup[] = [];
    for (const week of schedule) {
      for (const m of week) {
        if (m.home === printTeam || m.away === printTeam) {
          games.push(m);
        }
      }
    }
    return games;
  }, [schedule, printTeam]);

  function printAll() {
    setPrintTeam(null);
    setShowTeamMenu(false);
    setTimeout(() => window.print(), 50);
  }

  function printByTeam(team: number) {
    setPrintTeam(team);
    setShowTeamMenu(false);
    setTimeout(() => {
      window.print();
      setTimeout(() => setPrintTeam(null), 200);
    }, 50);
  }

  return (
    <main
      className={`min-h-screen px-6 py-12 md:py-16 section-grid-bg ${
        printTeam != null ? "print-team-mode" : ""
      }`}
    >
      <style>{`
        .print-only { display: none; }
        @media print {
          @page { size: landscape; margin: 0.5in; }
          html, body {
            background: #fff !important;
            color: #000 !important;
          }
          body * {
            visibility: hidden;
          }
          .print-root, .print-root * {
            visibility: visible;
          }
          .print-root {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0;
            margin: 0;
            background: #fff !important;
            color: #000 !important;
          }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          .print-area, .print-area * {
            color: #000 !important;
            background: transparent !important;
            border-color: #000 !important;
          }
          .print-area table { border-collapse: collapse; width: 100%; }
          .print-area th, .print-area td {
            border-bottom: 1px solid #000;
            page-break-inside: avoid;
          }
          .print-team-mode .print-full-schedule { display: none !important; }
          .print-full-schedule tr, .print-team-schedule tr { page-break-inside: avoid; }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none no-print"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto print-root">
        <Link
          href="/"
          className="font-display text-[28px] tracking-[2px] no-underline block text-center mb-8 no-print"
        >
          <span className="text-orange">GRIDIRON</span>
          <span className="text-text">HQ</span>
        </Link>

        <header className="text-center mb-10 no-print">
          <p className="text-text-muted text-xs uppercase tracking-[2px] font-condensed font-bold mb-3">
            Free Tool
          </p>
          <h1 className="font-display text-[clamp(32px,5vw,52px)] uppercase tracking-[1px] leading-tight mb-3">
            Fantasy Football
            <br />
            <span className="text-orange">Schedule Builder</span>
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            Generate a custom regular-season schedule with pinned matchups,
            back-to-back prevention, and a playoff bracket. No signup required.
          </p>
        </header>

        <div className="no-print">
          <Stepper step={step} setStep={setStep} />
        </div>

        <section className="bg-bg-card border border-border rounded-2xl p-6 md:p-8 mb-6 no-print">
          {step === 1 && (
            <StepOne
              teams={teams}
              setTeams={setTeams}
              weeks={weeks}
              setWeeks={setWeeks}
              playoffTeams={playoffTeams}
              setPlayoffTeams={setPlayoffTeams}
              leagueName={leagueName}
              setLeagueName={setLeagueName}
            />
          )}
          {step === 2 && (
            <StepTwo
              teams={teams}
              weeks={weeks}
              pins={pins}
              pinConflicts={pinConflicts}
              pinWeek={pinWeek}
              pinTeamA={pinTeamA}
              pinTeamB={pinTeamB}
              setPinWeek={setPinWeek}
              setPinTeamA={setPinTeamA}
              setPinTeamB={setPinTeamB}
              addPin={addPin}
              removePin={removePin}
            />
          )}
          {step === 3 && (
            <StepThree
              maxMeetings={maxMeetings}
              setMaxMeetings={setMaxMeetings}
              noBackToBack={noBackToBack}
              setNoBackToBack={setNoBackToBack}
              balanceHomeAway={balanceHomeAway}
              setBalanceHomeAway={setBalanceHomeAway}
            />
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 mt-8 pt-6 border-t border-border">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1) as Step)}
              disabled={step === 1}
              className="btn btn-outline btn-small disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Back
            </button>
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(3, s + 1) as Step)}
                className="btn btn-primary btn-small"
              >
                Next →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleGenerate}
                disabled={generating || pinConflicts.length > 0}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generating ? "Generating…" : "Generate Schedule"}
              </button>
            )}
          </div>
        </section>

        {error && (
          <div className="bg-red/10 border border-red/40 rounded-xl p-5 mb-6 no-print">
            <p className="font-condensed font-bold uppercase tracking-wider text-red mb-1 text-sm">
              Could not generate schedule
            </p>
            <p className="text-text text-sm">{error}</p>
          </div>
        )}

        {schedule && (
          <ScheduleOutput
            schedule={schedule}
            playoffs={playoffs}
            leagueName={leagueName}
            teams={teams}
            expandedTeam={expandedTeam}
            setExpandedTeam={setExpandedTeam}
            teamSchedule={teamSchedule}
            teamLabel={teamLabel}
            exportCsv={exportCsv}
            copyToClipboard={copyToClipboard}
            copied={copied}
            printAll={printAll}
            printByTeam={printByTeam}
            printTeam={printTeam}
            teamPrintSchedule={teamPrintSchedule}
            showTeamMenu={showTeamMenu}
            setShowTeamMenu={setShowTeamMenu}
          />
        )}

        <div className="mt-12 bg-bg-card border border-border rounded-2xl p-8 text-center no-print">
          <h2 className="font-display text-[clamp(22px,3vw,32px)] uppercase tracking-[1px] mb-3">
            Want <span className="text-orange">SCOUT</span> to optimize your
            lineup decisions all season?
          </h2>
          <p className="text-text-muted mb-6 max-w-xl mx-auto">
            GridironHQ&apos;s proprietary AI advisor builds every recommendation
            around your specific roster. Founding member rate locked for life.
          </p>
          <a href="https://gridironhq.ai/#pricing" className="btn btn-primary">
            Get GridironHQ Free Founding Member Access →
          </a>
        </div>
      </div>
    </main>
  );
}

function Stepper({
  step,
  setStep,
}: {
  step: Step;
  setStep: (s: Step) => void;
}) {
  const labels = ["League Setup", "Pinned Matchups", "Constraints"];
  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 mb-6">
      {labels.map((label, i) => {
        const n = (i + 1) as Step;
        const active = step === n;
        const done = step > n;
        return (
          <button
            key={label}
            type="button"
            onClick={() => setStep(n)}
            className="flex items-center gap-2 group"
          >
            <span
              className={`flex items-center justify-center w-8 h-8 rounded-full font-condensed font-bold text-sm border transition-colors ${
                active
                  ? "bg-orange text-black border-orange"
                  : done
                    ? "bg-orange/20 text-orange border-orange"
                    : "bg-bg-card text-text-muted border-border"
              }`}
            >
              {n}
            </span>
            <span
              className={`text-xs md:text-sm uppercase tracking-wider font-condensed font-bold ${
                active ? "text-text" : "text-text-muted"
              }`}
            >
              {label}
            </span>
            {i < labels.length - 1 && (
              <span className="hidden md:inline w-8 h-px bg-border ml-2" />
            )}
          </button>
        );
      })}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block font-condensed font-bold uppercase tracking-wider text-xs text-text-muted mb-2">
      {children}
    </label>
  );
}

const selectClass =
  "w-full bg-bg border border-border rounded-lg px-3 py-2.5 text-text focus:outline-none focus:border-orange transition-colors";
const inputClass = selectClass;

function StepOne(props: {
  teams: number;
  setTeams: (n: number) => void;
  weeks: number;
  setWeeks: (n: number) => void;
  playoffTeams: number;
  setPlayoffTeams: (n: number) => void;
  leagueName: string;
  setLeagueName: (s: string) => void;
}) {
  return (
    <div>
      <h2 className="font-condensed font-bold uppercase tracking-wider text-orange text-sm mb-4">
        Step 1 — League Setup
      </h2>
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <FieldLabel>Number of Teams</FieldLabel>
          <select
            value={props.teams}
            onChange={(e) => props.setTeams(Number(e.target.value))}
            className={selectClass}
          >
            {TEAM_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel>Regular Season Weeks</FieldLabel>
          <select
            value={props.weeks}
            onChange={(e) => props.setWeeks(Number(e.target.value))}
            className={selectClass}
          >
            {WEEK_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel>Playoff Teams</FieldLabel>
          <select
            value={props.playoffTeams}
            onChange={(e) => props.setPlayoffTeams(Number(e.target.value))}
            className={selectClass}
          >
            {PLAYOFF_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel>League Name (Optional)</FieldLabel>
          <input
            type="text"
            value={props.leagueName}
            onChange={(e) => props.setLeagueName(e.target.value)}
            placeholder="e.g. Sunday Funday League"
            className={inputClass}
            maxLength={60}
          />
        </div>
      </div>
    </div>
  );
}

function StepTwo(props: {
  teams: number;
  weeks: number;
  pins: Pin[];
  pinConflicts: string[];
  pinWeek: number;
  pinTeamA: number;
  pinTeamB: number;
  setPinWeek: (n: number) => void;
  setPinTeamA: (n: number) => void;
  setPinTeamB: (n: number) => void;
  addPin: () => void;
  removePin: (id: string) => void;
}) {
  const teamOpts = Array.from({ length: props.teams }, (_, i) => i + 1);
  const weekOpts = Array.from({ length: props.weeks }, (_, i) => i + 1);
  const sameTeam = props.pinTeamA === props.pinTeamB;

  return (
    <div>
      <h2 className="font-condensed font-bold uppercase tracking-wider text-orange text-sm mb-2">
        Step 2 — Pinned Matchups
      </h2>
      <p className="text-text-muted text-sm mb-5">
        Lock in specific matchups for specific weeks (rivalry games, season
        openers, etc.). Optional.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-end">
        <div>
          <FieldLabel>Week</FieldLabel>
          <select
            value={props.pinWeek}
            onChange={(e) => props.setPinWeek(Number(e.target.value))}
            className={selectClass}
          >
            {weekOpts.map((w) => (
              <option key={w} value={w}>
                Week {w}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel>Team A</FieldLabel>
          <select
            value={props.pinTeamA}
            onChange={(e) => props.setPinTeamA(Number(e.target.value))}
            className={selectClass}
          >
            {teamOpts.map((t) => (
              <option key={t} value={t}>
                Team {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel>Team B</FieldLabel>
          <select
            value={props.pinTeamB}
            onChange={(e) => props.setPinTeamB(Number(e.target.value))}
            className={selectClass}
          >
            {teamOpts.map((t) => (
              <option key={t} value={t}>
                Team {t}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={props.addPin}
          disabled={sameTeam}
          className="btn btn-primary btn-small disabled:opacity-40 disabled:cursor-not-allowed"
        >
          + Add Pin
        </button>
      </div>

      {sameTeam && (
        <p className="text-red text-xs mt-2">
          Team A and Team B must be different.
        </p>
      )}

      {props.pinConflicts.length > 0 && (
        <div className="mt-4 bg-red/10 border border-red/40 rounded-lg p-3">
          <p className="font-condensed font-bold uppercase tracking-wider text-red text-xs mb-1">
            Conflicts
          </p>
          <ul className="text-sm text-text space-y-1">
            {props.pinConflicts.map((c, i) => (
              <li key={i}>• {c}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        {props.pins.length === 0 ? (
          <p className="text-text-faint text-sm italic">
            No pinned matchups yet.
          </p>
        ) : (
          <ul className="space-y-2">
            {props.pins
              .slice()
              .sort((a, b) => a.week - b.week)
              .map((pin) => (
                <li
                  key={pin.id}
                  className="flex items-center justify-between bg-bg-card-2 border border-orange/30 rounded-lg px-4 py-2.5"
                >
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-condensed font-bold uppercase tracking-wider text-orange text-xs">
                      Week {pin.week}
                    </span>
                    <span className="text-text">
                      Team {pin.teamA} vs Team {pin.teamB}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => props.removePin(pin.id)}
                    className="text-text-muted hover:text-red text-sm"
                    aria-label="Remove pin"
                  >
                    Remove
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StepThree(props: {
  maxMeetings: 1 | 2;
  setMaxMeetings: (n: 1 | 2) => void;
  noBackToBack: boolean;
  setNoBackToBack: (b: boolean) => void;
  balanceHomeAway: boolean;
  setBalanceHomeAway: (b: boolean) => void;
}) {
  return (
    <div>
      <h2 className="font-condensed font-bold uppercase tracking-wider text-orange text-sm mb-5">
        Step 3 — Constraints
      </h2>

      <div className="space-y-6">
        <div>
          <FieldLabel>
            Max times any two teams play each other (regular season)
          </FieldLabel>
          <div className="flex gap-3">
            {[1, 2].map((n) => (
              <label
                key={n}
                className={`flex-1 cursor-pointer border rounded-lg px-4 py-3 text-sm transition-colors ${
                  props.maxMeetings === n
                    ? "border-orange bg-orange/10 text-text"
                    : "border-border text-text-muted hover:border-orange/40"
                }`}
              >
                <input
                  type="radio"
                  name="maxMeetings"
                  className="sr-only"
                  checked={props.maxMeetings === n}
                  onChange={() => props.setMaxMeetings(n as 1 | 2)}
                />
                <span className="font-condensed font-bold uppercase tracking-wider">
                  {n}x
                </span>
                <span className="block text-xs text-text-faint mt-1">
                  {n === 1
                    ? "No team plays the same opponent twice"
                    : "Teams may face each other up to twice"}
                </span>
              </label>
            ))}
          </div>
        </div>

        <Toggle
          label="Prevent back-to-back matchups"
          description="Same two teams can't play in consecutive weeks"
          value={props.noBackToBack}
          onChange={props.setNoBackToBack}
        />

        <Toggle
          label="Balance home / away"
          description="Try to give every team an even split of home and away games"
          value={props.balanceHomeAway}
          onChange={props.setBalanceHomeAway}
        />
      </div>
    </div>
  );
}

function Toggle(props: {
  label: string;
  description: string;
  value: boolean;
  onChange: (b: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-text font-medium">{props.label}</p>
        <p className="text-text-muted text-xs mt-0.5">{props.description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={props.value}
        onClick={() => props.onChange(!props.value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          props.value ? "bg-orange" : "bg-bg-card-3"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            props.value ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

function ScheduleOutput(props: {
  schedule: Matchup[][];
  playoffs: PlayoffGame[];
  leagueName: string;
  teams: number;
  expandedTeam: number | null;
  setExpandedTeam: (n: number | null) => void;
  teamSchedule: Matchup[];
  teamLabel: (n: number) => string;
  exportCsv: () => void;
  copyToClipboard: () => void;
  copied: boolean;
  printAll: () => void;
  printByTeam: (team: number) => void;
  printTeam: number | null;
  teamPrintSchedule: Matchup[];
  showTeamMenu: boolean;
  setShowTeamMenu: (b: boolean) => void;
}) {
  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const seasonYear = new Date().getFullYear();
  const teamList = Array.from({ length: props.teams }, (_, i) => i + 1);

  return (
    <section className="bg-bg-card border border-border rounded-2xl p-6 md:p-8 print-area">
      <div className="print-only mb-6">
        <div className="flex items-center justify-between border-b-2 border-black pb-3">
          <div>
            <p className="font-display text-2xl tracking-[2px]">GRIDIRONHQ</p>
            {props.leagueName && (
              <p className="text-sm mt-1">{props.leagueName}</p>
            )}
          </div>
          <p className="text-xs">Generated {today}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 no-print">
        <div>
          <h2 className="font-display text-[clamp(22px,3vw,32px)] uppercase tracking-[1px]">
            {props.leagueName ? props.leagueName : "Your Schedule"}
          </h2>
          <p className="text-text-muted text-sm">
            {props.schedule.length} regular season weeks · {props.teams} teams
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={props.copyToClipboard}
            className="btn btn-outline btn-small"
          >
            {props.copied ? "Copied!" : "Copy"}
          </button>
          <button
            type="button"
            onClick={props.exportCsv}
            className="btn btn-primary btn-small"
          >
            Export CSV
          </button>
          <button
            type="button"
            onClick={props.printAll}
            className="btn btn-outline btn-small"
          >
            Print Full Schedule
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={() => props.setShowTeamMenu(!props.showTeamMenu)}
              className="btn btn-outline btn-small"
              aria-haspopup="menu"
              aria-expanded={props.showTeamMenu}
            >
              Print by Team ▾
            </button>
            {props.showTeamMenu && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-1 z-20 bg-bg-card border border-border rounded-lg shadow-xl max-h-72 overflow-y-auto min-w-[160px]"
              >
                {teamList.map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="menuitem"
                    onClick={() => props.printByTeam(t)}
                    className="block w-full text-left px-4 py-2 text-sm text-text hover:bg-bg-card-2"
                  >
                    {props.teamLabel(t)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {props.printTeam != null && (
        <div className="print-only print-team-schedule mb-6">
          <h2 className="text-xl font-bold mb-3">
            {props.teamLabel(props.printTeam)} — {seasonYear} Season Schedule
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b-2 border-black">
                <th className="py-2 pr-4">Week</th>
                <th className="py-2 pr-4">Opponent</th>
                <th className="py-2 pr-4">Home / Away</th>
              </tr>
            </thead>
            <tbody>
              {props.teamPrintSchedule.map((m, i) => {
                const isHome = m.home === props.printTeam;
                const opp = isHome ? m.away : m.home;
                return (
                  <tr key={i}>
                    <td className="py-1.5 pr-4">Week {m.week}</td>
                    <td className="py-1.5 pr-4">{props.teamLabel(opp)}</td>
                    <td className="py-1.5 pr-4">
                      {isHome ? "Home" : "Away"}
                      {m.pinned && " (Pinned)"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="overflow-x-auto print-full-schedule">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-text-muted text-xs uppercase tracking-wider font-condensed font-bold border-b border-border">
              <th className="py-2 pr-4 w-20">Week</th>
              <th className="py-2 pr-4">Matchups</th>
            </tr>
          </thead>
          <tbody>
            {props.schedule.map((week, i) => (
              <tr
                key={i}
                className="border-b border-border-soft align-top"
              >
                <td className="py-3 pr-4 font-condensed font-bold text-orange uppercase tracking-wider">
                  Week {i + 1}
                </td>
                <td className="py-3 pr-4">
                  <ul className="space-y-1.5">
                    {week.map((m, j) => (
                      <li
                        key={j}
                        className={`flex items-center gap-2 ${
                          m.pinned
                            ? "text-orange font-medium"
                            : "text-text"
                        }`}
                      >
                        <TeamButton
                          team={m.home}
                          onClick={() => props.setExpandedTeam(m.home)}
                          label={props.teamLabel(m.home)}
                          accent={m.pinned}
                        />
                        <span className="text-text-muted text-xs">@</span>
                        <TeamButton
                          team={m.away}
                          onClick={() => props.setExpandedTeam(m.away)}
                          label={props.teamLabel(m.away)}
                          accent={m.pinned}
                        />
                        {m.pinned && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-orange/20 text-orange font-condensed font-bold uppercase tracking-wider">
                            Pinned
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {props.expandedTeam != null && (
        <div className="mt-6 bg-bg-card-2 border border-border rounded-xl p-5 no-print">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-condensed font-bold uppercase tracking-wider text-orange">
              {props.teamLabel(props.expandedTeam)} — Full Schedule
            </h3>
            <button
              type="button"
              onClick={() => props.setExpandedTeam(null)}
              className="text-text-muted hover:text-text text-sm"
            >
              Close
            </button>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
            {props.teamSchedule.map((m, i) => {
              const isHome = m.home === props.expandedTeam;
              const opp = isHome ? m.away : m.home;
              return (
                <li key={i} className="flex justify-between">
                  <span className="text-text-muted">Week {m.week}</span>
                  <span className="text-text">
                    {isHome ? "vs" : "@"} {props.teamLabel(opp)}
                    {m.pinned && (
                      <span className="ml-2 text-orange text-xs">★</span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="mt-10 pt-8 border-t border-border print-full-schedule">
        <h3 className="font-display text-[clamp(20px,2.5vw,26px)] uppercase tracking-[1px] mb-1">
          Playoff <span className="text-orange">Bracket</span>
        </h3>
        <p className="text-text-muted text-sm mb-5">
          Seeded by regular season finish. Higher seeds advance.
        </p>
        <ol className="space-y-2">
          {props.playoffs.map((g, i) => (
            <li
              key={i}
              className="flex flex-wrap items-center justify-between gap-2 bg-bg-card-2 border border-border rounded-lg px-4 py-3 text-sm"
            >
              <div className="flex items-center gap-3">
                <span className="font-condensed font-bold text-orange uppercase tracking-wider text-xs">
                  {g.weekLabel}
                </span>
                <span className="text-text-muted text-xs uppercase tracking-wider">
                  {g.label}
                </span>
              </div>
              <span className="text-text">
                {g.seedA ? `Seed ${g.seedA}` : "TBD"}
                <span className="text-text-muted mx-2">vs</span>
                {g.seedB ? `Seed ${g.seedB}` : "TBD"}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function TeamButton({
  onClick,
  label,
  accent,
}: {
  team: number;
  onClick: () => void;
  label: string;
  accent: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`hover:underline ${accent ? "text-orange" : "text-text"}`}
    >
      {label}
    </button>
  );
}
