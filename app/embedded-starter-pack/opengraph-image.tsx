import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "eTalVis Embedded Starter Pack — Electronics + C Programming Foundation Courses · ₹239";

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
          background: "#0A3D1F",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: 280,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(21,128,61,0.22) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 60,
            bottom: 60,
            left: 660,
            width: 1,
            background: "rgba(255,255,255,0.08)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 52px 52px 64px",
            width: 660,
            position: "relative",
            zIndex: 2,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img src={iconSrc} width={40} height={40} alt="" style={{ borderRadius: 8 }} />
            <span
              style={{
                color: "rgba(255,255,255,0.70)",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "0.02em",
              }}
            >
              eTalVis
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <span
              style={{
                color: "#86EFAC",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Embedded Starter Pack
            </span>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                fontSize: 52,
                fontWeight: 800,
                color: "#FFFFFF",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            >
              <span>The Right Foundation&nbsp;</span>
              <span style={{ color: "#4ADE80" }}>First.</span>
            </div>

            <div
              style={{
                fontSize: 20,
                color: "rgba(255,255,255,0.62)",
                lineHeight: 1.5,
                maxWidth: 480,
                display: "flex",
              }}
            >
              Electronics + C Programming. 200+ problems. For ECE, EEE, EIE and related branches.
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              <div
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 100,
                  padding: "8px 18px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.80)",
                  letterSpacing: "0.01em",
                  display: "flex",
                }}
              >
                Electronics Foundation
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 100,
                  padding: "8px 18px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.80)",
                  letterSpacing: "0.01em",
                  display: "flex",
                }}
              >
                C Programming Foundation
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                background: "#FFC400",
                borderRadius: 100,
                padding: "12px 28px",
                fontSize: 22,
                fontWeight: 900,
                color: "#111827",
                border: "2.5px solid #111827",
                display: "flex",
                alignItems: "center",
              }}
            >
              ₹239 · Start Here
            </div>
            <span
              style={{
                color: "rgba(255,255,255,0.40)",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              2 months · etalvis.com
            </span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 540,
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
              width: 420,
              height: 420,
              objectFit: "cover",
              objectPosition: "center top",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, #0A3D1F 0%, transparent 35%)",
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, #0A3D1F 0%, transparent 40%)",
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 40,
              right: 40,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 2,
            }}
          >
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "0.01em",
              }}
            >
              Balajee Seshadri
            </span>
            <span
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.55)",
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
