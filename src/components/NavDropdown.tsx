"use client";

import { useEffect, useId, useRef, useState } from "react";

export type NavDropdownItem = {
  label: string;
  href: string;
  // Leaves this site (the app). Rendered with a visible ↗ and a screen-reader
  // note so nobody is surprised by the domain change.
  external?: boolean;
};

// A single header-nav dropdown (used for "Free Tools"). WAI-ARIA menu-button
// pattern: the trigger is a real <button> with aria-haspopup/aria-expanded;
// the panel is role="menu" of role="menuitem" links. Opens on click, Enter,
// Space or ArrowDown; Arrow keys move between items; Escape closes and returns
// focus to the trigger; clicking outside or tabbing out closes. Desktop-only
// like every other nav item; below the `nav` breakpoint MobileMenu.tsx lists
// the same items flat under a heading.
export function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: readonly NavDropdownItem[];
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [open]);

  function focusItem(index: number) {
    const count = items.length;
    const el = itemRefs.current[((index % count) + count) % count];
    el?.focus();
  }

  function openAndFocus(index: number) {
    setOpen(true);
    // The items mount on the next paint; focus after React has committed.
    requestAnimationFrame(() => focusItem(index));
  }

  function close(returnFocus: boolean) {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }

  function onTriggerKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openAndFocus(0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      openAndFocus(items.length - 1);
    }
  }

  function onMenuKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
    const current = itemRefs.current.findIndex(
      (el) => el === document.activeElement,
    );
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusItem(current + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusItem(current - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusItem(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusItem(items.length - 1);
    }
  }

  function onRootKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape" && open) {
      e.preventDefault();
      close(true);
    }
  }

  // Tabbing (or any focus move) out of the dropdown closes it.
  function onRootBlur(e: React.FocusEvent<HTMLDivElement>) {
    if (
      open &&
      rootRef.current &&
      !rootRef.current.contains(e.relatedTarget as Node | null)
    ) {
      setOpen(false);
    }
  }

  return (
    <div
      ref={rootRef}
      className="relative hidden nav:block"
      onKeyDown={onRootKeyDown}
      onBlur={onRootBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => (open ? close(false) : setOpen(true))}
        onKeyDown={onTriggerKeyDown}
        className={`inline-flex items-center gap-1 whitespace-nowrap text-sm font-medium transition-colors cursor-pointer bg-transparent border-0 p-0 hover:text-orange focus-visible:outline-2 focus-visible:outline-orange focus-visible:outline-offset-4 rounded-sm ${
          open ? "text-orange" : "text-text-muted"
        }`}
      >
        {label}
        <span
          aria-hidden="true"
          className={`text-[10px] transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>

      {open && (
        <ul
          id={menuId}
          role="menu"
          aria-label={label}
          onKeyDown={onMenuKeyDown}
          className="absolute left-0 top-full mt-3 min-w-[240px] list-none m-0 p-1.5 rounded-lg border border-border bg-bg-card shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
        >
          {items.map((item, i) => (
            <li key={item.href} role="none">
              <a
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                role="menuitem"
                tabIndex={-1}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm text-text-muted no-underline transition-colors hover:bg-bg-card-2 hover:text-orange focus-visible:bg-bg-card-2 focus-visible:text-orange focus-visible:outline-none"
              >
                <span>{item.label}</span>
                {item.external && (
                  <>
                    <span aria-hidden="true" className="text-[11px] text-text-faint">
                      ↗
                    </span>
                    <span className="sr-only"> (opens the GridironHQ app)</span>
                  </>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
