import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const monogram = path.join(process.cwd(), "public", "brand", "monogram-pieces.svg");

/** Shared 1200x630 share image: dark canvas, mint glow, monogram, title and an accent line. */
export async function ogCard({ eyebrow, title, accent }: { eyebrow: string; title: string; accent?: string }) {
  const svg = (await readFile(monogram, "utf8")).replace('fill="currentColor"', 'fill="#4bffa5"');
  const logo = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "radial-gradient(900px 500px at 50% -10%, rgba(75,255,165,0.22), #07080a 70%)",
          color: "#f4f6f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={42} height={46} alt="" />
          <span style={{ fontSize: 30, fontWeight: 600 }}>Dada Daniels</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              display: "flex",
              alignSelf: "flex-start",
              fontSize: 24,
              color: "#a3a9b1",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 999,
              padding: "8px 20px",
            }}
          >
            {eyebrow}
          </span>
          <span style={{ marginTop: 26, fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2.5 }}>{title}</span>
          {accent && (
            <span style={{ marginTop: 10, fontSize: 64, fontStyle: "italic", color: "#4bffa5", letterSpacing: -1 }}>
              {accent}
            </span>
          )}
        </div>
        <span style={{ fontSize: 24, color: "#7d848e" }}>WordPress · Full Stack · No-Code · Event Tech</span>
      </div>
    ),
    ogSize,
  );
}
