import * as React from "react"

export const ImagesContext = React.createContext<{[key: string]: string}>({})
export const useImagesContext = () => React.useContext(ImagesContext)
