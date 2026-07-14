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
              <div className="text-[13px] text-text-muted">
                {tier.cadence}
              </div>
              {tier.note && (
                <div className="text-[12px] text-orange/90 mt-1 mb-2 leading-snug">
                  {tier.note}
                </div>
              )}
              <p
                className={`text-sm text-text-muted leading-[1.6] mb-6 ${tier.note ? "mt-3" : "mt-6"}`}
              >
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

        {/* Starter waitlist */}
        <div
          id="waitlist"
          className="mt-10 max-w-md mx-auto bg-bg-card border border-orange/30 rounded-[10px] p-6 text-center"
        >
          <h3 className="font-condensed text-lg font-extrabold uppercase tracking-[0.5px] mb-3">
            <span className="text-orange">Starter Plan</span> — Coming July 31
          </h3>
          <form
            name="starter-waitlist"
            method="POST"
            data-netlify="true"
            className="flex flex-col sm:flex-row gap-2"
          >
            <input type="hidden" name="form-name" value="starter-waitlist" />
            <input
              type="email"
              name="email"
              required
              placeholder="you@email.com"
              aria-label="Email address"
              className="flex-1 bg-bg border border-border rounded-md px-3 py-2 text-sm text-text focus:outline-none focus:border-orange transition-colors"
            />
            <button type="submit" className="btn btn-primary btn-small">
              Notify Me
            </button>
          </form>
          <p className="text-[12px] text-text-muted mt-3">
            We&apos;ll email you when Starter launches at $3.99/mo
          </p>
        </div>

        {/* Founding member box */}
        <div
          id="founding"
          className="bg-orange/[0.06] border border-orange/20 rounded-[10px] p-5 mt-15 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
        >
          <div className="lg:max-w-sm">
            <h3 className="font-condensed text-[22px] font-extrabold uppercase tracking-[0.5px] mb-1.5">
              ⭐ {founding.heading}
            </h3>
            <p className="text-sm text-text-muted">{founding.description}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center">
            {founding.tiers.map((tier) => (
              <div key={tier.id} className="text-center">
                <div className="font-display text-3xl text-orange">
                  ${tier.price}
                  <span className="text-sm text-text-muted">
                    {tier.cadence}
                  </span>
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
            ))}
          </div>
        </div>

        <p className="text-center text-[13px] text-text-muted mt-4">
          🏆 $500 in prizes for founding members —{" "}
          <a href="/prize" className="text-orange no-underline hover:underline">
            See official rules →
          </a>
        </p>

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
