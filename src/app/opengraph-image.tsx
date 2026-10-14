import { site } from "@/data/site";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#faf9f5",
          color: "#141413",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#d97757",
            marginBottom: 24,
            fontWeight: 600,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 500,
            lineHeight: 1.1,
            maxWidth: 900,
            fontFamily: "Georgia, serif",
          }}
        >
          {site.title}
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#6b6a64",
            marginTop: 32,
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
