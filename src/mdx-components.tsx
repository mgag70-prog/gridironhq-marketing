import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Global MDX element mapping — this is where blog post typography lives.
 *
 * Required by `@next/mdx` with the App Router; MDX will not compile without it.
 * In Next 16 `useMDXComponents` takes NO arguments (older tutorials pass a
 * `components` object in and merge it — that signature is gone).
 *
 * Type scale mirrors SectionHeader.tsx and globals.css so a post reads as part
 * of the site: Bebas Neue (--font-display) for headings, DM Sans for body, the
 * orange accent for rules and links, semantic tokens for everything else.
 */

type Props<T extends keyof React.JSX.IntrinsicElements> =
  ComponentPropsWithoutRef<T>;

/**
 * Merge our styling with any className MDX supplies.
 *
 * This matters: remark-gfm emits `contains-task-list` / `task-list-item` on
 * lists and `language-*` on fenced code. Spreading {...props} after a bare
 * className= silently REPLACES our styling on exactly those elements.
 */
const cx = (...parts: (string | undefined | false)[]) =>
  parts.filter(Boolean).join(" ");

const components: MDXComponents = {
  // Post title. Matches the SectionHeader h2 treatment (the largest display
  // size used on the site) since a post title is the page's primary heading.
  h1: ({ className, ...props }: Props<"h1">) => (
    <h1
      className={cx(
        "font-display text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[1px] uppercase text-text mt-0 mb-6",
        className,
      )}
      {...props}
    />
  ),

  // Section heading. The short orange rule above it is the SectionHeader motif,
  // scaled down so it reads as a section break inside prose rather than a new page.
  h2: ({ className, ...props }: Props<"h2">) => (
    <h2
      className={cx(
        "font-display text-[clamp(28px,3.2vw,40px)] leading-[1.15] tracking-[1px] uppercase text-text mt-14 mb-4",
        "before:content-[''] before:block before:w-10 before:h-0.5 before:bg-orange before:mb-4",
        className,
      )}
      {...props}
    />
  ),

  // Sub-heading. Condensed/uppercase like the footer column headings.
  h3: ({ className, ...props }: Props<"h3">) => (
    <h3
      className={cx(
        "font-condensed text-[19px] font-bold uppercase tracking-[0.5px] text-text mt-10 mb-3",
        className,
      )}
      {...props}
    />
  ),

  h4: ({ className, ...props }: Props<"h4">) => (
    <h4
      className={cx(
        "font-condensed text-[15px] font-bold uppercase tracking-[0.5px] text-text-muted mt-8 mb-2",
        className,
      )}
      {...props}
    />
  ),

  // Body copy uses --text, not --text-muted. Muted is right for one-line
  // subheads next to a big headline, but too low-contrast for long reading.
  p: ({ className, ...props }: Props<"p">) => (
    <p
      className={cx("text-[17px] leading-[1.75] text-text my-5", className)}
      {...props}
    />
  ),

  a: ({ className, ...props }: Props<"a">) => (
    <a
      className={cx(
        "text-orange underline decoration-orange/40 underline-offset-[3px] transition-colors hover:decoration-orange focus-visible:outline-2 focus-visible:outline-orange focus-visible:outline-offset-2",
        className,
      )}
      {...props}
    />
  ),

  strong: ({ className, ...props }: Props<"strong">) => (
    <strong className={cx("font-bold text-text", className)} {...props} />
  ),

  em: ({ className, ...props }: Props<"em">) => (
    <em className={cx("italic", className)} {...props} />
  ),

  // Orange dash markers instead of default bullets. Task lists opt out of the
  // dash via .contains-task-list rules in globals.css.
  ul: ({ className, ...props }: Props<"ul">) => (
    <ul
      className={cx(
        "mdx-ul my-5 pl-6 list-none flex flex-col gap-2.5",
        className,
      )}
      {...props}
    />
  ),

  ol: ({ className, ...props }: Props<"ol">) => (
    <ol
      className={cx(
        "my-5 pl-6 list-decimal marker:text-orange marker:font-bold flex flex-col gap-2.5",
        className,
      )}
      {...props}
    />
  ),

  li: ({ className, ...props }: Props<"li">) => (
    <li
      className={cx("text-[17px] leading-[1.7] text-text", className)}
      {...props}
    />
  ),

  blockquote: ({ className, ...props }: Props<"blockquote">) => (
    <blockquote
      className={cx(
        "my-8 py-4 px-5 border-l-2 border-orange bg-bg-card rounded-r-lg text-[17px] leading-[1.7] text-text-muted italic [&>p]:my-0",
        className,
      )}
      {...props}
    />
  ),

  // Inline code only. Fenced blocks arrive with a `language-*` class and are
  // styled by the <pre> wrapper instead — applying the inline chip styling
  // there would fight the block background.
  code: ({ className, ...props }: Props<"code">) => {
    const isFenced = className?.includes("language-");
    return (
      <code
        className={cx(
          !isFenced &&
            "font-mono text-[0.88em] bg-bg-card-2 text-orange px-1.5 py-0.5 rounded border border-border-soft",
          className,
        )}
        {...props}
      />
    );
  },

  // Wraps rather than scrolls. In prose, a horizontally scrolling block silently
  // hides the end of the line — the archive-schema blocks were being clipped
  // mid-word with no affordance. Wrapping guarantees nothing is hidden;
  // overflow-x-auto stays as a fallback for anything unbreakable.
  pre: ({ className, ...props }: Props<"pre">) => (
    <pre
      className={cx(
        "my-7 p-5 rounded-lg bg-bg-card border border-border overflow-x-auto text-[14px] leading-[1.6] text-text",
        "whitespace-pre-wrap break-words",
        className,
      )}
      {...props}
    />
  ),

  table: ({ className, ...props }: Props<"table">) => (
    <div className="my-7 overflow-x-auto rounded-lg border border-border">
      <table
        className={cx("w-full border-collapse text-[15px]", className)}
        {...props}
      />
    </div>
  ),

  thead: ({ className, ...props }: Props<"thead">) => (
    <thead className={cx("bg-bg-card-2", className)} {...props} />
  ),

  th: ({ className, ...props }: Props<"th">) => (
    <th
      className={cx(
        "text-left font-condensed text-[13px] font-bold uppercase tracking-[0.5px] text-text px-4 py-3 border-b border-border",
        className,
      )}
      {...props}
    />
  ),

  td: ({ className, ...props }: Props<"td">) => (
    <td
      className={cx(
        "px-4 py-3 border-b border-border-soft text-text align-top leading-[1.6]",
        className,
      )}
      {...props}
    />
  ),

  // Matches the Divider() used between homepage sections.
  hr: ({ className, ...props }: Props<"hr">) => (
    <hr
      className={cx("my-12 h-px border-0", className)}
      style={{
        background:
          "linear-gradient(90deg, transparent, var(--border), transparent)",
      }}
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
