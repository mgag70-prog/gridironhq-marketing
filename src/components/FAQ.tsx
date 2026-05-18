import { siteConfig } from "@/config/site";
import { SectionHeader } from "./SectionHeader";

export function FAQ() {
  const { faq } = siteConfig;

  return (
    <section className="py-[100px] section-grid-bg" id="faq">
      <div className="max-w-[1180px] mx-auto px-6">
        <SectionHeader
          label={faq.label}
          title={faq.title}
          titleAccent={faq.titleAccent}
          center
        />

        <div className="grid md:grid-cols-2 gap-4 mt-15">
          {faq.items.map((item) => (
            <div
              key={item.question}
              className="bg-bg-card border border-border rounded-[10px] p-6"
            >
              <div className="font-condensed text-base font-bold uppercase tracking-[0.3px] text-text mb-2.5 flex items-start gap-2.5">
                <span className="text-orange flex-shrink-0">Q</span>
                <span>{item.question}</span>
              </div>
              <p className="text-sm text-text-muted leading-[1.7]">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
