import {Color} from "figma-types/types/color"
import {colorToRgb} from "./color-to-rgb"

interface Stop {
  color: Color
  position: number
}

export function toLinearGradientStops(stops: Stop[]) {
  const items = stops.map(item => [item.position, colorToRgb(item.color)])
  const result: Array<string | number> = []

  return result.concat(...items)
}
