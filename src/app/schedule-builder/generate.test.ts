// The property that was broken: "Divisional Matchup Frequency: N" must mean
// every team plays EVERY division rival exactly N times. A test that only
// checked "a schedule was produced" passed while 12/2/14 leagues came out at
// 8–10 divisional games per team — so this asserts the count, per pair.
//
// Run: npm test   (node:test; Node ≥ 22.6 strips the types natively)

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  autoAssignTeams,
  generateSchedule,
  type Constraints,
  type DivCount,
  type DivFreq,
  type Matchup,
} from "./generate.ts";

type Case = { teams: number; divs: DivCount; weeks: number; maxMeetings: 1 | 2; freq?: DivFreq };

function run(c: Case, generationKey: number) {
  const assignments = autoAssignTeams(c.teams, c.divs);
  const constraints: Constraints = { maxMeetings: c.maxMeetings, noBackToBack: true, balanceHomeAway: true };
  const result = generateSchedule({
    teams: c.teams,
    weeks: c.weeks,
    pins: [],
    constraints,
    divisionConfig: {
      enabled: true,
      count: c.divs,
      assignments,
      startWeeks: 1,
      endWeeks: 1,
      rivalryWeek: null,
      frequency: c.freq ?? 2,
    },
    generationKey,
  });
  return { result, assignments };
}

// Meetings per unordered pair across the season.
function pairMeetings(schedule: Matchup[][]): Map<string, number> {
  const m = new Map<string, number>();
  for (const week of schedule) {
    for (const g of week) {
      const k = g.home < g.away ? `${g.home}-${g.away}` : `${g.away}-${g.home}`;
      m.set(k, (m.get(k) ?? 0) + 1);
    }
  }
  return m;
}

function assertDivisionalQuota(c: Case, keys: number) {
  const freq = c.freq ?? 2;
  for (let key = 0; key < keys; key++) {
    const { result, assignments } = run(c, key);
    assert.ok(result.ok, `${JSON.stringify(c)} key ${key}: ${result.ok ? "" : result.error}`);
    const meetings = pairMeetings(result.schedule);
    for (let a = 1; a <= c.teams; a++) {
      for (let b = a + 1; b <= c.teams; b++) {
        const n = meetings.get(`${a}-${b}`) ?? 0;
        if (assignments[a] === assignments[b]) {
          assert.equal(n, freq, `${JSON.stringify(c)} key ${key}: teams ${a}–${b} (same division) met ${n}×, expected ${freq}×`);
        } else {
          assert.ok(n <= c.maxMeetings, `${JSON.stringify(c)} key ${key}: teams ${a}–${b} met ${n}×, cap ${c.maxMeetings}`);
        }
      }
    }
    // Every week still has every team playing exactly once.
    for (const week of result.schedule) {
      const seen = new Set<number>();
      for (const g of week) { seen.add(g.home); seen.add(g.away); }
      assert.equal(seen.size, c.teams, `${JSON.stringify(c)} key ${key}: week ${week[0]?.week} does not use every team once`);
    }
  }
}

test("the Reddit report: 12 teams, 2 divisions, 14 weeks, 2× — every division pair meets exactly twice", () => {
  assertDivisionalQuota({ teams: 12, divs: 2, weeks: 14, maxMeetings: 1 }, 40);
  assertDivisionalQuota({ teams: 12, divs: 2, weeks: 14, maxMeetings: 2 }, 20);
});

test("every accepted 8-, 10-, 12- and 14-team configuration in the sweep hits its divisional quota", () => {
  const cases: Case[] = [
    // 12 teams — the default league, previously 0% at every week count
    { teams: 12, divs: 2, weeks: 10, maxMeetings: 1 }, { teams: 12, divs: 2, weeks: 11, maxMeetings: 1 },
    { teams: 12, divs: 2, weeks: 12, maxMeetings: 1 }, { teams: 12, divs: 2, weeks: 13, maxMeetings: 1 },
    { teams: 12, divs: 2, weeks: 15, maxMeetings: 1 }, { teams: 12, divs: 2, weeks: 13, maxMeetings: 2 },
    { teams: 12, divs: 3, weeks: 10, maxMeetings: 1 }, { teams: 12, divs: 3, weeks: 12, maxMeetings: 1 },
    { teams: 12, divs: 3, weeks: 13, maxMeetings: 1 }, { teams: 12, divs: 3, weeks: 14, maxMeetings: 1 },
    { teams: 12, divs: 4, weeks: 10, maxMeetings: 1 }, { teams: 12, divs: 4, weeks: 12, maxMeetings: 1 },
    { teams: 12, divs: 4, weeks: 13, maxMeetings: 1 }, { teams: 12, divs: 4, weeks: 14, maxMeetings: 2 },
    // 8 teams
    { teams: 8, divs: 2, weeks: 10, maxMeetings: 1 }, { teams: 8, divs: 2, weeks: 12, maxMeetings: 2 },
    { teams: 8, divs: 2, weeks: 13, maxMeetings: 2 }, { teams: 8, divs: 3, weeks: 12, maxMeetings: 2 },
    { teams: 8, divs: 4, weeks: 10, maxMeetings: 2 }, { teams: 8, divs: 4, weeks: 13, maxMeetings: 2 },
    // 10 teams, even divisions
    { teams: 10, divs: 2, weeks: 11, maxMeetings: 1 },
    { teams: 10, divs: 2, weeks: 12, maxMeetings: 1 }, { teams: 10, divs: 2, weeks: 13, maxMeetings: 1 },
    { teams: 10, divs: 2, weeks: 14, maxMeetings: 2 },
    // 14 teams, the cases that clear under the quota
    { teams: 14, divs: 3, weeks: 14, maxMeetings: 1 }, { teams: 14, divs: 4, weeks: 14, maxMeetings: 1 },
    { teams: 14, divs: 4, weeks: 15, maxMeetings: 1 },
    // 1× and 3× frequency
    { teams: 12, divs: 2, weeks: 13, maxMeetings: 2, freq: 1 }, { teams: 8, divs: 2, weeks: 13, maxMeetings: 2, freq: 3 },
  ];
  for (const c of cases) assertDivisionalQuota(c, 5);
});

test("a configuration the search cannot fit fails with the league's numbers and a way out, never a bare failure", () => {
  const { result } = run({ teams: 14, divs: 2, weeks: 14, maxMeetings: 1 }, 0);
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.match(result.error, /Division A \(7 teams\)/);
  assert.match(result.error, /12 divisional games \(6 rivals × 2\)/);
  assert.match(result.error, /2 non-divisional in 14 weeks — 12 of the 14 weeks divisional/);
  assert.match(result.error, /extend the season past 14 weeks/);
  assert.match(result.error, /Divisional Matchup Frequency to 1× \(6 divisional \+ 8 non-divisional\)/);
  assert.match(result.error, /even-sized divisions/);
  assert.doesNotMatch(result.error, /Could not generate a valid schedule/);
});

// Odd-sized divisions with almost no non-divisional room. The random fill
// cannot always find these (a constructive division-first builder is the
// follow-up); until then each run must either hit the quota exactly or fail
// with the numbers — never a schedule that silently misses the quota.
test("marginal odd-division configurations either hit the quota exactly or fail with the numbers", () => {
  const marginal: Case[] = [
    { teams: 10, divs: 2, weeks: 10, maxMeetings: 1 },  // 8 of 10 weeks divisional — ~7/10 succeed
    { teams: 14, divs: 2, weeks: 15, maxMeetings: 1 },  // 12 of 15 — ~2/10 succeed
    { teams: 14, divs: 2, weeks: 14, maxMeetings: 1 },  // 12 of 14 — never found
    { teams: 10, divs: 3, weeks: 11, maxMeetings: 1 },  // 4/3/3 — never found
  ];
  for (const c of marginal) {
    for (let key = 0; key < 3; key++) {
      const { result, assignments } = run(c, key);
      if (!result.ok) {
        assert.match(result.error, /divisional games \(\d+ rivals × 2\)/, `${JSON.stringify(c)} key ${key}: ${result.error}`);
        assert.match(result.error, /To relieve it: /);
        continue;
      }
      const meetings = pairMeetings(result.schedule);
      for (let a = 1; a <= c.teams; a++) for (let b = a + 1; b <= c.teams; b++) {
        if (assignments[a] === assignments[b]) {
          assert.equal(meetings.get(`${a}-${b}`) ?? 0, 2, `${JSON.stringify(c)} key ${key}: teams ${a}–${b} did not meet exactly twice`);
        }
      }
    }
  }
});

test("the pre-flight impossibility checks are unchanged", () => {
  const { result } = run({ teams: 14, divs: 2, weeks: 10, maxMeetings: 1 }, 0);
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.error, /Cannot fit 2x divisional schedule/);
});
