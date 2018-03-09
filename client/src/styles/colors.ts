import { darken, hsl, lighten } from "polished"

export const backgroundColor = hsl(220, 0.17, 0.05)
export const backgroundColor2 = lighten(0.08, backgroundColor)
export const backgroundColor3 = lighten(0.2, backgroundColor)
export const inputColor = darken(0.03, backgroundColor2)

export const textColor = hsl(0, 0, 1)

export const shadowColor = darken(0.04, backgroundColor)

export const activeColor = hsl(217, 0.81, 0.73)
