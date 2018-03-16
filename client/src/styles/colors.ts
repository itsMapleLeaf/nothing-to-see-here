import { darken, hsl, lighten, rgb } from "polished"

export const backgroundColor = hsl(220, 0.17, 0.05)
export const foregroundColor = lighten(0.08, backgroundColor)
export const foregroundColorHighlight = lighten(0.2, backgroundColor)
export const foregroundColorShade = darken(0.04, foregroundColor)

export const textColor = rgb(236, 240, 241)

export const shadowColor = darken(0.04, backgroundColor)

export const primary = rgb(52, 152, 219)
export const primaryText = lighten(0.125, primary)

export const danger = rgb(231, 76, 60)
export const dangerText = lighten(0.1, danger)

export const warning = rgb(241, 196, 15)
export const warningText = lighten(0.1, warning)

export const success = rgb(46, 204, 113)
export const successText = lighten(0.1, success)
