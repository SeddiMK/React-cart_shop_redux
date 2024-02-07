import { useEffect } from "react"
import axios from "axios";

import Main from "../components/main"


export default function Home() {
  // При первом рендере скролим вверх
  useEffect(() => {
    // const URL = `https://65c21d61f7e6ea59682aa9c7.mockapi.io/data_shop_furniture`; // можно вынести в отдельный файл

    // axios.get(URL).then(res => {
    //   console.log(res.data);
    // })
    
    
    window.scrollTo(0, 0);
  }, [])
  
    return (
        <>
          <Main />
        </>
    )
}