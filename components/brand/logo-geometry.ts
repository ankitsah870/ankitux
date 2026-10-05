/**
 * Ankit Sah's monogram, from the brand Logo.svg — shared by the UI logo,
 * favicon, apple icon and OG images so they never drift apart.
 */
export const LOGO_MARK_VIEWBOX = "0 0 51 44"

/** Both strokes share one ember ramp: amber at the base, fading through rust to black. */
export const LOGO_MARK_STOPS = [
  { offset: 0, color: "#FFAC1D" },
  { offset: 0.533654, color: "#931900" },
  { offset: 1, color: "#000000" },
] as const

export const LOGO_MARK_SHAPES = [
  {
    key: "left",
    path: "M0 43.3019L8.83491 3.8147e-06H17.3609L38.4906 43.3019H29.9028C24.1971 31.6731 13.9569 12.082 13.9569 12.082L8.27887 43.3019H0Z",
    gradientTransform: "matrix(-30.5039 -46.2545 39.1636 -63.7311 21.8247 45.7545)",
  },
  {
    key: "right",
    path: "M51 43.3019V37.6726L35.0991 7.67062H51V0L23.0943 0L40.7663 35.755H30.6493V43.3019H51Z",
    gradientTransform: "matrix(22.1153 -46.2545 -28.3936 -63.7311 35.1771 45.7545)",
  },
] as const
