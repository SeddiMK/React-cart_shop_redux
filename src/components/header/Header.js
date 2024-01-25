import './Header.css';
import '../../app/Common.css';

import { useSelector, useDispatch } from 'react-redux';
import {
  selCostFlag,
  selCurrensy,
  fullQuantityGoods,
} from '../../store/goodsSlice';

export default function Header(props) {
  let fullQuantity = useSelector(fullQuantityGoods);
  const cartClass = document.querySelector('.goods-table');
  const dispath = useDispatch();

  const handlerSelCurrency = (e) => {
    dispath(selCostFlag(e.target.value !== 'RUB'));
    dispath(selCurrensy(e.target.value));
  };

  console.log(fullQuantity === 0);
  const handleCart = () => {
    if (cartClass && fullQuantity !== 0) cartClass.classList.toggle('activ');
    // if (fullQuantity === 0) cartClass.classList.remove('activ'); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  };
  return (
    <header className="header">
      <div className="header__wrapper">
        <a href="/" className="header__logo">
          ME
          {/* <img src="#" alt="Image logo" /> */}
        </a>
        <nav className="header__nav menu">
          <ul className="menu__list-left">
            <li className="menu__item">
              <a href="/products" className="menu__link">
                Products
              </a>
            </li>
            <li className="menu__item">
              <a href="/about" className="menu__link">
                About us
              </a>
            </li>
            <li className="menu__item">
              <a href="/contacts" className="menu__link">
                Contacts
              </a>
            </li>

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
                    <button className="cart-header__btn cart-btn"></button>{' '}
                  </span>
                  <span className="cart-header__quantity-goods">
                    {fullQuantity}
                  </span>
                </div>
                <select
                  onChange={handlerSelCurrency}
                  className="cart-header__currency">
                  <option value="RUB">RUB</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>
          </ul>

          <ul className="menu__list-right list-right auth_block">
            <li className="list-right__item menu__item">
              <a href="/" className="list-right__link menu__link">
                Account
              </a>
            </li>
            <li className="list-right__item menu__item">
              <a href="/" className="list-right__link menu__link">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
