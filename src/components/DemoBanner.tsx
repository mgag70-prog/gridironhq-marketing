import { siteConfig } from "@/config/site";

export function DemoBanner() {
  const { demoBanner } = siteConfig;

  return (
    <section className="py-15 section-grid-bg">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="bg-gradient-to-br from-bg-card to-bg-card-2 border border-orange/20 rounded-2xl p-10 md:p-15 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden text-center md:text-left">
          <div
            aria-hidden="true"
            className="absolute -right-[100px] top-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255,107,0,0.08), transparent 60%)",
            }}
          />
          <div className="relative">
            <h2 className="font-display text-4xl uppercase tracking-[1px] mb-2.5">
              {demoBanner.title.split(demoBanner.titleAccent).map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="text-orange">{demoBanner.titleAccent}</span>
                  )}
                </span>
              ))}
            </h2>
            <p className="text-base text-text-muted max-w-[480px]">
              {demoBanner.description}
            </p>
          </div>
          <div className="flex-shrink-0 relative">
            <a href={demoBanner.cta.href} className="btn btn-primary btn-large">
              {demoBanner.cta.label} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
