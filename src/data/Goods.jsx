
import axios from 'axios';

// import URL from './data';

export const goodsArr2 = () => {
    const URL = `https://65c21d61f7e6ea59682aa9c7.mockapi.io/data_shop_furniture`; // можно вынести в отдельный файл

    // fetch(URL)
    // .then(res => res.json())
    // .then(data=>data)
    
    axios.get(URL).then(res => {
        return  res.data;
    })
    
}


export default goodsArr2;