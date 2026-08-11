import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GITBootcamp";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2563eb",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, display: "flex" }}>
          GITBootcamp
        </div>
        <div style={{ fontSize: 32, marginTop: 20, opacity: 0.9, display: "flex" }}>
          Code your way into tech
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}