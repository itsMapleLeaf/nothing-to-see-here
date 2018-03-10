import { darken, hsl, lighten } from "polished"

export const backgroundColor = hsl(220, 0.17, 0.05)
export const foregroundColor = lighten(0.08, backgroundColor)
export const foregroundColorHighlight = lighten(0.2, backgroundColor)
export const foregroundColorShade = darken(0.04, foregroundColor)

export const textColor = hsl(0, 0, 1)

export const shadowColor = darken(0.04, backgroundColor)

export const activeColor = hsl(217, 0.81, 0.73)
export const danger = hsl(0, 0.9, 0.75)
