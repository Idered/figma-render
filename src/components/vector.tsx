import * as React from "react"
import {Node} from "figma-types/types/node"
import {ChildList} from "./child-list"
import {useStylesForNode} from "../utils/styles-for-node"

export interface VectorProps {
  node: Node
}

export const Vector: React.FC<VectorProps> = ({node}) => {
  const styles = useStylesForNode(node)

  return (
    <div style={styles}>
      <ChildList nodes={node.children} />
    </div>
  )
}
