"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "./ThemeToggle";

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
      <div className="max-w-[1180px] mx-auto h-full flex items-center gap-8">
        <Link
          href="/"
          className="font-display text-[26px] tracking-[2px] no-underline"
        >
          <span className="text-orange">GRIDIRON</span>
          <span className="text-text">HQ</span>
        </Link>
        <div className="flex gap-6 ml-auto items-center">
          {siteConfig.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden md:inline text-sm font-medium text-text-muted hover:text-orange transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={siteConfig.nav.signInHref}
            className="hidden md:inline text-sm font-medium text-text-muted hover:text-orange transition-colors"
          >
            Sign In
          </a>
          <ThemeToggle />
          <a href={siteConfig.nav.ctaHref} className="btn btn-primary btn-small">
            {siteConfig.nav.ctaLabel}
          </a>
        </div>
      </div>
    </nav>
  );
}
