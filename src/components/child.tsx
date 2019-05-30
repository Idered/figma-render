import * as React from "react"
import {Node} from "figma-types/types/node"
import {Frame} from "./frame"
// import {Canvas} from "./canvas"
import {Group} from "./group"
import {Text} from "./text"
import {Instance} from "./instance"
import {Rectangle} from "./rectangle"
// import {Vector} from "./vector"

export interface ChildProps {
  node: Node
}

export const Child = ({node}: ChildProps) => {
  switch (node.type) {
    // case "CANVAS":
    //   return <Canvas node={node} />
    case "FRAME":
      return <Frame node={node} />
    case "GROUP":
      return <Group node={node} />
    case "TEXT":
      return <Text node={node} />
    case "INSTANCE":
      return <Instance node={node} />
    case "RECTANGLE":
      return <Rectangle node={node} />
    // case "VECTOR":
    //   return <Vector node={node} />
    default:
      return null
  }
}
