import * as React from "react"
import {Node} from "figma-types/types/node"
import {Child} from "./child"

export interface ChildListProp {
  nodes?: Node[]
}

export const ChildList: React.FC<ChildListProp> = ({nodes = []}) => {
  return (
    <React.Fragment>
      {nodes.map(item => (
        <Child key={item.id} node={item} />
      ))}
    </React.Fragment>
  )
}
