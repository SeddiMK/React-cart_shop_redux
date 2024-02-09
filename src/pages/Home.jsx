import { useEffect } from "react"

import Main from "../components/main"


export default function Home() {


  useEffect(() => {
    // При первом рендере скролим вверх
    window.scrollTo(0, 0);
  }, [])

  return (
    <>
      <Main />
    </>
  )
}