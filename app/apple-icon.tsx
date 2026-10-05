import { ImageResponse } from "next/og"

import { LogoSvg } from "@/components/brand/logo-svg"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#000" }}>
        <LogoSvg idPrefix="apple-logo" width={104} height={90} />
      </div>
    ),
    size,
  )
}
