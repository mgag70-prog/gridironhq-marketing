import { siteConfig } from "@/config/site";
import { SectionHeader } from "./SectionHeader";

export function Pricing() {
  const { pricing, founding, seasonPasses } = siteConfig;

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-15">
          {pricing.tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-[14px] p-8 relative overflow-hidden flex flex-col ${
                tier.featured
                  ? "border border-orange/40 shadow-[0_0_60px_rgba(255,107,0,0.1)] bg-gradient-to-br from-bg-card to-bg-card-2"
                  : "bg-bg-card border border-border"
              }`}
            >
              {tier.badge && (
                <div className="absolute top-5 right-5">
                  <span className="inline-block px-3 py-1 rounded-full font-condensed text-[11px] font-bold uppercase tracking-[0.5px] bg-orange/15 text-orange border border-orange/30">
                    {tier.badge}
                  </span>
                </div>
              )}

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
              <div className="text-[13px] text-text-muted mb-6">
                {tier.cadence}
              </div>
              <p className="text-sm text-text-muted leading-[1.6] mb-6">
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

        {/* Founding member box */}
        <div
          id="founding"
          className="bg-orange/[0.06] border border-orange/20 rounded-[10px] p-5 mt-15 flex items-center justify-between gap-5 flex-wrap"
        >
          <div>
            <h3 className="font-condensed text-[22px] font-extrabold uppercase tracking-[0.5px] mb-1.5">
              ⭐ {founding.heading}
            </h3>
            <p className="text-sm text-text-muted">{founding.description}</p>
          </div>
          <div className="flex gap-5 items-center flex-wrap">
            {founding.tiers.map((tier, i) => (
              <div key={tier.id} className="flex items-center gap-5">
                {i > 0 && (
                  <div className="text-text-faint font-display text-2xl">+</div>
                )}
                <div className="text-center">
                  <div className="font-display text-3xl text-orange">
                    ${tier.price}
                    <span className="text-sm text-text-muted">{tier.cadence}</span>
                  </div>
                  <div className="text-[11px] text-text-muted uppercase tracking-[0.5px]">
                    {tier.name}
                  </div>
                  <div className="mt-2.5">
                    <a
                      href={tier.stripeUrl}
                      className={`btn ${tier.ctaVariant === "primary" ? "btn-primary" : "btn-outline"} btn-small`}
                    >
                      {tier.ctaLabel}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Season passes */}
        <div className="mt-5 grid md:grid-cols-2 gap-4">
          {seasonPasses.map((pass) => (
            <div
              key={pass.id}
              className="bg-bg-card border border-border rounded-[10px] p-5 flex justify-between items-center flex-wrap gap-3"
            >
              <div>
                <div className="font-condensed text-sm font-bold uppercase tracking-[0.5px] mb-1">
                  {pass.name}
                </div>
                <div className="text-[13px] text-text-muted">
                  {pass.description}
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-3xl text-orange">
                  ${pass.price}
                </div>
                <a
                  href={pass.cta.href}
                  className="btn btn-outline btn-small mt-2"
                >
                  {pass.cta.label}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
