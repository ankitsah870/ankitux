import { LOGO_MARK_SHAPES, LOGO_MARK_STOPS, LOGO_MARK_VIEWBOX } from "@/components/brand/logo-geometry"

type LogoSvgProps = Omit<React.ComponentProps<"svg">, "viewBox"> & {
  /** Prefix for gradient ids — must be unique per document. */
  idPrefix: string
}

/**
 * Raw monogram markup with no hooks or class merging, so it renders in the UI
 * as well as inside `ImageResponse` (favicon, apple icon, OG images).
 */
export function LogoSvg({ idPrefix, ...props }: LogoSvgProps) {
  return (
    <svg viewBox={LOGO_MARK_VIEWBOX} fill="none" {...props}>
      <defs>
        {LOGO_MARK_SHAPES.map((shape) => (
          <radialGradient
            key={shape.key}
            id={`${idPrefix}-${shape.key}`}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform={shape.gradientTransform}
          >
            {LOGO_MARK_STOPS.map((stop) => (
              <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
            ))}
          </radialGradient>
        ))}
      </defs>
      {LOGO_MARK_SHAPES.map((shape) => (
        <path key={shape.key} d={shape.path} fill={`url(#${idPrefix}-${shape.key})`} />
      ))}
    </svg>
  )
}
