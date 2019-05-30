import * as React from "react"
import {Node} from "figma-types/types/node"
import {ChildList} from "./child-list"
import {useStylesForNode} from "../utils/styles-for-node"
import {Group, Rect} from "react-konva"
import {ParentContext} from "../utils/parent-context"

export interface FrameProps {
  node: Node
}

export const Frame: React.FC<FrameProps> = ({node}) => {
  const styles = useStylesForNode(node)

  return (
    <Group {...styles}>
      <Rect {...styles} />
      <ParentContext.Provider value={node}>
        <ChildList nodes={node.children} />
      </ParentContext.Provider>
    </Group>
  )
}
