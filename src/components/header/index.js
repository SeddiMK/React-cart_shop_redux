import './Header.css';
import '../../app/Common.css';

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selCostFlag,
  selCurrensy,
  fullQuantityGoods,
} from '../../store/goodsSlice';

export default function Header() {
  // data-header-nav-link --------------
  const linkHeaderArr = [
    'Home',
    'Products',
    'Discount',
    'HITs',
    'About us',
    'Contacts',
    'Products',
    'Discount',
    'HITs',
    'About us',
    'Contacts',
  ];
  const linkHeaderAuthArr = ['Sig in', 'Registration', 'Logout'];
  const selectCategory = [
    'All goods',
    'Cartoon',
    'Chair',
    'Bed',
    'Table',
    'Drawer',
  ];
  // end -----------------

  let fullQuantityGoodsCart = useSelector(fullQuantityGoods);
  const cartClass = document.querySelector('.goods-table');
  const dispath = useDispatch();

  const handlerSelCurrency = (e) => {
    dispath(selCostFlag(e.target.value !== 'RUB'));
    dispath(selCurrensy(e.target.value));
  };

  const handleCart = () => {
    if (cartClass && fullQuantityGoodsCart !== 0) {
      cartClass.classList.toggle('activ');
    }
  };

  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/" className="header__logo">
          ME
          {/* <img src="#" alt="Image logo" /> */}
        </Link>
        <nav className="header__nav menu">
          <ul className="menu__list-left">
            {linkHeaderArr.map((el, i) => (
              <li className="menu__item" key={el + i}>
                <NavLink
                  to={`/${el.toLowerCase().trim().split(' ')[0]}`}
                  className="menu__link">
                  {el}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="header__search-cart block-search-cart">
            <form className="block-search-cart__search search-header">
              <input type="search" placeholder="Search..." />
              <button
                type="search"
                className="menu__link btn-search btn-icon"></button>
            </form>
            <div className="block-search-cart__cart cart-header">
              <div className="cart-header__icon">
                <span className="cart-header__cart-icon" onClick={handleCart}>
                  <button className="cart-header__btn cart-btn"></button>
                </span>
                <span className="cart-header__quantity-goods">
                  {fullQuantityGoodsCart}
                </span>
              </div>

              <select
                name="currency"
                onChange={handlerSelCurrency}
                className="cart-header__currency select--header">
                <option value="RUB">RUB</option>
                <option value="USD">USD</option>
              </select>

              <select
                name="category"
                // onChange={handlerSelCategory}
                className="cart-header__category select--header">
                {selectCategory.map((el) => (
                  <option value={el}>{el}</option>
                ))}
              </select>
            </div>
          </div>
          <ul className="menu__list-right list-right auth_block">
            {linkHeaderAuthArr.map((el, i) => (
              <li className="menu__item" key={el + i}>
                <NavLink
                  to={`/${el.toLowerCase()}`}
                  target="_blank"
                  className="menu__link">
                  {el}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
