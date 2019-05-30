import {Color} from "figma-types/types/color"
import {colorToRgb} from "./color-to-rgb"

interface Stop {
  color: Color
  position: number
}

export function toLinearGradient(stops: Stop[]) {
  const content = stops.map(item => colorToRgb(item.color)).join(",")

  return `linear-gradient(${content})`
}
