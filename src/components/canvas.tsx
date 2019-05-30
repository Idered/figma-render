import * as React from "react"
import {Node} from "figma-types/types/node"
import {ChildList} from "./child-list"

export interface CanvasProps {
  node: Node
}

export const Canvas: React.FC<CanvasProps> = ({node}) => {
  if (!node.absoluteBoundingBox) {
    return null
  }

  return (
    <div
    // width={node.absoluteBoundingBox.width}
    // height={node.absoluteBoundingBox.height}
    // left={0}
    // top={0}
    >
      <ChildList nodes={node.children} />
    </div>
  )
}
