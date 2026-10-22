import { ImageResponse } from "next/og";
import { aboutSection, heroCopy } from "@/lib/data";

export const alt = `${aboutSection.portrait.name} — ${heroCopy.headline.first} ${heroCopy.headline.second} ${heroCopy.headline.accent}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "80px",
          background: "#0a0e18",
          color: "#f3f6ff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#8dc2ff" }}>
          {heroCopy.headline.first}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {heroCopy.headline.second} {heroCopy.headline.accent}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#9aa5c4" }}>
            {heroCopy.subcopy}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
          {aboutSection.portrait.name}
        </div>
      </div>
    ),
    { ...size }
  );
}
