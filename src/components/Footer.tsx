import { siteConfig } from "@/config/site";

export function Footer() {
  const { footer, contact, company } = siteConfig;

  return (
    <footer className="bg-bg-card border-t border-border pt-15 pb-8 relative z-10">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-10">
          <div className="max-w-[280px]">
            <a href="#" className="font-display text-[28px] tracking-[2px] no-underline block mb-3">
              <span className="text-orange">GRIDIRON</span>
              <span className="text-text">HQ</span>
            </a>
            <p className="text-[13px] text-text-muted leading-[1.65] mb-4">
              {footer.tagline}
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="text-[13px] text-orange no-underline"
            >
              {contact.email}
            </a>
          </div>

          {footer.columns.map((col) => (
            <div key={col.heading}>
              <h4 className="font-condensed text-[13px] font-bold uppercase tracking-[0.5px] text-text mb-3.5">
                {col.heading}
              </h4>
              <ul className="list-none flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-text-muted no-underline text-[13px] transition-colors hover:text-orange"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 flex justify-between items-center gap-5 flex-wrap">
          <p className="text-xs text-text-faint">{company.copyright}</p>
          <div className="flex gap-5">
            {footer.legal.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs text-text-faint no-underline hover:text-text-muted transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
