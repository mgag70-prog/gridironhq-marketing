import { siteConfig } from "@/config/site";

export function ProofBar() {
  return (
    <div className="bg-bg-card border-y border-border py-5 relative z-10">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="flex justify-center gap-x-12 gap-y-6 flex-wrap">
          {siteConfig.proofStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-[32px] text-orange leading-none">
                {stat.value}
              </div>
              <div className="text-xs text-text-muted uppercase tracking-[0.5px] mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
