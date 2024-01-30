import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={323}
    height={330}
    viewBox="0 0 323 330"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="35" y="125" rx="3" ry="3" width="88" height="6" /> 
    <rect x="63" y="161" rx="3" ry="3" width="185" height="18" /> 
    <rect x="0" y="0" rx="0" ry="0" width="316" height="146" /> 
    <rect x="90" y="190" rx="0" ry="0" width="126" height="20" /> 
    <rect x="103" y="222" rx="0" ry="0" width="103" height="19" /> 
    <rect x="101" y="250" rx="10" ry="10" width="106" height="40" />
  </ContentLoader>
)

export default MyLoader

