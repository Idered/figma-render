export function colorToRgb({
  r,
  g,
  b,
  a,
}: {
  r: number
  g: number
  b: number
  a?: number
}) {
  const fill = `${r * 255},${g * 255},${b * 255}`
  return a === undefined ? `rgb(${fill})` : `rgba(${fill}, ${a})`
}
