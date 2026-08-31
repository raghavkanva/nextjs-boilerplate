import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "eTalVis Embedded Starter Pack: Electronics + C Programming Foundation Courses · ₹239";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [balajeeImg, iconImg] = await Promise.all([
    readFile(join(process.cwd(), "public/images/balajee-formal.png")),
    readFile(join(process.cwd(), "public/images/icon.png")),
  ]);

  const balajeeSrc = `data:image/png;base64,${balajeeImg.toString("base64")}`;
  const iconSrc = `data:image/png;base64,${iconImg.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          background: "#F7F7F2",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle dot-grid pattern via repeating radial gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, #D1D5DB 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            opacity: 0.45,
            display: "flex",
          }}
        />

        {/* Soft green bleed on right edge */}
        <div
          style={{
            position: "absolute",
            right: -60,
            top: -60,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,197,94,0.10) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Left green accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 6,
            background: "#15803D",
            display: "flex",
          }}
        />

        {/* ══════════════ LEFT CONTENT ══════════════ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 48px 60px 72px",
            width: 680,
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Brand row */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
              src={iconSrc}
              width={36}
              height={36}
              alt=""
              style={{ borderRadius: 6 }}
            />
            <span
              style={{
                color: "#15803D",
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: "0.01em",
              }}
            >
              eTalVis
            </span>
          </div>

          {/* Main content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {/* Eyebrow */}
            <span
              style={{
                color: "#64748B",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Embedded Starter Pack
            </span>

            {/* Big headline */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              <span
                style={{
                  fontSize: 64,
                  fontWeight: 900,
                  color: "#111827",
                  lineHeight: 1.0,
                  letterSpacing: "-0.03em",
                }}
              >
                The Right
              </span>
              <span
                style={{
                  fontSize: 64,
                  fontWeight: 900,
                  color: "#15803D",
                  lineHeight: 1.0,
                  letterSpacing: "-0.03em",
                }}
              >
                Foundation First.
              </span>
            </div>

            {/* Two course lines */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                marginTop: 4,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#22C55E",
                    display: "flex",
                  }}
                />
                <span style={{ fontSize: 17, color: "#374151", fontWeight: 600 }}>
                  Electronics Foundation Course
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#22C55E",
                    display: "flex",
                  }}
                />
                <span style={{ fontSize: 17, color: "#374151", fontWeight: 600 }}>
                  C Programming Foundation Course
                </span>
              </div>
            </div>
          </div>

          {/* Price + CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                background: "#FFC400",
                borderRadius: 100,
                padding: "13px 30px",
                fontSize: 20,
                fontWeight: 900,
                color: "#111827",
                border: "2px solid #111827",
                display: "flex",
                alignItems: "center",
              }}
            >
              Start Here · ₹239
            </div>
            <span
              style={{
                color: "#9CA3AF",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              2 months · etalvis.com
            </span>
          </div>
        </div>

        {/* ══════════════ RIGHT — photo ══════════════ */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 520,
            height: 630,
            display: "flex",
            overflow: "hidden",
          }}
        >
          <img
            src={balajeeSrc}
            alt=""
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 440,
              height: 440,
              objectFit: "cover",
              objectPosition: "center top",
            }}
          />
          {/* Left edge blend into light bg */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, #F7F7F2 0%, transparent 40%)",
              display: "flex",
            }}
          />
          {/* Bottom fade */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, #F7F7F2 0%, transparent 35%)",
              display: "flex",
            }}
          />
          {/* Instructor label */}
          <div
            style={{
              position: "absolute",
              bottom: 36,
              right: 36,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 2,
            }}
          >
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#111827",
              }}
            >
              Balajee Seshadri
            </span>
            <span
              style={{
                fontSize: 12,
                color: "#6B7280",
                fontWeight: 500,
              }}
            >
              40+ Years in Electronics
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
