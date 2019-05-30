import * as React from "react"
import {Node} from "figma-types/types/node"
import {ChildList} from "./child-list"
import {useStylesForNode} from "../utils/styles-for-node"
import {Text as KonvaText} from "react-konva"
import {ParentContext} from "../utils/parent-context"

export interface TextProps {
  node: Node
}

export const Text: React.FC<TextProps> = ({node}) => {
  const styles = useStylesForNode(node)
  let characters = node.characters

  if (node.style && node.style.textCase === "UPPER") {
    characters = String(node.characters).toLocaleUpperCase()
  }

  if (node.style && node.style.textCase === "LOWER") {
    characters = String(node.characters).toLocaleLowerCase()
  }

  if (node.style && node.style.textCase === "TITLE") {
    // TODO: Handle title case
  }

  return (
    <KonvaText {...styles} text={characters}>
      <ParentContext.Provider value={node}>
        <ChildList nodes={node.children} />
      </ParentContext.Provider>
    </KonvaText>
  )
}
