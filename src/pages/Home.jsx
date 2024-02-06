import { useEffect } from "react"
import Main from "../components/main"


export default function Home() {
  // При первом рендере скролим вверх
  useEffect(() => {
    window.scrollTo(0, 0);
  },[])
    return (
        <>
          <Main />
        </>
    )
}