import { siteConfig } from "@/config/site";
import { SectionHeader } from "./SectionHeader";

export function Problem() {
  const { problem } = siteConfig;

  return (
    <section className="py-[100px] section-grid-bg" id="problem">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-15 items-center">
          <div>
            <SectionHeader
              label={problem.label}
              title={problem.title}
              titleAccent={problem.titleAccent}
              subhead={problem.subhead}
            />

            <div className="flex flex-col gap-4 mt-8">
              {problem.items.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3.5 p-4 bg-red/5 border border-red/15 rounded-lg"
                >
                  <div className="text-xl flex-shrink-0 mt-0.5">{item.icon}</div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-text mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[13px] text-text-muted leading-[1.6]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="bg-gradient-to-br from-bg-card to-bg-card-2 border border-orange/20 rounded-[14px] p-8 relative overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="absolute -top-[50px] -right-[50px] w-[200px] h-[200px] pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,107,0,0.1), transparent 70%)",
              }}
            />
            <h3 className="font-display text-4xl tracking-[1px] uppercase mb-4 relative">
              {problem.solution.title.split(problem.solution.titleAccent).map(
                (part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="text-orange">
                        {problem.solution.titleAccent}
                      </span>
                    )}
                  </span>
                )
              )}
            </h3>
            <div className="relative">
              {problem.solution.points.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-2.5 py-2.5 border-b border-border last:border-0"
                >
                  <span className="text-green text-base flex-shrink-0">✓</span>
                  <span className="text-sm text-text">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
