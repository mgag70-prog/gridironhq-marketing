// Pure schedule generator for the free schedule builder — no React, no DOM,
// so it can be unit-tested directly (see generate.test.ts). ScheduleBuilder.tsx
// owns the UI and imports from here.

export type Matchup = {
  week: number;
  home: number;
  away: number;
  pinned: boolean;
  division: boolean;
  rivalry: boolean;
};

export type Pin = {
  id: string;
  week: number;
  teamA: number;
  teamB: number;
};

export type Constraints = {
  maxMeetings: 1 | 2;
  noBackToBack: boolean;
  balanceHomeAway: boolean;
};

export type PlayoffGame = {
  round: number;
  weekLabel: string;
  seedA: number | null;
  seedB: number | null;
  label: string;
};

export type DivCount = 2 | 3 | 4;
export type DivFreq = 1 | 2 | 3;

export type DivisionConfig = {
  enabled: boolean;
  count: DivCount;
  assignments: Record<number, number>;
  startWeeks: number;
  endWeeks: number;
  rivalryWeek: number | null;
  frequency: DivFreq;
};

export const TEAM_OPTIONS = [8, 10, 12, 14] as const;
export const WEEK_OPTIONS = [10, 11, 12, 13, 14, 15] as const;
export const PLAYOFF_OPTIONS = [2, 4, 6] as const;
export const DIVISION_COUNT_OPTIONS = [2, 3, 4] as const;
export const DIVISION_FREQUENCY_OPTIONS = [1, 2, 3] as const;
export const DIVISION_NAMES = ["A", "B", "C", "D"];

export function pairKey(a: number, b: number): string {
  return a < b ? `${a}-${b}` : `${b}-${a}`;
}

export function shuffle<T>(arr: T[], rand: () => number): T[] {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function autoAssignTeams(
  teams: number,
  divCount: number,
): Record<number, number> {
  const result: Record<number, number> = {};
  for (let t = 1; t <= teams; t++) {
    result[t] = (t - 1) % divCount;
  }
  return result;
}

export function computeEffectiveAssignments(
  enabled: boolean,
  assignments: Record<number, number>,
  teams: number,
  divCount: number,
): Record<number, number> {
  if (!enabled) return assignments;
  for (let t = 1; t <= teams; t++) {
    const d = assignments[t];
    if (d === undefined || d < 0 || d >= divCount) {
      return autoAssignTeams(teams, divCount);
    }
  }
  return assignments;
}

export function divisionsToTeamLists(
  config: DivisionConfig,
  teams: number,
): number[][] {
  const lists: number[][] = Array.from({ length: config.count }, () => []);
  for (let t = 1; t <= teams; t++) {
    const d = config.assignments[t];
    if (d !== undefined && d >= 0 && d < config.count) lists[d].push(t);
  }
  return lists;
}

export function divisionRoundRobin(
  div: number[],
  rand: () => number,
): Array<Array<[number, number]>> {
  if (div.length < 2) return [];
  const teams = shuffle(div.slice(), rand);
  if (teams.length % 2 === 1) teams.push(0);
  const n = teams.length;
  let circle = teams.slice();
  const rounds: Array<Array<[number, number]>> = [];
  for (let r = 0; r < n - 1; r++) {
    const round: Array<[number, number]> = [];
    for (let i = 0; i < n / 2; i++) {
      const a = circle[i];
      const b = circle[n - 1 - i];
      if (a !== 0 && b !== 0) round.push([a, b]);
    }
    rounds.push(round);
    const fixed = circle[0];
    const rest = circle.slice(1);
    rest.unshift(rest.pop()!);
    circle = [fixed, ...rest];
  }
  return rounds;
}

export function buildDivisionWeekSequence(
  config: DivisionConfig,
  weeks: number,
): { week: number; kind: "start" | "end" | "rivalry" }[] {
  const sequence: { week: number; kind: "start" | "end" | "rivalry" }[] = [];
  const used = new Set<number>();
  for (let i = 0; i < config.startWeeks; i++) {
    const w = i + 1;
    if (w >= 1 && w <= weeks && !used.has(w)) {
      sequence.push({ week: w, kind: "start" });
      used.add(w);
    }
  }
  if (
    config.rivalryWeek != null &&
    config.rivalryWeek >= 1 &&
    config.rivalryWeek <= weeks &&
    !used.has(config.rivalryWeek)
  ) {
    sequence.push({ week: config.rivalryWeek, kind: "rivalry" });
    used.add(config.rivalryWeek);
  }
  for (let i = 0; i < config.endWeeks; i++) {
    const w = weeks - config.endWeeks + 1 + i;
    if (w >= 1 && w <= weeks && !used.has(w)) {
      sequence.push({ week: w, kind: "end" });
      used.add(w);
    }
  }
  return sequence;
}

export function computeDivisionAutoPins(
  config: DivisionConfig,
  teams: number,
  weeks: number,
  userPins: Pin[],
  rand: () => number,
): { pins: Pin[]; rivalryPairs: Set<string> } {
  const out: Pin[] = [];
  const rivalryPairs = new Set<string>();
  if (!config.enabled) return { pins: out, rivalryPairs };

  const userBusy = new Map<number, Set<number>>();
  for (const p of userPins) {
    const s = userBusy.get(p.week) ?? new Set<number>();
    s.add(p.teamA);
    s.add(p.teamB);
    userBusy.set(p.week, s);
  }

  const divisions = divisionsToTeamLists(config, teams);
  const sequence = buildDivisionWeekSequence(config, weeks);
  let autoId = 0;
  function nextId() {
    autoId++;
    return `auto-div-${autoId}`;
  }

  for (const div of divisions) {
    if (div.length < 2) continue;
    const rounds = shuffle(divisionRoundRobin(div, rand), rand);
    let roundIdx = 0;
    for (const step of sequence) {
      if (roundIdx >= rounds.length) break;
      const round = rounds[roundIdx];
      const busy = userBusy.get(step.week) ?? new Set<number>();
      for (const [a, b] of round) {
        if (busy.has(a) || busy.has(b)) continue;
        out.push({ id: nextId(), week: step.week, teamA: a, teamB: b });
        if (step.kind === "rivalry") rivalryPairs.add(pairKey(a, b));
      }
      roundIdx++;
    }
  }

  return { pins: out, rivalryPairs };
}

export type GenerateInput = {
  teams: number;
  weeks: number;
  pins: Pin[];
  constraints: Constraints;
  divisionConfig: DivisionConfig;
  generationKey: number;
};

export type GenerateResult =
  | { ok: true; schedule: Matchup[][] }
  | { ok: false; error: string };

export function generateSchedule(input: GenerateInput): GenerateResult {
  const {
    teams,
    weeks,
    pins: userPins,
    constraints,
    divisionConfig,
    generationKey,
  } = input;

  if (teams % 2 !== 0) {
    return { ok: false, error: "Team count must be even." };
  }
  const gamesPerWeek = teams / 2;

  if (divisionConfig.enabled) {
    const divisions = divisionsToTeamLists(divisionConfig, teams);
    for (let i = 0; i < divisions.length; i++) {
      const divSize = divisions[i].length;
      if (divSize === 0) continue;
      const divName = DIVISION_NAMES[i];
      const divGames = (divSize - 1) * divisionConfig.frequency;
      const nonDivGames = weeks - divGames;
      const nonDivCapacity = (teams - divSize) * constraints.maxMeetings;
      if (divGames > weeks) {
        return {
          ok: false,
          error: `Cannot fit ${divisionConfig.frequency}x divisional schedule: a team in Division ${divName} (${divSize} teams) needs ${divGames} divisional games alone but the season is only ${weeks} weeks. Lower divisional frequency or extend the season.`,
        };
      }
      if (nonDivGames > nonDivCapacity) {
        return {
          ok: false,
          error: `Cannot fit schedule: a team in Division ${divName} (${divSize} teams) needs ${nonDivGames} non-divisional games to fill ${weeks} weeks (after ${divGames} divisional), but the ${constraints.maxMeetings}x max-meetings cap allows only ${nonDivCapacity}. Raise max meetings, lower divisional frequency, or shorten the season.`,
        };
      }
    }
  } else if (constraints.maxMeetings === 1 && weeks > teams - 1) {
    return {
      ok: false,
      error: `With ${teams} teams and 1x max meetings, the maximum number of regular-season weeks is ${
        teams - 1
      }. Either raise max meetings to 2x or reduce weeks.`,
    };
  }

  const setupRand = mulberry32(0xbadbeef + generationKey * 7919);
  const { pins: autoPins, rivalryPairs } = computeDivisionAutoPins(
    divisionConfig,
    teams,
    weeks,
    userPins,
    setupRand,
  );
  const userPinKeys = new Set<string>();
  for (const p of userPins) {
    userPinKeys.add(`${p.week}-${pairKey(p.teamA, p.teamB)}`);
  }
  const pins = [...userPins, ...autoPins];

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
        error: `Conflict in week ${pin.week}: a team is pinned to more than one matchup. Check user pins against division scheduling rules.`,
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
    const [a, b] = k.split("-").map(Number);
    const isDiv =
      divisionConfig.enabled &&
      divisionConfig.assignments[a] !== undefined &&
      divisionConfig.assignments[a] === divisionConfig.assignments[b];
    const cap = isDiv ? divisionConfig.frequency : constraints.maxMeetings;
    if (count > cap) {
      return {
        ok: false,
        error: `Team ${a} and Team ${b} are pinned ${count} times but max ${
          isDiv ? "divisional meetings" : "meetings"
        } is ${cap}x.`,
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

  // Seeds are tried in order, so a given generationKey still yields the same
  // schedule wherever it succeeds; the budget only caps how long a hopeless
  // configuration can hold the page. Measured on the worst known case (two
  // 7-team divisions over 14 weeks, no solution found): ~0.3 ms per attempt.
  const ATTEMPTS = 2000;
  const TIME_BUDGET_MS = 750;
  const startedAt = Date.now();
  for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
    if (attempt > 0 && Date.now() - startedAt > TIME_BUDGET_MS) break;
    const rand = mulberry32(
      0xc0ffee + attempt * 1009 + generationKey * 7919,
    );
    const result = tryBuild(
      teams,
      weeks,
      gamesPerWeek,
      pins,
      constraints,
      divisionConfig,
      rand,
    );
    if (result) {
      const finalized = assignHomeAway(result, teams, constraints, rand, pins);
      const marked = markDivisionFlags(
        finalized,
        userPinKeys,
        rivalryPairs,
        divisionConfig,
      );
      return { ok: true, schedule: marked };
    }
  }

  return {
    ok: false,
    error: describeUnsatisfiable(teams, weeks, userPins, constraints, divisionConfig),
  };
}

// The generator exhausted its attempts. Say what could not be satisfied, with
// this league's numbers, and what would relieve it — never a bare "failed".
export function describeUnsatisfiable(
  teams: number,
  weeks: number,
  userPins: Pin[],
  constraints: Constraints,
  divisionConfig: DivisionConfig,
): string {
  const relief: string[] = [];
  let lead: string;

  if (divisionConfig.enabled) {
    const freq = divisionConfig.frequency;
    const divisions = divisionsToTeamLists(divisionConfig, teams)
      .map((list, i) => ({ name: DIVISION_NAMES[i], size: list.length }))
      .filter((d) => d.size >= 2);
    // The tightest division is the one with the least room left after its
    // divisional games; describe that one in full and name the others briefly.
    const tightest = divisions.reduce((a, b) =>
      weeks - (b.size - 1) * freq < weeks - (a.size - 1) * freq ? b : a,
    );
    const divGames = (tightest.size - 1) * freq;
    const nonDiv = weeks - divGames;
    const sizes = divisions.map((d) => d.size).join("/");
    lead =
      `Could not fit a schedule where every team plays its full divisional slate. ` +
      `In Division ${tightest.name} (${tightest.size} teams) each team needs ${divGames} divisional games ` +
      `(${tightest.size - 1} rivals × ${freq}) and ${nonDiv} non-divisional in ${weeks} weeks — ` +
      `${divGames} of the ${weeks} weeks divisional` +
      (divisions.length > 1 ? ` (division sizes ${sizes}).` : ".");
    relief.push(`extend the season past ${weeks} weeks`);
    if (freq > 1) {
      relief.push(
        `set Divisional Matchup Frequency to ${freq - 1}× (${(tightest.size - 1) * (freq - 1)} divisional + ${weeks - (tightest.size - 1) * (freq - 1)} non-divisional)`,
      );
    }
    if (divisions.some((d) => d.size % 2 === 1)) {
      relief.push(
        `use even-sized divisions — a ${tightest.size % 2 === 1 ? tightest.size : divisions.find((d) => d.size % 2 === 1)!.size}-team division leaves one team out of division play every week`,
      );
    } else if (new Set(divisions.map((d) => d.size)).size > 1) {
      relief.push("even out the division sizes");
    }
  } else {
    lead = `Could not fit ${weeks} weeks for ${teams} teams under the current rules.`;
    if (constraints.maxMeetings === 1) relief.push("raise max meetings to 2×");
  }
  if (userPins.length > 0) relief.push(`remove some of the ${userPins.length} pinned matchups`);
  if (constraints.noBackToBack) relief.push("turn off back-to-back prevention");

  return `${lead} To relieve it: ${relief.join("; ")}.`;
}

export function markDivisionFlags(
  schedule: Matchup[][],
  userPinKeys: Set<string>,
  rivalryPairs: Set<string>,
  divisionConfig: DivisionConfig,
): Matchup[][] {
  const divEnabled = divisionConfig.enabled;
  return schedule.map((week) =>
    week.map((m) => {
      const key = `${m.week}-${pairKey(m.home, m.away)}`;
      const sameDiv =
        divEnabled &&
        divisionConfig.assignments[m.home] !== undefined &&
        divisionConfig.assignments[m.home] ===
          divisionConfig.assignments[m.away];
      const isRivalry =
        sameDiv &&
        divisionConfig.rivalryWeek != null &&
        m.week === divisionConfig.rivalryWeek &&
        rivalryPairs.has(pairKey(m.home, m.away));
      return {
        ...m,
        pinned: userPinKeys.has(key),
        division: sameDiv,
        rivalry: isRivalry,
      };
    }),
  );
}

export function tryBuild(
  teams: number,
  weeks: number,
  gamesPerWeek: number,
  pins: Pin[],
  constraints: Constraints,
  divisionConfig: DivisionConfig,
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

  function pairCap(a: number, b: number): number {
    if (!divisionConfig.enabled) return constraints.maxMeetings;
    const da = divisionConfig.assignments[a];
    const db = divisionConfig.assignments[b];
    if (da !== undefined && db !== undefined && da === db) {
      return divisionConfig.frequency;
    }
    return constraints.maxMeetings;
  }

  for (const pin of pins) {
    const wIdx = pin.week - 1;
    weekPairs[wIdx].push({ a: pin.teamA, b: pin.teamB, pinned: true });
    weekUsed[wIdx].add(pin.teamA);
    weekUsed[wIdx].add(pin.teamB);
    const k = pairKey(pin.teamA, pin.teamB);
    pairCount.set(k, (pairCount.get(k) ?? 0) + 1);
  }

  const allTeams = Array.from({ length: teams }, (_, i) => i + 1);

  // Divisional frequency is a TARGET, not a ceiling. pairCap above stops any
  // division pair meeting more than `frequency` times; this block makes sure
  // every team also reaches exactly (divSize - 1) * frequency. It prunes any
  // pairing that would leave a team unable to hit its quota in the weeks it
  // has left — a necessary condition, so backtracking still does the rest.
  // Before this, "2x" meant "at most twice": a 12-team/2-division/14-week
  // league came out at 8–10 divisional games per team, never 10 for everyone.
  const divQuota = new Map<number, number>();
  const teamDivGames = new Map<number, number>();
  const teamGames = new Map<number, number>();
  if (divisionConfig.enabled) {
    const sizes = new Map<number, number>();
    for (const t of allTeams) {
      const d = divisionConfig.assignments[t];
      sizes.set(d, (sizes.get(d) ?? 0) + 1);
    }
    for (const t of allTeams) {
      const size = sizes.get(divisionConfig.assignments[t]) ?? 1;
      divQuota.set(t, (size - 1) * divisionConfig.frequency);
    }
  }
  function isDivisionPair(a: number, b: number): boolean {
    return (
      divisionConfig.enabled &&
      divisionConfig.assignments[a] !== undefined &&
      divisionConfig.assignments[a] === divisionConfig.assignments[b]
    );
  }
  function countGame(a: number, b: number, delta: number): void {
    const div = isDivisionPair(a, b) ? delta : 0;
    for (const x of [a, b]) {
      teamGames.set(x, (teamGames.get(x) ?? 0) + delta);
      teamDivGames.set(x, (teamDivGames.get(x) ?? 0) + div);
    }
  }
  function keepsQuotaReachable(a: number, b: number): boolean {
    if (!divisionConfig.enabled) return true;
    const div = isDivisionPair(a, b) ? 1 : 0;
    for (const x of [a, b]) {
      const divAfter = (teamDivGames.get(x) ?? 0) + div;
      const weeksLeft = weeks - ((teamGames.get(x) ?? 0) + 1);
      if (divAfter + weeksLeft < (divQuota.get(x) ?? 0)) return false;
    }
    return true;
  }
  for (const pin of pins) countGame(pin.teamA, pin.teamB, 1);

  function fillWeek(wIdx: number): boolean {
    if (weekPairs[wIdx].length === gamesPerWeek) return true;

    const remaining = allTeams.filter((t) => !weekUsed[wIdx].has(t));
    if (remaining.length < 2) return false;

    const shuffled = shuffle(remaining, rand);
    const t = shuffled[0];
    const candidates = shuffle(
      shuffled.slice(1).filter((c) => {
        const k = pairKey(t, c);
        if ((pairCount.get(k) ?? 0) >= pairCap(t, c)) return false;
        if (!keepsQuotaReachable(t, c)) return false;
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
      countGame(t, c, 1);

      if (fillWeek(wIdx)) return true;

      weekPairs[wIdx].pop();
      weekUsed[wIdx].delete(t);
      weekUsed[wIdx].delete(c);
      pairCount.set(k, (pairCount.get(k) ?? 1) - 1);
      countGame(t, c, -1);
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
        division: false,
        rivalry: false,
      });
    }
  }
  return result;
}

export function weekHasPair(
  pairs: { a: number; b: number }[],
  x: number,
  y: number,
): boolean {
  return pairs.some(
    (p) => (p.a === x && p.b === y) || (p.a === y && p.b === x),
  );
}

export function assignHomeAway(
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

export function buildPlayoffs(
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

export function toCsv(
  schedule: Matchup[][],
  playoffs: PlayoffGame[],
  leagueName: string,
  divisionConfig: DivisionConfig,
  teams: number,
): string {
  const rows: string[][] = [];
  if (leagueName) rows.push([`League: ${leagueName}`]);
  if (divisionConfig.enabled) {
    const divisions = divisionsToTeamLists(divisionConfig, teams);
    divisions.forEach((teamList, i) => {
      rows.push([
        `Division ${DIVISION_NAMES[i]}`,
        ...teamList.map((t) => `Team ${t}`),
      ]);
    });
    rows.push([]);
  }
  rows.push(["Week", "Home", "Away", "Pinned", "Division", "Rivalry"]);
  for (const week of schedule) {
    for (const m of week) {
      rows.push([
        String(m.week),
        `Team ${m.home}`,
        `Team ${m.away}`,
        m.pinned ? "Yes" : "",
        m.division ? "Yes" : "",
        m.rivalry ? "Yes" : "",
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
