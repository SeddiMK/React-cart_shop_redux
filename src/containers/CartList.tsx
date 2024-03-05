import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  fullQuantityGoods,
  fullQuantity,
  selectCostFlag,
  selectCurrensy,
} from '../store/goodsSlice';
import {
  selectCart,
  minus,
  del,
  cartOpen,
  selectCartOpenSt,
  CartItem,
} from '../store/cartSlice';
import { itemsReindexing } from '../store/furnitureSlice';

import Cart from '../components/cart/Cart';
import ErrorBeckend from '../components/ErrorBeckend';
import { useAppDispatch } from '../store';

const CartList: React.FC = () => {
  const dispath = useAppDispatch();
  const selCartOpenSt: boolean = useSelector(selectCartOpenSt);
  const selCostFlag: boolean = useSelector(selectCostFlag);
  const currency: string = useSelector(selectCurrensy);
  const goodsReindex: any = useSelector(itemsReindexing);
  const cart: CartItem = useSelector(selectCart);

  const catCartRef = useRef(null);

  let fullQuantityGoodsCart = useSelector(fullQuantityGoods);

  // делаем запрос корзины у бэкенда по articul через get filter=  -------------------------------
  // const axiosCart = () => {
  //   // setIsLoading(true); // обновляем set загрузки

  //   // setTimeout(() => setIsLoading(false), 1000); // !!! убрать имитация загрузки с сервера
  //  ===========================================================================
  // переидексирую массив товара -----------------------------------------!!!!!!!!!!!!

  // console.log(goodsObj, 'goodsObj');
  // useEffect(() => {
  //   dispath(setItemsReindexing(goods));
  // }, [goods, cart]);

  // useEffect(() => {
  //   // if(cart)!!!!!!!!!!!!!!!!!!!!!!
  //   console.log(Object.values(cart).length, 'Object.values(cart)');

  //   if (Object.values(cart).length > 1) {
  //     setGoodsObj(
  //       goods.reduce((accum: any, item: any) => {
  //         accum[item.articul] = item;
  //         return accum;
  //       }, {})
  //     );
  //   } else if (Object.values(cart).length === 1) {
  //   }
  // }, [cart, goods]);

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

  const fullPrice = (): number => {
    const fullPriceArr: number[] = Object.keys(cart).map((el) => {
      const priceInObj: number = goodsReindex[el].cost;

      let price: number = 0;
      return (price += (Number(
        !selCostFlag && goodsReindex ? priceInObj : priceInObj / 95
      ) * cart[el]) as number);
    });

    let sum: number = 0;
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
      dispath(
        fullQuantity(
          Object.values(cart).reduce((a: number, b: number) => a + b, 0)
        )
      );
    }
  }, [cart, fullQuantityGoodsCart, dispath]);

  useEffect(() => {
    // Получаем ссылку на элемент, при клике на который, скрытие не будет происходить
    // const cartClassUef = document.getElementsByClassName('goods-table')[0];
    //===============================================================
    // if (fullQuantityGoodsCart === 0) cartClassUef.classList.remove('activ')-----------------------------;

    if (fullQuantityGoodsCart === 0) dispath(cartOpen(false));
  }, [fullQuantityGoodsCart, dispath]);

  // cart close in btn-close ===========================================================================
  const hadlerClose = (e: any) => {
    if (catCartRef.current && fullQuantityGoodsCart !== 0) {
      // catCartRef.current.classList.toggle('activ');
      dispath(cartOpen(false));
    }
  };
  // cart close in window ===========================================================================
  useEffect(() => {
    const cartIcon: Element = document.getElementsByClassName('cart-btn')[0];

    const handleClickOutside = (e: MouseEvent) => {
      const _event = e as MouseEvent & {
        composedPath(): Node[];
      };
      // if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
      //   setOpen(false);
      // }
      // if (
      //   ![catCartRef.current, cartIcon].some((x: Element | null) =>
      //     _event.composedPath().includes(x)
      //   )
      // ) {
      if (
        ![catCartRef.current, cartIcon].some(
          (x: Element | null) => x && _event.composedPath().includes(x)
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

  //========clickHandler============================================================================
  let clickHandler = (e: any) => {
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

  console.log(cart, '----------------------cart');

  return (
    <>
      {selCartOpenSt && (
        <section
          className="main__goods-table-wrapper goods-table"
          ref={catCartRef}>
          {Object.keys(cart).length ? (
            <div className="main__goods-table" onClick={clickHandler}>
              {/* fullGoods */}
              <div className="goods-table__full-goods-block">
                <ul className="goods-table__full-goods">
                  {Object.keys(cart).map((el: string, i: number) => {
                    const item = goodsReindex[el];
                    return (
                      <li className="goods-table__item" key={item.title + i}>
                        {item.title} - {cart[el]}
                      </li>
                    );
                  })}
                </ul>
                <div
                  className="goods-table__full-goods-close"
                  onClick={hadlerClose}></div>
              </div>
              <div className="cart__full-price">
                Full price: {fullPrice()} {currency}
              </div>
              <div className="goods-table__cart cart">
                {Object.keys(cart).map((el: string, i: number) => {
                  const item = goodsReindex[el as keyof typeof goodsReindex];
                  // const cost = item && typeof item === 'object' ? item.cost : 0;

                  return (
                    <Cart
                      key={item.title + i}
                      title={item.title}
                      cost={
                        !selCostFlag ? item.cost : (item.cost / 95).toFixed(0)
                      }
                      currency={currency}
                      quantity={cart[el]}
                      priceAllItem={
                        !selCostFlag
                          ? Number(item.cost) * cart[el]
                          : Number((item.cost / 95).toFixed(0)) * cart[el] +
                            ' ' +
                            currency
                      }
                      image={item.image}
                      articul={item.articul}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <ErrorBeckend />
          )}
        </section>
      )}
    </>
  );
};

export default CartList;
