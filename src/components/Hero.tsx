import { siteConfig } from "@/config/site";

export function Hero() {
  const { hero } = siteConfig;

  return (
    <section className="relative min-h-screen flex items-center pt-[100px] pb-[60px] overflow-hidden section-grid-bg">
      <div
        aria-hidden="true"
        className="absolute -top-[200px] -right-[200px] w-[700px] h-[700px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-[100px] -left-[100px] w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(42,92,184,0.12) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-[1180px] mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-15 items-center relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-5 animate-fadeup">
              <div className="w-2 h-2 rounded-full bg-orange shadow-[0_0_10px_var(--orange)] pulse-dot" />
              <span className="font-condensed text-[13px] font-bold uppercase tracking-[1px] text-orange">
                {hero.eyebrow}
              </span>
            </div>

            <h1 className="font-display text-[clamp(52px,6vw,80px)] leading-none tracking-[2px] uppercase mb-5 animate-fadeup delay-1">
              {hero.headline.lines.map((line, i) => (
                <span key={i} className="block">
                  {line === hero.headline.accentLine ? (
                    <span className="text-orange">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>

            <p className="text-[18px] leading-[1.7] text-text-muted max-w-[500px] mb-9 animate-fadeup delay-2">
              {hero.subhead}
            </p>

            <div className="flex flex-wrap gap-3.5 mb-10 animate-fadeup delay-3">
              <a href={hero.primaryCta.href} className="btn btn-primary btn-large">
                {hero.primaryCta.label} →
              </a>
              <a href={hero.secondaryCta.href} className="btn btn-outline btn-large">
                {hero.secondaryCta.label}
              </a>
            </div>

            <div className="flex items-center gap-4 animate-fadeup delay-4">
              <div className="flex">
                {hero.avatars.map((initials, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-navy-4 to-navy-5 border-2 border-bg flex items-center justify-center font-condensed text-[11px] font-bold text-orange"
                    style={{ marginLeft: i === 0 ? 0 : "-8px" }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-[13px] text-text-muted">
                <strong className="text-text">200 founding member spots</strong>{" "}
                — first 200 commissioners lock in $4.99/mo for life
              </p>
            </div>
          </div>

          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}

function DashboardMockup() {
  return (
    <div
      className="relative rounded-[14px] overflow-hidden bg-bg-card border border-border lg:[transform:perspective(1000px)_rotateY(-3deg)_rotateX(2deg)] animate-fadeup delay-2"
      style={{
        boxShadow:
          "0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(255,107,0,0.08)",
      }}
    >
      <div className="bg-bg-card-2 px-3.5 py-2.5 flex items-center gap-2 border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="ml-2 font-display text-sm tracking-[1px]">
          <span className="text-orange">GRIDIRON</span>HQ
        </div>
      </div>

      <div className="grid grid-cols-[180px_1fr] h-[340px]">
        <div className="bg-bg-card p-3 border-r border-border">
          {[
            { label: "Dashboard", active: true },
            { label: "My Team" },
            { label: "SCOUT" },
            { label: "Trades" },
            { label: "Wire" },
            { label: "League Intel" },
            { label: "Draft Center" },
            { label: "Treasury" },
          ].map((item) => (
            <div
              key={item.label}
              className={`px-2.5 py-1.5 rounded-md text-[11px] font-medium mb-0.5 flex items-center gap-2 ${
                item.active
                  ? "bg-orange/10 text-orange"
                  : "text-text-muted"
              }`}
            >
              <div className="w-3.5 h-3.5 rounded-[2px] opacity-40 bg-current" />
              {item.label}
            </div>
          ))}
        </div>

        <div className="p-3.5 overflow-hidden">
          <div className="grid grid-cols-4 gap-2 mb-2.5">
            {[
              { val: "134.2", lbl: "Proj Pts", color: "text-orange" },
              { val: "108.4", lbl: "Opp Proj", color: "text-text-muted" },
              { val: "73%", lbl: "Win Prob", color: "text-green" },
              { val: "16.3%", lbl: "Champ %", color: "text-orange" },
            ].map((stat) => (
              <div
                key={stat.lbl}
                className="bg-bg-card-2 rounded-md p-2 border border-border-soft"
              >
                <div
                  className={`font-condensed text-lg font-extrabold ${stat.color}`}
                >
                  {stat.val}
                </div>
                <div className="text-[9px] text-text-muted uppercase tracking-[0.5px] mt-0.5">
                  {stat.lbl}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-green/10 border border-green/20 rounded-md px-2.5 py-2 mb-2.5 flex items-center gap-2">
            <span>🎯</span>
            <div className="text-[11px]">
              <strong className="text-green">
                +2.1% championship equity
              </strong>{" "}
              <span className="text-text-muted">
                — start Williams over Gibbs this week
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-bg-card-2 rounded-md p-2.5 border border-border-soft">
              <div className="font-condensed text-[10px] font-bold uppercase tracking-[0.5px] text-orange mb-1.5">
                Starting Lineup
              </div>
              {[
                { pos: "QB", name: "J. Hurts", pts: "26.8" },
                { pos: "RB", name: "B. Robinson", pts: "19.4" },
                { pos: "WR", name: "C. Lamb", pts: "18.3" },
                { pos: "TE", name: "S. LaPorta", pts: "11.2" },
              ].map((p) => (
                <div
                  key={p.pos}
                  className="flex items-center gap-1.5 py-1 border-b border-border-soft last:border-0"
                >
                  <div className="font-condensed text-[9px] font-bold min-w-[22px] text-orange">
                    {p.pos}
                  </div>
                  <div className="text-[10px] flex-1">{p.name}</div>
                  <div className="font-condensed text-xs font-bold text-orange">
                    {p.pts}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-bg-card-2 rounded-md p-2.5 border border-border-soft">
              <div className="font-condensed text-[10px] font-bold uppercase tracking-[0.5px] text-orange mb-1.5">
                SCOUT Alerts
              </div>
              {[
                {
                  tag: "⚠ SWAP",
                  color: "text-red",
                  text: "Williams (BN) outprojects Gibbs by 1.7 pts",
                },
                {
                  tag: "🤝 DECLINE",
                  color: "text-orange",
                  text: "Trade offer costs 4.4% champ equity",
                },
                {
                  tag: "📋 ADD",
                  color: "text-green",
                  text: "Kareem Hunt — Fit 91, +3.4% champ EV",
                },
              ].map((alert) => (
                <div
                  key={alert.tag}
                  className="flex flex-col items-start gap-0.5 py-1 border-b border-border-soft last:border-0"
                >
                  <div className={`text-[9px] font-bold ${alert.color}`}>
                    {alert.tag}
                  </div>
                  <div className="text-[10px]">{alert.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
