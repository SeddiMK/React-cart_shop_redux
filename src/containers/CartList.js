import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import {
  fullQuantityGoods,
  fullQuantity,
  selectCostFlag,
  selectCurrensy,
  selectGoods,
} from '../store/goodsSlice';
import { selectCart, minus, del, cartOpen } from '../store/cartSlice';

import Cart from '../components/cart/Cart';
import ErrorBeckend from '../components/ErrorBeckend';

export default function CartList() {
  const dispath = useDispatch();
  const cartOpenSt = useSelector((state) => state.cartVal.cartOpen);
  const selCostFlag = useSelector(selectCostFlag);
  const currency = useSelector(selectCurrensy);
  const goods = useSelector(selectGoods);
  const cart = useSelector(selectCart);

  // const [openCart, setOpenCart] = useState(true);
  const [findElFlag, setFindElFlag] = useState(true);
  const catCartRef = useRef(null);

  let fullQuantityGoodsCart = useSelector(fullQuantityGoods);

  // делаем запрос корзины у бэкенда по articul через get filter=  -------------------------------
  // const axiosCart = () => {
  //   // setIsLoading(true); // обновляем set загрузки

  //   // setTimeout(() => setIsLoading(false), 1000); // !!! убрать имитация загрузки с сервера

  // переидексирую массив товара -----------------------------------------!!!!!!!!!!!!
  const goodsObj = goods.reduce((accum, item) => {
    accum[item['articul']] = item;
    return accum;
  }, {});

  // fullPrice---------------------------------------------------------------
  //full price
  // let fullPrice = 0;
  // Object.keys(cart).map((el) => {
  //   return (fullPrice +=
  //     (!selCostFlag
  //       ? goodsObj[el]['cost']
  //       : (goodsObj[el]['cost'] / 95).toFixed(0)) * cart[el]);
  // });

  // const fullPriceArr = Object.keys(cart).map((el) => {
  //   let price = 0;
  //   return (price +=
  //     (!selCostFlag
  //       ? goodsObj[el]['cost']
  //       : (goodsObj[el]['cost'] / 95).toFixed(0)) * cart[el]);
  // });

  // const fullPrice = () => {
  //   let sum = 0;
  //   for (let i = 0; i < fullPriceArr.length; i++) {
  //     sum += fullPriceArr[i];
  //   }
  //   return sum;
  // };
  const fullPrice = () => {
    const fullPriceArr = Object.keys(cart).map((el) => {
      let price = 0;

      return (price +=
        (!selCostFlag
          ? goodsObj[el].cost
          : (goodsObj[el].cost / 95).toFixed(0)) * cart[el]);
    });

    let sum = 0;
    for (let i = 0; i < fullPriceArr.length; i++) {
      sum += fullPriceArr[i];
    }

    return sum;
  };

  //=========================================================
  // full Quantity
  // let fullQuantity = 0;
  // let fullQuantitySumm = Object.keys(cart).map(
  //   (el) => (fullQuantity += Number(cart[el]))
  // );
  //=========================================================
  useEffect(() => {
    if (fullQuantityGoodsCart !== undefined) {
      dispath(fullQuantity(Object.values(cart).reduce((a, b) => a + b, 0)));
    }
  });

  useEffect(() => {
    // Получаем ссылку на элемент, при клике на который, скрытие не будет происходить
    // const cartClassUef = document.getElementsByClassName('goods-table')[0];
    //===============================================================
    // if (fullQuantityGoodsCart === 0) cartClassUef.classList.remove('activ')-----------------------------;
    if (fullQuantityGoodsCart === 0) dispath(cartOpen(false));
  }, [fullQuantityGoodsCart]);

  // cart close in btn-close ===========================================================================
  const hadlerClose = (e) => {
    if (catCartRef.current && fullQuantityGoodsCart !== 0) {
      // catCartRef.current.classList.toggle('activ');
      dispath(cartOpen(false));
    }
  };
  // cart close in window ===========================================================================
  useEffect(() => {
    const cartIcon = document.getElementsByClassName('cart-btn')[0];

    const handleClickOutside = (e) => {
      if (
        ![catCartRef.current, cartIcon].some((x) =>
          e.composedPath().includes(x)
        )
      ) {
        // setOpenCart(false);
        // catCartRef.current.classList.remove('activ'); // переделать на openCart--------------------------
        dispath(cartOpen(false));
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside); //unMount- сработает при размонтировании, при ухода со стр! //добавляем удаление обработчика, т.к. при ухода со стр стрый обработчик остается! return - сделай при размонтировании
  }, []);
  //  ===========================================================================
  useEffect(() => {
    const findElCart = Object.keys(cart).map(
      (el, i) => goodsObj[el] === undefined
    );
    setFindElFlag(findElCart.find((el) => el === true));
  }, [goodsObj]);

  //========clickHandler============================================================================
  let clickHandler = (e) => {
    e.preventDefault();

    let targ = e.target;
    // if (!targ.classList.contains('goods-table')) return true; // если клик не по кнопке с классом(add-to-cart), то уходим
    if (targ.classList.contains('delete-one-position')) {
      dispath(minus(targ.getAttribute('data-key')));
      // if (fullQuantityGoodsCart <= 1) cartClass.classList.remove('activ');
    }
    if (targ.classList.contains('delete-quantity')) {
      dispath(del(targ.getAttribute('data-key')));
    }
  };
  // if (!findElFlag) return <ErrorBeckend />;
  return (
    <>
      {cartOpenSt && (
        <section
          className="main__goods-table-wrapper goods-table"
          ref={catCartRef}>
          {!findElFlag ? (
            <div className="main__goods-table" onClick={clickHandler}>
              {/* fullGoods */}
              <div className="goods-table__full-goods-block">
                <ul className="goods-table__full-goods">
                  {Object.keys(cart).map((el, i) => (
                    <li
                      className="goods-table__item"
                      key={goodsObj[el].title + i}>
                      {goodsObj[el].title} - {cart[el]}
                    </li>
                  ))}
                </ul>
                <div
                  className="goods-table__full-goods-close"
                  onClick={hadlerClose}></div>
              </div>
              <div className="cart__full-price">
                Full price: {fullPrice()} {currency}
              </div>
              <div className="goods-table__cart cart">
                {Object.keys(cart).map((el, i) => (
                  <Cart
                    key={goodsObj[el].title + i}
                    title={goodsObj[el].title}
                    cost={
                      !selCostFlag
                        ? goodsObj[el].cost
                        : (goodsObj[el].cost / 95).toFixed(0)
                    } //cost={!selCostFlag ? el.cost : (el.cost / 95).toFixed(0)} // курс 1 доллара 95
                    currency={currency}
                    quantity={cart[el]}
                    priceAllItem={
                      (!selCostFlag
                        ? goodsObj[el].cost
                        : (goodsObj[el].cost / 95).toFixed(0)) *
                        cart[el] +
                      ' ' +
                      currency
                    }
                    image={goodsObj[el].image}
                    articul={goodsObj[el]['articul']}
                  />
                ))}
              </div>
            </div>
          ) : (
            <ErrorBeckend />
          )}
        </section>
      )}
    </>
  );
}
