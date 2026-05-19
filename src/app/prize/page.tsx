import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "$500 Founding Member Prize Pool — Official Rules",
  description:
    "Official rules for the GridironHQ $500 founding member prize pool. Top 3 founding members by regular season record win cash prizes at the end of the 2026 NFL season.",
};

type Section = {
  heading: string;
  body: React.ReactNode;
};

const sections: Section[] = [
  {
    heading: "Overview",
    body: (
      <>
        Top 3 founding members by regular season win-loss record at end of the
        2026 NFL season win cash prizes.
        <ul className="mt-3 space-y-1.5">
          <li className="flex gap-3">
            <span className="font-condensed font-bold text-orange min-w-[40px]">
              1st
            </span>
            <span className="text-text">$300</span>
          </li>
          <li className="flex gap-3">
            <span className="font-condensed font-bold text-orange min-w-[40px]">
              2nd
            </span>
            <span className="text-text">$150</span>
          </li>
          <li className="flex gap-3">
            <span className="font-condensed font-bold text-orange min-w-[40px]">
              3rd
            </span>
            <span className="text-text">$50</span>
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "Eligibility",
    body: (
      <ul className="list-disc list-outside ml-5 space-y-2 marker:text-orange">
        <li>
          Must be a paying GridironHQ founding member (Commissioner or League
          Member rate) with an active subscription as of August 1, 2026.
        </li>
        <li>
          Must have an active Sleeper league connected OR manually provide
          their league&apos;s final regular season record to
          hello@gridironhq.ai by the submission deadline.
        </li>
        <li>One entry per person.</li>
      </ul>
    ),
  },
  {
    heading: "How Records Are Tracked",
    body: "Final regular season win-loss record from your fantasy league as of the conclusion of the 2026 NFL regular season. For Sleeper leagues connected to GridironHQ, records are pulled automatically. For all other platforms (ESPN, Yahoo, CBS, etc.), submit a screenshot of your final standings to hello@gridironhq.ai by November 30, 2026. In the event of a tie, total points scored for the season is the tiebreaker.",
  },
  {
    heading: "Prizes",
    body: "Paid via Venmo or PayPal within 14 days of the conclusion of the 2026 NFL regular season. Winners will be contacted at the email address associated with their GridironHQ account.",
  },
  {
    heading: "General Rules",
    body: "GridironHQ reserves the right to disqualify any entry for fraud or manipulation. Void where prohibited. Sponsored by HQ Sports Technologies LLC.",
  },
  {
    heading: "Questions",
    body: (
      <>
        Contact{" "}
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="text-orange no-underline hover:underline"
        >
          {siteConfig.contact.email}
        </a>
      </>
    ),
  },
];

export default function PrizePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16 section-grid-bg">
      <div
        aria-hidden="true"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 60%)",
        }}
      />

      <article className="relative w-full max-w-[720px] bg-bg-card border border-border rounded-2xl p-8 md:p-12">
        <a
          href="/"
          className="font-display text-[28px] tracking-[2px] no-underline block text-center mb-8"
        >
          <span className="text-orange">GRIDIRON</span>
          <span className="text-text">HQ</span>
        </a>

        <h1 className="font-display text-[clamp(28px,4vw,40px)] uppercase tracking-[1px] leading-tight text-center mb-2">
          $500 Founding Member
          <br />
          <span className="text-orange">Prize Pool</span>
        </h1>
        <p className="text-center text-text-muted text-sm uppercase tracking-[1px] font-condensed font-bold mb-10">
          Official Rules
        </p>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-condensed text-base font-extrabold uppercase tracking-[0.5px] text-orange mb-2">
                {section.heading}
              </h2>
              <div className="text-[15px] text-text leading-relaxed">
                {section.body}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-border text-center">
          <a
            href="https://gridironhq.ai/#pricing"
            className="btn btn-primary btn-large"
          >
            Lock In Founding Rate →
          </a>
        </div>
      </article>
    </main>
  );
}
