import { siteConfig } from "@/config/site";
import { SectionHeader } from "./SectionHeader";

/**
 * Free Pick'Em section — sits directly above Pricing on purpose.
 *
 * A visitor about to weigh the tier cards meets the free product first, so the
 * question changes from "is this worth $3.99" to "what does paying add on top
 * of what I already have". Content (and the accuracy constraints on it) lives
 * in siteConfig.pickem.
 *
 * No new visual pattern: this is the same `py-[100px] section-grid-bg` shell,
 * the same centered SectionHeader, and the same btn-primary / btn-outline pair
 * the Hero uses. The one flourish — the soft orange radial — is the identical
 * treatment DemoBanner and FinalCTA already use.
 */
export function Pickem() {
  const { pickem } = siteConfig;

  return (
    // overflow-hidden is load-bearing, not decoration: the 700px radial below
    // is absolutely positioned and centered, so at 375px it extends ~162px
    // past each edge and the PAGE scrolls sideways without it. FinalCTA and
    // Hero clip their radials the same way.
    <section
      className="py-[100px] section-grid-bg relative overflow-hidden"
      id="pickem"
    >
      <div className="max-w-[1180px] mx-auto px-6 relative">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 60%)",
          }}
        />

        <div className="relative">
          <SectionHeader
            label={pickem.label}
            title={pickem.title}
            titleAccent={pickem.titleAccent}
            subhead={pickem.subhead}
            center
          />

          {/* Same 560px measure SectionHeader gives its own subhead, so the
              body sits on the section's existing reading rhythm. */}
          <div className="max-w-[560px] mx-auto mt-10 flex flex-col gap-5 text-center">
            {pickem.body.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[17px] leading-[1.7] text-text-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3.5 mt-10">
            <a
              href={pickem.primaryCta.href}
              className="btn btn-primary btn-large"
            >
              {pickem.primaryCta.label} →
            </a>
            <a
              href={pickem.secondaryCta.href}
              className="btn btn-outline btn-large"
            >
              {pickem.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
