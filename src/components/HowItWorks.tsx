import { siteConfig } from "@/config/site";
import { SectionHeader } from "./SectionHeader";

export function HowItWorks() {
  const { howItWorks } = siteConfig;

  return (
    <section className="py-[100px] section-grid-bg" id="how">
      <div className="max-w-[1180px] mx-auto px-6">
        <SectionHeader
          label={howItWorks.label}
          title={howItWorks.title}
          titleAccent={howItWorks.titleAccent}
          subhead={howItWorks.subhead}
          center
        />

        <div className="grid md:grid-cols-3 gap-8 mt-15 relative">
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-9 left-[calc(16.666%+20px)] right-[calc(16.666%+20px)] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,107,0,0.4), transparent)",
            }}
          />
          {howItWorks.steps.map((step) => (
            <div key={step.step} className="text-center px-5 relative">
              <div className="w-[72px] h-[72px] rounded-full bg-bg-card border-2 border-orange flex items-center justify-center mx-auto mb-5 font-display text-4xl text-orange relative z-10">
                {step.step}
              </div>
              <h3 className="font-condensed text-[22px] font-extrabold uppercase tracking-[0.5px] mb-2.5">
                {step.title}
              </h3>
              <p className="text-sm text-text-muted leading-[1.7]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
