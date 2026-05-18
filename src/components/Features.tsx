import { siteConfig } from "@/config/site";
import { SectionHeader } from "./SectionHeader";

export function Features() {
  const { features } = siteConfig;

  return (
    <section className="py-[100px] section-grid-bg" id="features">
      <div className="max-w-[1180px] mx-auto px-6">
        <SectionHeader
          label={features.label}
          title={features.title}
          titleAccent={features.titleAccent}
          subhead={features.subhead}
          center
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-15">
          {features.items.map((feature) => (
            <div
              key={feature.id}
              className="group bg-bg-card border border-border rounded-xl p-7 transition-all hover:-translate-y-1 hover:border-orange/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_40px_rgba(255,107,0,0.25)] relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,107,0,0.04), transparent)",
                }}
              />
              <div className="relative">
                <div className="w-12 h-12 bg-orange/10 rounded-[10px] flex items-center justify-center text-[22px] mb-4 border border-orange/20">
                  {feature.icon}
                </div>
                <h3 className="font-condensed text-xl font-extrabold uppercase tracking-[0.5px] mb-2.5 text-text">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-muted leading-[1.7] mb-4">
                  {feature.description}
                </p>
                <span className="font-condensed text-[11px] font-bold uppercase tracking-[0.5px] text-orange">
                  {feature.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
