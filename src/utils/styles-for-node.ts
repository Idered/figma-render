import {Node} from "figma-types/types/node"
import {useParentContext} from "./parent-context"
import {Context} from "konva/types/Context"
import {Shape, ShapeConfig} from "konva/types/Shape"
import {colorToRgb} from "./color-to-rgb"
import {toLinearGradientStops} from "./to-linear-gradient-stops"
import {useImagesContext} from "./images-context"
import {useState, useEffect, useRef} from "react"

export const useStylesForNode = (node: Node) => {
  const root = useParentContext()
  const images = useImagesContext()
  const fills = useFills(node, images)

  if (!root) {
    return
  }

  return {
    visible: node.visible,
    cornerRadius: node.cornerRadius,
    ...getBoundingBox(node, root),
    ...fills,
    ...getTextStyle(node),
    ...getEffects(node),
    ...getStrokes(node),
  }
}

// function getLineHeight(style: TypeStyle) {
//   return style.lineHeightPercent
// }

function getTextStyle({style}: Node): any {
  if (style) {
    return {
      // letterSpacing: style.letterSpacing,
      // verticalAlign: style.textAlignVertical
      //   ? style.textAlignVertical.toLowerCase()
      //   : undefined,
      textCase: "UPPER",
      align: style.textAlignHorizontal
        ? style.textAlignHorizontal.toLowerCase()
        : undefined,
      // lineHeight: getLineHeight(style),
      fontVariant: style.italic ? "italic" : undefined,
      fontStyle: style.fontWeight,
      fontSize: style.fontSize,
      fontFamily: style.fontFamily,
    }
  }
  return {}
}

function useFills(node: Node, images: {[key: string]: string}) {
  // let img = useRef<HTMLImageElement>(new Image())
  // const [image, setImage] = useState()

  // useEffect(() => {
  //   img.current.onload = () => {
  //     console.log("on load")
  //     setImage(img)
  //   }
  // }, [img.current.src])

  if (node.backgroundColor) {
    return {fill: colorToRgb(node.backgroundColor)}
  }

  if (node.fills === undefined) {
    return {}
  }

  return node.fills.reduce((all, fill) => {
    if (fill.type === "SOLID" && fill.color) {
      return {...all, fill: colorToRgb(fill.color)}
    }
    // if (fill.type === "IMAGE" && fill.imageRef && img.current) {
    //   img.current.src = images[fill.imageRef]
    //   return {...all, fillPatternImage: image}
    // }
    if (
      fill.type === "GRADIENT_LINEAR" &&
      fill.gradientStops &&
      node.absoluteBoundingBox
    ) {
      const start = fill.gradientHandlePositions[0]
      const end = fill.gradientHandlePositions[1]
      return {
        ...all,
        fillLinearGradientStartPointX: node.absoluteBoundingBox.width * start.x,
        fillLinearGradientStartPointY:
          node.absoluteBoundingBox.height * start.y,
        fillLinearGradientEndPointX: node.absoluteBoundingBox.width * end.x,
        fillLinearGradientEndPointY: node.absoluteBoundingBox.height * end.y,
        fillLinearGradientColorStops: toLinearGradientStops(fill.gradientStops),
      }
    }
    return all
  }, {})
}

// function getClip(node: Node, root: Node) {
//   if (
//     node.clipsContent &&
//     node.absoluteBoundingBox &&
//     root.absoluteBoundingBox
//   ) {
//     const top = node.absoluteBoundingBox.y - root.absoluteBoundingBox.y
//     const right =
//       node.absoluteBoundingBox.x -
//       root.absoluteBoundingBox.x +
//       node.absoluteBoundingBox.width
//     const bottom =
//       node.absoluteBoundingBox.y -
//       root.absoluteBoundingBox.y +
//       node.absoluteBoundingBox.height
//     const left = node.absoluteBoundingBox.x - root.absoluteBoundingBox.x
//     return {
//       clip: `rect(${top}, ${right}, ${bottom}, ${left})`,
//     }
//   }

//   return {}
// }

function getStrokes(node: Node) {
  // TODO: Handle multiple strokes
  if (!node.strokes || !node.strokes.length || !node.strokes[0].color) return {}
  const {r, g, b, a} = node.strokes[0].color

  return {
    stroke: `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${node.strokes[0]
      .opacity || a})`,
    strokeEnabled: true,
    strokeWidth:
      node.strokeAlign === "CENTER"
        ? node.strokeWeight
        : (node.strokeWeight || 0) * 2,
    sceneFunc: (ctx: Context, shape: Shape<ShapeConfig>) => {
      let sx = 0
      let sy = 0
      let ex = shape.width()
      let ey = shape.height()
      // TODO: Handle rectangleCornerRadii
      let r = node.cornerRadius || 0
      const r2d = Math.PI / 180
      if (ex - sx - 2 * r < 0) {
        r = (ex - sx) / 2
      }
      if (ey - sy - 2 * r < 0) {
        r = (ey - sy) / 2
      }
      ctx.beginPath()
      ctx.moveTo(sx + r, sy)
      ctx.lineTo(ex - r, sy)
      ctx.arc(ex - r, sy + r, r, r2d * 270, r2d * 360, false)
      ctx.lineTo(ex, ey - r)
      ctx.arc(ex - r, ey - r, r, r2d * 0, r2d * 90, false)
      ctx.lineTo(sx + r, ey)
      ctx.arc(sx + r, ey - r, r, r2d * 90, r2d * 180, false)
      ctx.lineTo(sx, sy + r)
      ctx.arc(sx + r, sy + r, r, r2d * 180, r2d * 270, false)
      ctx.closePath()

      if (node.strokeAlign === "OUTSIDE") {
        // first stroke
        ctx.strokeShape(shape)
        // then fill
        ctx.fillShape(shape)
      }

      if (node.strokeAlign === "INSIDE") {
        ctx.save()
        ctx.clip()
        ctx.fillShape(shape)
        ctx.strokeShape(shape)
        ctx.restore()
      }
    },
  }
}

function getBoundingBox(node: Node, root: Node) {
  if (
    node.absoluteBoundingBox === undefined ||
    root.absoluteBoundingBox === undefined
  )
    return {}

  return {
    clip: node.clipsContent
      ? {
          y: 0,
          x: 0,
          width: node.absoluteBoundingBox.width,
          height: node.absoluteBoundingBox.height,
        }
      : undefined,
    y: node.absoluteBoundingBox.y - root.absoluteBoundingBox.y,
    x: node.absoluteBoundingBox.x - root.absoluteBoundingBox.x,
    width: node.absoluteBoundingBox.width,
    height: node.absoluteBoundingBox.height,
  }
}

function getEffects(node: Node) {
  if (node.effects === undefined) {
    return {}
  }

  return node.effects.reduce((all, item) => {
    if (!item.visible) return all
    if (
      ["INNER_SHADOW", "DROP_SHADOW"].includes(item.type) &&
      item.color &&
      item.offset
    ) {
      const {r, g, b, a} = item.color

      return {
        ...all,
        shadowOpacity: a,
        shadowBlur: item.radius,
        shadowOffsetX: item.offset.x,
        shadowOffsetY: item.offset.y,
        shadowColor: `rgb(${r * 255},${g * 255},${b * 255})`,
      }
    }

    return all
  }, {})
}
