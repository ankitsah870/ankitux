/** Shared easing curves — mirror the `--ease-*` tokens in globals.css. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
export const EASE_IN_OUT_QUART = [0.76, 0, 0.24, 1] as const

export const SPRING_SOFT = { type: "spring", stiffness: 160, damping: 24, mass: 0.8 } as const
