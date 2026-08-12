import { siteConfig } from "@/config/site";
import { SectionHeader } from "./SectionHeader";

function Cell({ value, inverted }: { value: string; inverted?: boolean }) {
  if (value === "yes") {
    return (
      <div
        className={`text-center text-lg ${inverted ? "text-red opacity-60" : "text-green"}`}
      >
        ✓
      </div>
    );
  }
  if (value === "no") {
    return (
      <div
        className={`text-center text-lg ${inverted ? "text-green" : "text-red opacity-60"}`}
      >
        ✗
      </div>
    );
  }
  if (value === "N/A") {
    return (
      <div className="text-center text-[13px] font-semibold text-text-faint">
        N/A
      </div>
    );
  }
  return (
    <div className="text-center text-[13px] font-semibold text-orange">
      {value}
    </div>
  );
}

export function Comparison() {
  const { comparison } = siteConfig;
  const columnCount = 1 + 1 + comparison.competitors.length; // feature + GHQ + competitors
  const gridTemplate = `minmax(180px, 2fr) repeat(${columnCount - 1}, minmax(100px, 1fr))`;

  return (
    <section className="py-[100px] section-grid-bg" id="compare">
      <div className="max-w-[1180px] mx-auto px-6">
        <SectionHeader
          label={comparison.label}
          title={comparison.title}
          titleAccent={comparison.titleAccent}
          subhead={comparison.subhead}
          center
        />

        <div className="mt-15 rounded-[14px] border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[720px]">
              <div
                className="grid bg-bg-card-2 px-4 md:px-7 py-5 gap-3 md:gap-5"
                style={{ gridTemplateColumns: gridTemplate }}
              >
                <div className="font-condensed text-[13px] md:text-[15px] font-extrabold uppercase tracking-[0.5px]">
                  Feature
                </div>
                <div className="font-condensed text-[13px] md:text-[15px] font-extrabold uppercase tracking-[0.5px] text-center text-orange">
                  {siteConfig.name}
                </div>
                {comparison.competitors.map((name) => (
                  <div
                    key={name}
                    className="font-condensed text-[13px] md:text-[15px] font-extrabold uppercase tracking-[0.5px] text-center"
                  >
                    {name}
                  </div>
                ))}
              </div>

              {comparison.rows.map((row) => (
                <div
                  key={row.feature}
                  className="grid px-4 md:px-7 py-4 gap-3 md:gap-5 border-t border-border items-center hover:bg-text/[0.02] transition-colors"
                  style={{ gridTemplateColumns: gridTemplate }}
                >
                  <div className="text-[13px] md:text-sm text-text">
                    {row.feature}
                  </div>
                  <div>
                    <Cell value={row.gridironhq} inverted={row.inverted} />
                    {row.gridironhqNote && (
                      <div className="text-center text-[10px] text-text-muted mt-1 italic">
                        ({row.gridironhqNote})
                      </div>
                    )}
                  </div>
                  {row.competitors.map((value, i) => (
                    <Cell
                      key={i}
                      value={value}
                      inverted={row.inverted}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-text-muted italic mt-6 max-w-[720px] mx-auto leading-relaxed">
          Evaluated against the leading fantasy tools including FantasyPros,
          PFF, Draft Sharks, StatChasers, RosterAudit, Establish the Run, and
          others. GridironHQ is the only product that combines personalized AI
          advice, complete league history, multi-league portfolio management,
          and league dues tracking in one subscription.
        </p>
      </div>
    </section>
  );
}
