import './FullOptions.scss';

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
} from '../../store/goodsSlice';
import { increment, minus, selectCart } from '../../store/cartSlice';

// import CartList from '../containers/CartList';
const CartList = React.lazy(() => import('../../containers/CartList'));

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

  //=clickHandlerAddGoods===============================
  let clickHandlerAdd = (e: any) => {
    e.preventDefault();
    let targ = e.target;

    if (!targ.classList.contains('add-to-cart')) return true; // если клик не по кнопке с классом(add-to-cart), то уходим

    dispath(increment(targ.getAttribute('data-key')));
  };
  //=clickHandlerDeleteOneGoods===============================
  let clickHandlerDel = (e: any) => {
    e.preventDefault();
    let targ = e.target;

    if (!targ.classList.contains('add-to-cart')) return true; // если клик не по кнопке с классом(add-to-cart), то уходим

    dispath(minus(targ.getAttribute('data-key')));
  };
  // ----------------------------------------------------------

  if (!itemFurniture) {
    return <p>Download...</p>;
  }
  return (
    <div className="full-options">
      <div className="full-options__image-wrp img-wrp">
        <img
          className="full-options__img img"
          src={itemFurniture.image}
          alt={itemFurniture.title}
        />
      </div>

      <div className="full-options__title">
        <h2>
          <b>{itemFurniture.title}</b>
        </h2>

        <h5>Articul: {articul}</h5>
      </div>

      <div className="full-options__desc desc">
        <p className="desc__title">
          Description: {itemFurniture.title}- {itemFurniture.description}
        </p>

        <h4 className="desc__price">
          Price:{' '}
          {!selCostFlag
            ? itemFurniture.cost
            : (itemFurniture.cost / 95).toFixed(0)}{' '}
          {currency}
          {/* курс 1 доллара 95 */}
        </h4>

        <h4 className="desc__rating rating">Rating: {itemFurniture.rating}</h4>
      </div>

      <div className="full-options__btn-block btn-block">
        <button
          className="btn-block goods-block__add-to-cart btn add-to-cart"
          onClick={clickHandlerAdd}
          data-key={articul}>
          Add to cart {articul && cart[articul] && <span>{cart[articul]}</span>}
        </button>
        <button
          className="btn-block goods-block__del-to-cart btn add-to-cart"
          onClick={clickHandlerDel}
          data-key={articul}>
          Delete one position{' '}
          {articul && cart[articul] && <span>{cart[articul]}</span>}
        </button>
      </div>
      <div className="full-options__btn-block">
        <Link to={`/`}>
          <button
            className="btn-block goods-block__go-back btn"
            data-key={articul}>
            Go back to full furnitures
          </button>
        </Link>
      </div>

      <React.Suspense fallback={<div> Download cart...</div>}>
        <CartList />
      </React.Suspense>
    </div>
  );
};

export default FullOptions;
