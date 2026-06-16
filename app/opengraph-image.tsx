import { ImageResponse } from "next/og"

export const dynamic = "force-static"

export const alt =
  "browse.pro.bd — Discover Bangladeshi developers and open-source creations"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(to bottom right, #09090b, #18181b)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      {/* Abstract pattern / grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          backgroundImage:
            "radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          padding: "40px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "24px",
          background: "rgba(255, 255, 255, 0.05)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          style={{
            fontSize: "80px",
            fontWeight: 800,
            color: "white",
            letterSpacing: "-0.05em",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          browse.pro.bd
        </div>

        <div
          style={{
            fontSize: "36px",
            color: "#a1a1aa",
            textAlign: "center",
            maxWidth: "800px",
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          Discover Bangladeshi developers and open-source creations
        </div>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "16px",
          }}
        >
          {["Projects", "Portfolios", "Tools", "Libraries"].map((item) => (
            <div
              key={item}
              style={{
                background: "rgba(16, 185, 129, 0.1)",
                color: "#34d399",
                padding: "8px 24px",
                borderRadius: "9999px",
                fontSize: "24px",
                fontWeight: 600,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  )
}
