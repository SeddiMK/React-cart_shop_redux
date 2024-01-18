import './Header.css';
import '../../app/Common.css';

import { useDispatch } from 'react-redux';
import { selCostFlag, selCurrensy } from '../../store/goodsSlice';

export default function Header(props) {
  const dispath = useDispatch();

  const handlerSelCurrency = (e) => {
    dispath(selCostFlag(e.target.value !== 'RUB'));
    dispath(selCurrensy(e.target.value));
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
                  type="submit"
                  className="menu__link btn-search btn-icon"></button>
              </form>
              <div className="block-search-cart__cart cart-header">
                <button className="cart-header__btn btn-cart btn-icon"></button>{' '}
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
