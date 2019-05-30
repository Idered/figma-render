import * as React from "react"
import {Node} from "figma-types/types/node"
import {ChildList} from "./child-list"
import {useStylesForNode} from "../utils/styles-for-node"
import {Group as KonvaGroup, Rect} from "react-konva"
import {ParentContext} from "../utils/parent-context"

export interface GroupProps {
  node: Node
}

export const Group: React.FC<GroupProps> = ({node}) => {
  const styles = useStylesForNode(node)

  return (
    <KonvaGroup {...styles}>
      <Rect {...styles} />
      <ParentContext.Provider value={node}>
        <ChildList nodes={node.children} />
      </ParentContext.Provider>
    </KonvaGroup>
  )
}
