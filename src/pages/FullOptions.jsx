import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectCurrensy } from '../store/goodsSlice';

export default function FullOptions() {
  const [itemFurniture, setItemFurniture] = useState();
  let currency = useSelector(selectCurrensy);
  const { articul } = useParams();

  console.log(articul, 'params');

  useEffect(() => {
    async function fetchFurniture() {
      try {
        const { data } = await axios.get(
          `https://65c21d61f7e6ea59682aa9c7.mockapi.io/data_shop_furniture/${articul}`
        );
        setItemFurniture(data);
        console.log(data, 'data in FullOptions');
        console.log(
          `https://65c21d61f7e6ea59682aa9c7.mockapi.io/data_shop_furniture/${articul}`,
          'URL'
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchFurniture();
  }, []);

  if (!itemFurniture) {
    return <p>Download...</p>;
  }
  return (
    <div>
      <img src={itemFurniture.image} alt={itemFurniture.title} />
      <div>
        <h2>{itemFurniture.title}</h2>
        <h5>Articul: {articul}</h5>
      </div>

      <p>
        Description: {itemFurniture.title} {itemFurniture.description}
      </p>
      <h4>
        Price: {itemFurniture.cost} {currency}
      </h4>
      <h4>Rating: {itemFurniture.rating}</h4>
    </div>
  );
}
