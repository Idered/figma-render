import * as React from "react"
import {Node} from "figma-types/types/node"
import {ChildList} from "./child-list"
import {useStylesForNode} from "../utils/styles-for-node"
import {Rect} from "react-konva"
import {ParentContext} from "../utils/parent-context"

export interface RectangleProps {
  node: Node
}

export const Rectangle: React.FC<RectangleProps> = ({node}) => {
  const styles = useStylesForNode(node)

  return (
    <Rect {...styles}>
      <ParentContext.Provider value={node}>
        <ChildList nodes={node.children} />
      </ParentContext.Provider>
    </Rect>
  )
}
