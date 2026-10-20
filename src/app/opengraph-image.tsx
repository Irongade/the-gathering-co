import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

export const alt = `${SITE.name}, ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand colours repeated here because next/og renders outside the CSS pipeline.
const cream = "#f7f1ea";
const cocoa = "#3b2a1e";
const tan = "#a8865f";
const sage = "#5f6f4e";
const linen = "#efe3d6";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: cream,
        color: cocoa,
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 56,
        }}
      >
        <div
          style={{
            width: 300,
            height: 300,
            borderRadius: 999,
            border: `6px solid ${tan}`,
            background: linen,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <div style={{ fontSize: 44, fontStyle: "italic", color: tan }}>The</div>
          <div style={{ fontSize: 40, letterSpacing: 4 }}>GATHERING</div>
          <div style={{ fontSize: 40, letterSpacing: 4 }}>CO.</div>
          <div style={{ fontSize: 16, letterSpacing: 6, color: sage, marginTop: 10 }}>EVENT HIRE</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 620 }}>
          <div style={{ fontSize: 22, letterSpacing: 6, color: tan, marginBottom: 18 }}>EVENT HIRE</div>
          <div style={{ fontSize: 64, lineHeight: 1.08 }}>{SITE.tagline}</div>
          <div style={{ fontSize: 26, color: sage, marginTop: 24, fontFamily: "Helvetica, Arial, sans-serif" }}>
            {SITE.area}
          </div>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
