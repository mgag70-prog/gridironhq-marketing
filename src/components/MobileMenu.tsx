"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "./ThemeToggle";

// The header's mobile menu. Below the `nav` breakpoint (globals.css) the
// desktop links are hidden; this hamburger opens a full-screen panel with
// the SAME items in the SAME order — links, the Free Tools group, Sign In,
// the trial button — read from siteConfig.nav, so the two can't drift.
//
// The Free Tools group renders flat under a heading rather than as a nested
// disclosure: on a phone there is room to scroll, and one tap beats two.
//
// Accessibility: the trigger is a labelled <button> with aria-expanded /
// aria-controls; the panel is role="dialog" aria-modal="true"; focus moves
// into the panel on open, Tab and Shift+Tab cycle inside it (a trap), Escape
// or the backdrop closes and focus returns to the trigger; body scroll is
// locked while open. Links close the panel on click so in-page hash links
// (/#pricing) don't leave it covering the target.
//
// The panel is PORTALED to document.body. The <nav> has backdrop-blur, and a
// backdrop-filter makes its element the containing block for fixed
// descendants — a `fixed top-16 bottom-0` panel inside the 64px nav computed
// to 0px tall (observed 2026-09-01). Rendering it under <body> makes the
// viewport the containing block again.

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  function close(returnFocus: boolean) {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }

  // Open: lock scroll, move focus in. Close/unmount: restore scroll.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function onPanelKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      close(true);
      return;
    }
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusable = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  const linkClass =
    "block py-3 text-lg font-medium text-text no-underline transition-colors hover:text-orange focus-visible:text-orange focus-visible:outline-none";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? close(false) : setOpen(true))}
        className="nav:hidden flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-text-muted transition-colors hover:border-orange hover:text-orange focus-visible:outline-2 focus-visible:outline-orange focus-visible:outline-offset-2 cursor-pointer bg-transparent"
      >
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {open ? (
            <>
              <path d="M3 3l12 12" />
              <path d="M15 3L3 15" />
            </>
          ) : (
            <>
              <path d="M2 4.5h14" />
              <path d="M2 9h14" />
              <path d="M2 13.5h14" />
            </>
          )}
        </svg>
      </button>

      {open &&
        createPortal(
        <div
          className="nav:hidden fixed inset-x-0 top-16 bottom-0 z-40"
          onClick={() => close(false)}
        >
          {/* The panel; clicks inside must not reach the backdrop handler. */}
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            onKeyDown={onPanelKeyDown}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 overflow-y-auto bg-bg border-t border-border px-6 py-4"
          >
            <nav aria-label="Mobile">
              <ul className="list-none m-0 p-0 divide-y divide-border-soft">
                {siteConfig.nav.links.map((link) =>
                  "items" in link ? (
                    <li key={link.label} className="py-2">
                      <p className="pt-2 pb-1 text-xs font-condensed font-bold uppercase tracking-[2px] text-text-muted">
                        {link.label}
                      </p>
                      <ul className="list-none m-0 p-0">
                        {link.items.map((item) => (
                          <li key={item.href}>
                            <a
                              href={item.href}
                              onClick={() => close(false)}
                              className={`${linkClass} flex items-center justify-between gap-3`}
                            >
                              <span>{item.label}</span>
                              {"external" in item && item.external && (
                                <>
                                  <span
                                    aria-hidden="true"
                                    className="text-sm text-text-faint"
                                  >
                                    ↗
                                  </span>
                                  <span className="sr-only">
                                    {" "}
                                    (opens the GridironHQ app)
                                  </span>
                                </>
                              )}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => close(false)}
                        className={linkClass}
                      >
                        {link.label}
                      </a>
                    </li>
                  ),
                )}
                <li>
                  <a
                    href={siteConfig.nav.signInHref}
                    onClick={() => close(false)}
                    className={linkClass}
                  >
                    Sign In
                  </a>
                </li>
                {/* Below sm the header has no room for the theme toggle; it
                    lives here instead. Above sm the header keeps it. */}
                <li className="sm:hidden flex items-center justify-between py-3">
                  <span className="text-lg font-medium text-text">Theme</span>
                  <ThemeToggle />
                </li>
              </ul>
              <a
                href={siteConfig.nav.ctaHref}
                onClick={() => close(false)}
                className="btn btn-primary w-full mt-6"
              >
                {siteConfig.nav.ctaLabel}
              </a>
            </nav>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
