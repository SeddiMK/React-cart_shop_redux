import { Link } from 'react-router-dom';
import './About.scss';
import mailLogo from '../../assets/image/icon/gmail.png';
import githubLogo from '../../assets/image/icon/gitHub.png';
import skypeLogo from '../../assets/image/icon/skype.png';

const About: React.FC = () => {
  return (
    <>
      <section className="about">
        <div className="about__title">About US</div>

        <div className="about__contact contact">
          <div className="contact__technologies">
            <p>
              This application was developed using the React library, and same
              Redux-toolkit,Configure-store, Axios,TypeScript, JavaScript, HTML,
              BEM, SCSS, Mobile-First. The backend is implemented in mockapi.io.
            </p>
            <p>
              <b>Implemented here:</b> instant search, product categories,
              sorting of goods, switching prices in currency (rate 95r),
              pagination (react-paginate library), skeletons (shows an image of
              the goods during a request from the backend), preloader,
              lasy-loading.
            </p>
            <p>
              Cart - adding products, removing products, calculating the total
              amounts in RUB and USD, quantity of goods, removal of one item one
              product, deleting all positions of one product, clearing baskets.
            </p>
            <p>
              When you click on the product card, you will go to the detailed
              description goods. Here you can find a detailed description, add
              or remove the item from the cart.
            </p>
            <p>
              ---------------------------------------------------------------
            </p>
            <p>
              Данное приложение разаработано с применением библиотеки React, а
              так же Redux-toolkit, Axios,TypeScript, JavaScript, HTML, БЭМ,
              SCSS, Mobile-First. Backend реализован в mockapi.io.
            </p>
            <p>
              <b>Здесь реализовано:</b> мгновенный поиск, категории товаров,
              сортировка товаров, переключение стоимости в валюте(курс 95р),
              пагинация(библиотека react-paginate), skeletons(показывает образ
              товаров во время запроса с бекенда), preloader, lasy-loading.
            </p>
            <p>
              Корзина- добавление товаров, удаление товаров, подсчет итоговой
              суммы в RUB и USD, количество товара, удаление одной позиции
              одного товара, удаление всех позиций одного товара, очистка
              корзины.
            </p>
            <p>
              При нажатии на карточку товара, перейдете в подробное описание
              товара. Здесь можно ознакомиться с подробным описанием, добавить
              или удалить товар из корзины.
            </p>
            <p>
              ---------------------------------------------------------------
            </p>
          </div>

          <div className="contact__my-contact">
            <p>
              My contact:{' '}
              <Link className="contact__link" to={`/contacts`}>
                <b>click</b>
              </Link>
            </p>
            <p>
              Связь со мной:{' '}
              <Link className="contact__link" to={`/contacts`}>
                <b>клик</b>
              </Link>
            </p>{' '}
            <div className="contact__my-contact-link">
              <div className="contact__my-contact-mail my-contact">
                <b>Mail:</b>{' '}
                <a
                  className="my-contact__link"
                  href="https://mail.google.com/mail/u/1/?view=cm&fs=1&to=web.egorovm@gmail.com&tf=1"
                  target="_blank"
                  rel="noreferrer">
                  <div className="contact__icon icon-wrp">
                    <img
                      className="contact__icon img"
                      src={mailLogo}
                      alt="mail"
                    />
                  </div>
                  <span>web.egorovm@gmail.com</span>
                </a>
              </div>
              <div className="contact__my-contact-git-hub my-contact">
                <b>GitHub:</b>{' '}
                <a
                  className="my-contact__link"
                  href="https://github.com/SeddiMK"
                  target="_blank"
                  rel="noreferrer">
                  <div className="contact__icon icon-wrp">
                    <img
                      className="contact__icon img"
                      src={githubLogo}
                      alt="gitHub"
                    />
                  </div>
                  <span>SeddiMK</span>
                </a>
              </div>
              <div className="contact__my-contact-skype my-contact">
                <b>Skype:</b>{' '}
                <a
                  className="my-contact__link"
                  href="skype:live:.cid.985f030235657018?add"
                  target="_blank"
                  rel="noreferrer">
                  <div className="contact__icon icon-wrp">
                    <img
                      className="contact__icon img"
                      src={skypeLogo}
                      alt="gitHub"
                    />
                  </div>
                  <span>Maksim Egorov</span>
                </a>
              </div>
              <div className="contact__my-contact-link-project my-contact">
                <b>Link to project from github:</b>{' '}
                <a
                  className="my-contact__link"
                  href="https://github.com/SeddiMK/React-cart_shop_redux/tree/main/build"
                  target="_blank"
                  rel="noreferrer">
                  <div className="contact__icon icon-wrp">
                    <i className="contact__icon img fa fa-link fa-2x"></i>
                  </div>
                  <span>React-cart_shop_redux</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
