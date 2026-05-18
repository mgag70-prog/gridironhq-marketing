import { siteConfig } from "@/config/site";
import { SectionHeader } from "./SectionHeader";

function Cell({ value }: { value: string }) {
  if (value === "yes") {
    return <div className="text-center text-lg text-green">✓</div>;
  }
  if (value === "no") {
    return <div className="text-center text-lg text-red opacity-60">✗</div>;
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

        <div className="mt-15 rounded-[14px] overflow-hidden border border-border">
          <div className="grid grid-cols-[2fr_1fr_1fr] bg-bg-card-2 px-4 md:px-7 py-5 gap-3 md:gap-5">
            <div className="font-condensed text-[13px] md:text-[15px] font-extrabold uppercase tracking-[0.5px]">
              Feature
            </div>
            <div className="font-condensed text-[13px] md:text-[15px] font-extrabold uppercase tracking-[0.5px] text-center text-orange">
              {siteConfig.name}
            </div>
            <div className="font-condensed text-[13px] md:text-[15px] font-extrabold uppercase tracking-[0.5px] text-center">
              {comparison.competitor}
            </div>
          </div>

          {comparison.rows.map((row) => (
            <div
              key={row.feature}
              className="grid grid-cols-[2fr_1fr_1fr] px-4 md:px-7 py-4 gap-3 md:gap-5 border-t border-border items-center hover:bg-text/[0.02] transition-colors"
            >
              <div className="text-[13px] md:text-sm text-text">
                {row.feature}
              </div>
              <Cell value={row.gridironhq} />
              <Cell value={row.competitor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
