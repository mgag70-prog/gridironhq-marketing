import { siteConfig } from "@/config/site";
import { SectionHeader } from "./SectionHeader";

export function Testimonials() {
  const { testimonials } = siteConfig;

  return (
    <section className="py-[100px] section-grid-bg" id="testimonials">
      <div className="max-w-[1180px] mx-auto px-6">
        <SectionHeader
          label={testimonials.label}
          title={testimonials.title}
          titleAccent={testimonials.titleAccent}
          center
        />

        <div className="grid md:grid-cols-3 gap-5 mt-15">
          {testimonials.items.map((t) => (
            <div
              key={t.author}
              className="bg-bg-card border border-border rounded-xl p-7"
            >
              <div className="text-orange text-sm tracking-[2px] mb-3.5">
                ★★★★★
              </div>
              <p className="text-sm leading-[1.75] text-text mb-5 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy-4 to-orange flex items-center justify-center font-condensed font-bold text-sm text-white">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-text">
                    {t.author}
                  </div>
                  <div className="text-xs text-text-muted">{t.meta}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
