import { siteConfig } from "@/config/site";
import { SectionHeader } from "./SectionHeader";

export function Pricing() {
  const { pricing } = siteConfig;

  return (
    <section className="py-[100px] section-grid-bg" id="pricing">
      <div className="max-w-[1180px] mx-auto px-6">
        <SectionHeader
          label={pricing.label}
          title={pricing.title}
          titleAccent={pricing.titleAccent}
          subhead={pricing.subhead}
          center
        />

        {/*
          Four tiers, not three. The 4-up row is held back to xl (1280px)
          rather than lg: at lg the 1180px container leaves ~244px per card,
          and the feature bullets start wrapping to three lines each. Between
          sm and xl it renders 2x2, where each card is wider than the old 3-up
          ever was.
        */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-15">
          {pricing.tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-[14px] p-8 relative overflow-hidden flex flex-col ${
                tier.featured
                  ? "border border-orange/40 shadow-[0_0_60px_rgba(255,107,0,0.1)] bg-gradient-to-br from-bg-card to-bg-card-2"
                  : "bg-bg-card border border-border"
              }`}
            >
              {/*
                Badge sits in normal flow, in a fixed-height row reserved on
                EVERY card. It used to be absolutely positioned at top-right,
                which worked at 3-up but overlaps the tier name once a fourth
                tier narrows the column (verified in the browser at 1440px).
                Reserving the row on all four keeps the price baselines aligned
                across the grid instead of dropping the featured card.
              */}
              <div className="h-6 mb-2 flex justify-end items-start">
                {tier.badge && (
                  <span className="inline-block px-3 py-1 rounded-full font-condensed text-[11px] font-bold uppercase tracking-[0.5px] bg-orange/15 text-orange border border-orange/30">
                    {tier.badge}
                  </span>
                )}
              </div>

              <div
                className={`font-condensed text-sm font-bold uppercase tracking-[1px] mb-2 ${tier.featured ? "text-orange" : "text-text-muted"}`}
              >
                {tier.name}
              </div>

              <div className="font-display text-[52px] text-text leading-none mb-1">
                <span className="text-xl text-text-muted align-top inline-block mt-2.5">
                  $
                </span>
                {tier.price.toFixed(2)}
              </div>
              <div className="text-[13px] text-text-muted">
                {tier.cadence}
              </div>
              <p className="text-sm text-text-muted leading-[1.6] mb-6 mt-6">
                {tier.description}
              </p>

              <ul className="list-none mb-7 flex-1">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-[13px] text-text py-1.5 border-b border-border-soft last:border-0"
                  >
                    <span className="text-green text-sm flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={tier.cta.href}
                className={`btn ${tier.featured ? "btn-primary" : "btn-outline"} w-full`}
              >
                {tier.cta.label}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-[13px] text-text-muted mt-8">
          Every plan starts with a 14-day free trial. No credit card required to
          start.
        </p>

      </div>
    </section>
  );
}
