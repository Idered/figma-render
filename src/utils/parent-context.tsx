import * as React from "react"
import {Node} from "figma-types/types/node"

export const ParentContext = React.createContext<Node | undefined>(undefined)
export const useParentContext = () => React.useContext(ParentContext)
