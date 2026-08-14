import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Shared 1200x630 OG card renderer, in the site's navy/orange system.
 *
 * Used by both the per-post route (app/og/[slug]/route.tsx) and the site-wide
 * default (app/opengraph-image.tsx), so every shared URL gets a real image
 * instead of the blank large-image card the site was serving before.
 *
 * Implementation notes for editing this safely:
 *  - Satori (what next/og renders with) cannot read woff2, which is the only
 *    format next/font/google exposes. Hence the vendored .ttf in src/assets.
 *  - The grid texture is drawn as explicit divs. Satori's support for
 *    repeating-linear-gradient with background-size is unreliable; 30 absolutely
 *    positioned 1px divs always work.
 *  - Every container sets display explicitly. Satori requires it on any element
 *    with multiple children.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

const NAVY = "#030d1c";
const NAVY_2 = "#071428";
const ORANGE = "#ff6b00";
const OFF_WHITE = "#e8eef8";
const MUTED = "#7d9abf";
const GRID_LINE = "rgba(255,255,255,0.035)";

const GRID_STEP = 60;

/** Long headlines need to step down or they overflow the card. */
function titleSize(title: string): number {
  if (title.length > 85) return 62;
  if (title.length > 60) return 72;
  if (title.length > 40) return 84;
  return 96;
}

function GridTexture() {
  const columns = Math.ceil(OG_SIZE.width / GRID_STEP);
  const rows = Math.ceil(OG_SIZE.height / GRID_STEP);
  return (
    <div style={{ display: "flex", position: "absolute", inset: 0 }}>
      {Array.from({ length: columns }, (_, i) => (
        <div
          key={`c${i}`}
          style={{
            position: "absolute",
            left: (i + 1) * GRID_STEP,
            top: 0,
            width: 1,
            height: OG_SIZE.height,
            background: GRID_LINE,
          }}
        />
      ))}
      {Array.from({ length: rows }, (_, i) => (
        <div
          key={`r${i}`}
          style={{
            position: "absolute",
            top: (i + 1) * GRID_STEP,
            left: 0,
            height: 1,
            width: OG_SIZE.width,
            background: GRID_LINE,
          }}
        />
      ))}
    </div>
  );
}

export async function renderOgCard({
  title,
  eyebrow,
  domain,
}: {
  title: string;
  eyebrow: string;
  domain: string;
}) {
  const bebas = await readFile(
    join(process.cwd(), "src/assets/fonts/BebasNeue-Regular.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px 80px",
          background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_2} 100%)`,
          position: "relative",
        }}
      >
        <GridTexture />

        {/* Orange edge accent — the one bit of chrome that makes the card
            recognisable as GridironHQ at thumbnail size. */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 10,
            height: OG_SIZE.height,
            background: ORANGE,
          }}
        />

        {/* flex:1 + centered keeps the title optically centred instead of
            stranding it at the top of the card on short headlines. */}
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", width: 48, height: 4, background: ORANGE }} />
            <div
              style={{
                display: "flex",
                fontSize: 24,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: ORANGE,
              }}
            >
              {eyebrow}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 34,
              fontFamily: "Bebas Neue",
              fontSize: titleSize(title),
              lineHeight: 1.02,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: OFF_WHITE,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Bebas Neue",
              fontSize: 46,
              letterSpacing: 3,
            }}
          >
            <div style={{ display: "flex", color: ORANGE }}>GRIDIRON</div>
            <div style={{ display: "flex", color: OFF_WHITE }}>HQ</div>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: MUTED }}>
            {domain}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        {
          name: "Bebas Neue",
          data: bebas,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
