"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "./ThemeToggle";
import { NavDropdown } from "./NavDropdown";
import { MobileMenu } from "./MobileMenu";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 px-6 backdrop-blur-xl border-b border-border transition-colors"
      style={{
        background: scrolled
          ? "var(--nav-bg-scrolled)"
          : "var(--nav-bg)",
      }}
    >
      {/* Phone widths (<sm): the wordmark, CTA and hamburger must fit 342px at
          390 wide — tighter gaps, a smaller wordmark, and the theme toggle
          moves into the menu panel (MobileMenu.tsx). Measured 2026-09-01:
          the pre-existing header already overflowed by 18px at 390. */}
      <div className="max-w-[1180px] mx-auto h-full flex items-center gap-3 sm:gap-8">
        <Link
          href="/"
          className="font-display text-[20px] sm:text-[26px] tracking-[2px] no-underline"
        >
          <span className="text-orange">GRIDIRON</span>
          <span className="text-text">HQ</span>
        </Link>
        <div className="flex gap-3 sm:gap-6 ml-auto items-center">
          {siteConfig.nav.links.map((link) =>
            "items" in link ? (
              <NavDropdown key={link.label} label={link.label} items={link.items} />
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="hidden nav:inline text-sm font-medium text-text-muted hover:text-orange transition-colors"
              >
                {link.label}
              </a>
            ),
          )}
          <a
            href={siteConfig.nav.signInHref}
            className="hidden nav:inline text-sm font-medium text-text-muted hover:text-orange transition-colors"
          >
            Sign In
          </a>
          <span className="hidden sm:flex">
            <ThemeToggle />
          </span>
          <a href={siteConfig.nav.ctaHref} className="btn btn-primary btn-small max-sm:px-3">
            {siteConfig.nav.ctaLabel}
          </a>
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
