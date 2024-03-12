import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  fullQuantity,
  fullQuantityGoods,
  selectCurrensy,
  selectCostFlag,
} from '../store/goodsSlice';
import { increment, selectCart } from '../store/cartSlice';

// import CartList from '../containers/CartList';
const CartList = React.lazy(() => import('../containers/CartList'));

const FullOptions: React.FC = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const { articul } = useParams<{
    articul: string;
  }>();
  const [itemFurniture, setItemFurniture] = useState<{
    image: string;
    title: string;
    description: string;
    rating: number;
    cost: number;
  }>();

  const selCostFlag = useSelector(selectCostFlag);
  const currency = useSelector(selectCurrensy);
  const cart = useSelector(selectCart);
  let fullQuantityGoodsCart = useSelector(fullQuantityGoods);

  useEffect(() => {
    async function fetchFurniture() {
      try {
        const { data } = await axios.get(
          `https://65c21d61f7e6ea59682aa9c7.mockapi.io/data_shop_furniture/${articul}`
        );
        setItemFurniture(data);
        console.log(
          `https://65c21d61f7e6ea59682aa9c7.mockapi.io/data_shop_furniture/${articul}`,
          'URL'
        );
      } catch (error) {
        console.log(error);
        alert('Такого товара не существует...');
        navigate('/');
      }
    }
    fetchFurniture();
  }, []);

  useEffect(() => {
    if (fullQuantityGoodsCart !== undefined) {
      dispath(
        fullQuantity(
          Object.values(cart).reduce((a: number, b: any) => a + b, 0)
        )
      );
    }
  }, [fullQuantityGoodsCart, cart, dispath]);

  //=clickHandler===============================
  let clickHandler = (e: any) => {
    e.preventDefault();
    let targ = e.target;

    if (!targ.classList.contains('add-to-cart')) return true; // если клик не по кнопке с классом(add-to-cart), то уходим

    dispath(increment(targ.getAttribute('data-key')));
  };

  if (!itemFurniture) {
    return <p>Download...</p>;
  }
  return (
    <div>
      <img src={itemFurniture.image} alt={itemFurniture.title} />
      <div>
        <h2>{itemFurniture.title}</h2>
        <br />
        <h5>Articul: {articul}</h5>
      </div>

      <p>
        Description: {itemFurniture.title}- {itemFurniture.description}
      </p>
      <h4>
        Price:{' '}
        {!selCostFlag
          ? itemFurniture.cost
          : (itemFurniture.cost / 95).toFixed(0)}{' '}
        {currency}
        {/* курс 1 доллара 95 */}
      </h4>
      <h4>Rating: {itemFurniture.rating}</h4>
      <br />
      <div>
        <button
          className="goods-block__add-to-cart  btn add-to-cart"
          onClick={clickHandler}
          data-key={articul}>
          Add to cart {articul && cart[articul] && <span>{cart[articul]}</span>}
        </button>
        <div></div>
        <br />
        <Link to={`/`}>
          <button
            className="goods-block__add-to-cart  btn add-to-cart"
            data-key={articul}>
            Go back to full furnitures
          </button>
        </Link>
      </div>

      <React.Suspense fallback={<div>Download cart...</div>}>
        <CartList />
      </React.Suspense>
      <br />
    </div>
  );
};

export default FullOptions;
