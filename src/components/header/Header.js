import './Header.css';

export default function Header(props) {
  console.log(props);
  return (
    <header className="header">
      <div className="header__wrapper">
        <a className="header__logo">
          ME
          {/* <img src="#" alt="Image logo" /> */}
        </a>
        <nav className="header__nav menu">
          <ul className="menu__list-left">
            <li className="menu__item">
              <a href="#" className="menu__link">
                Products
              </a>
            </li>
            <li className="menu__item">
              <a href="#" className="menu__link">
                About us
              </a>
            </li>
            <li className="menu__item">
              <a href="#" className="menu__link">
                Contacts
              </a>
            </li>
            <li className="menu__item">
              <a href="#" className="menu__link">
                Search
              </a>
            </li>
          </ul>

          <ul className="menu__list-right">
            <li className="menu__item">
              <a href="#" className="menu__link">
                Cart
              </a>
            </li>
            <li className="menu__item">
              <a href="#" className="menu__link">
                Account
              </a>
            </li>
            <li className="menu__item">
              <a href="#" className="menu__link">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
