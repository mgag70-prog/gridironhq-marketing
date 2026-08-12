import { siteConfig } from "@/config/site";

export function FinalCTA() {
  const { finalCta, pricing, urls } = siteConfig;

  return (
    <section className="text-center py-[100px] relative overflow-hidden section-grid-bg">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-[1180px] mx-auto px-6 relative">
        <div className="flex items-center gap-2.5 justify-center mb-4">
          <div className="w-10 h-0.5 bg-orange" />
          <span className="font-condensed text-[13px] font-bold uppercase tracking-[1px] text-orange">
            {finalCta.label}
          </span>
        </div>

        <h2 className="font-display text-[clamp(48px,6vw,80px)] uppercase tracking-[2px] leading-none mb-5">
          {finalCta.headline.lines.map((line, i) => (
            <span key={i} className="block">
              {line === finalCta.headline.accentLine ? (
                <span className="text-orange">{line}</span>
              ) : (
                line
              )}
            </span>
          ))}
        </h2>

        <p className="text-[18px] text-text-muted max-w-[540px] mx-auto mb-10 leading-[1.7]">
          {finalCta.subhead}
        </p>

        <div className="flex justify-center gap-8 mb-10 flex-wrap">
          {pricing.tiers.map((tier) => (
            <div
              key={tier.id}
              className="text-center px-7 py-5 bg-bg-card border border-border rounded-[10px] min-w-[200px]"
            >
              <div className="font-display text-4xl text-orange leading-none">
                ${tier.price.toFixed(2)}
                <span className="text-base text-text-muted">/mo</span>
              </div>
              <div className="text-xs text-text-muted mt-1">{tier.name}</div>
              <div className="mt-3">
                <a
                  href={tier.cta.href}
                  className={`btn ${tier.featured ? "btn-primary" : "btn-outline"} btn-large w-full`}
                >
                  {tier.cta.label}
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[13px] text-text-muted">
          {finalCta.signInPrompt}{" "}
          <a href={urls.app} className="text-orange no-underline hover:underline">
            {finalCta.signInLabel}
          </a>
        </p>
        <p className="text-[13px] text-text-muted mt-2">
          {finalCta.demoPrompt}{" "}
          <a href={urls.demo} className="text-orange no-underline hover:underline">
            {finalCta.demoLabel}
          </a>
        </p>
      </div>
    </section>
  );
}
