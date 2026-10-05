import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

import { LogoSvg } from "@/components/brand/logo-svg"
import { siteConfig } from "@/config/site"

export const OG_IMAGE_SIZE = { width: 1200, height: 630 }
export const OG_IMAGE_CONTENT_TYPE = "image/png"

const COLORS = {
  background: "#000000",
  foreground: "#fafafa",
  muted: "#a3a3a3",
  gold: "#f6c57f",
  border: "#262626",
}

function loadFont(fileName: string) {
  return readFile(join(process.cwd(), "assets/fonts", fileName))
}

/** Reads a case-study cover from `assets/images/work/<slug>.jpg` as a data URL Satori can embed. */
export async function loadProjectCover(slug: string) {
  const file = await readFile(join(process.cwd(), "assets/images/work", `${slug}.jpg`))
  return `data:image/jpeg;base64,${file.toString("base64")}`
}

type OgImageInput = {
  eyebrow: string
  /** Headline in white. */
  title: string
  /** Closing words rendered in gold, like every headline on the site. */
  accent?: string
  /** Small caption in the ember panel. */
  caption?: string
  /** Data URL of a screen to show rising out of the ember panel (case studies). */
  coverImage?: string
}

/** Shared 1200×630 social card used by every route's opengraph/twitter image. */
export async function renderOgImage({
  eyebrow,
  title,
  accent,
  caption = siteConfig.location.label,
  coverImage,
}: OgImageInput) {
  const [displayFont, monoFont] = await Promise.all([
    loadFont("archivo-semi-expanded-bold.ttf"),
    loadFont("geist-mono-medium.ttf"),
  ])

  // A punctuation-only accent (a gold full stop) attaches to the last word instead of wrapping on its own.
  const isTrailingMark = accent !== undefined && /^[.!?]$/.test(accent)
  const words: { word: string; isAccent: boolean; mark?: string }[] = [
    ...title
      .split(" ")
      .filter(Boolean)
      .map((word) => ({ word, isAccent: false })),
    ...(accent && !isTrailingMark ? accent.split(" ").map((word) => ({ word, isAccent: true })) : []),
  ]
  if (isTrailingMark && words.length > 0) words[words.length - 1].mark = accent
  const characterCount = words.reduce((total, { word }) => total + word.length + 1, 0)
  const fontSize = characterCount > 48 ? 54 : characterCount > 30 ? 64 : 76

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: 56,
          gap: 48,
          background: COLORS.background,
          color: COLORS.foreground,
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <LogoSvg idPrefix="og-logo" width={64} height={55} />

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontFamily: "Geist Mono",
                fontSize: 20,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: COLORS.gold,
              }}
            >
              <div style={{ width: 24, height: 2, background: COLORS.gold }} />
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                columnGap: fontSize * 0.26,
                fontSize,
                lineHeight: 1,
                letterSpacing: -0.5,
                textTransform: "uppercase",
              }}
            >
              {words.map(({ word, isAccent, mark }, index) => (
                <span key={index} style={{ display: "flex", color: isAccent ? COLORS.gold : COLORS.foreground }}>
                  {word}
                  {mark ? <span style={{ color: COLORS.gold }}>{mark}</span> : null}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 24,
              borderTop: `1px solid ${COLORS.border}`,
              fontFamily: "Geist Mono",
              fontSize: 18,
              color: COLORS.muted,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            <span>{siteConfig.name}</span>
            <span>{new URL(siteConfig.url).host}</span>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: coverImage ? 420 : 300,
            overflow: "hidden",
            borderRadius: 28,
            padding: 28,
            backgroundColor: "#7d1604",
            backgroundImage:
              "radial-gradient(circle at 55% 105%, #050100 0%, rgba(5,1,0,0) 55%), linear-gradient(160deg, #d8640f 0%, #a42a08 34%, #7d1604 60%, #2e0702 100%)",
            fontSize: 20,
          }}
        >
          <span>{caption}</span>
          {coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> only
            <img
              src={coverImage}
              alt=""
              width={500}
              style={{ position: "absolute", left: 36, bottom: 0, borderRadius: "10px 10px 0 0", boxShadow: "0 -16px 40px rgba(0,0,0,0.6)" }}
            />
          ) : (
            <span style={{ fontFamily: "Geist Mono", fontSize: 16, color: "rgba(255,255,255,0.65)" }}>
              {siteConfig.role.toUpperCase()}
            </span>
          )}
        </div>
      </div>
    ),
    {
      ...OG_IMAGE_SIZE,
      fonts: [
        { name: "Archivo", data: displayFont, weight: 700, style: "normal" },
        { name: "Geist Mono", data: monoFont, weight: 500, style: "normal" },
      ],
    },
  )
}
