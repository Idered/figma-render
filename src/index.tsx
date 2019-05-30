import * as React from "react"
import {Node} from "figma-types/types/node"
import {Child} from "./components/child"
import {ParentContext} from "./utils/parent-context"
import {Stage, Layer} from "react-konva"
import {ImagesContext} from "./utils/images-context"

interface Props {
  node: Node
  images: {
    [key: string]: string
  }
}

export const Render = ({node, images}: Props) => (
  <ParentContext.Provider
    value={{
      ...node,
      children: undefined,
    }}
  >
    <ImagesContext.Provider value={images}>
      <ParentContext.Consumer>
        {value => (
          <ImagesContext.Consumer>
            {images => {
              if (node.absoluteBoundingBox === undefined) {
                return null
              }
              return (
                <Stage
                  width={node.absoluteBoundingBox.width}
                  height={node.absoluteBoundingBox.height}
                  left={0}
                  top={0}
                >
                  <ParentContext.Provider value={value}>
                    <ImagesContext.Provider value={images}>
                      <Layer>
                        <Child node={node} />
                      </Layer>
                    </ImagesContext.Provider>
                  </ParentContext.Provider>
                </Stage>
              )
            }}
          </ImagesContext.Consumer>
        )}
      </ParentContext.Consumer>
    </ImagesContext.Provider>
  </ParentContext.Provider>
)
