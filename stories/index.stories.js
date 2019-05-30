import React from "react"
import {Render} from "../"
import {storiesOf} from "@storybook/react"
import node from "./data.json"
import images from "./images.json"

storiesOf("Canvas", module)
  .addParameters({
    isFullscreen: true,
    showNav: false,
    showPanel: false,
  })
  .add("default", () => <Render node={node.children[0]} images={images} />)
