import { Link } from 'react-router-dom';
import './About.scss';

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
              SCSS, Mobile-First.
            </p>
            <p>
              <b>Here we implement:</b>
              instant search, product category, sorting goods, switching prices
              in foreign currency (rate 95r), pagination (the library reacts to
              pages).
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
              так же Redux-toolkit, Axios,TypeScript, JavaScript, HTML, SCSS,
              Mobile-First.
            </p>
            <p>
              <b>Здесь реализовано:</b> мгновенный поиск, категории товаров,
              сортировка товаров, переключение стоимости в валюте(курс 95р),
              пагинация(библиотека react-paginate).
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
                click
              </Link>
            </p>
            <p>
              Связь со мной:{' '}
              <Link className="contact__link" to={`/contacts`}>
                клик
              </Link>
            </p>{' '}
            <div className="contact__my-contact-link">
              {' '}
              <p className="contact__my-contact-mail">
                <b>Mail:</b>{' '}
                <a
                  href="https://mail.google.com/mail/u/1/?view=cm&fs=1&to=web.egorovm@gmail.com&tf=1"
                  target="_blank"
                  rel="noreferrer">
                  web.egorovm@gmail.com
                </a>
              </p>
              <p className="contact__my-contact-git-hub">
                <b>GitHub:</b>{' '}
                <a
                  href="https://github.com/SeddiMK"
                  target="_blank"
                  rel="noreferrer">
                  SeddiMK
                </a>
              </p>
              <p className="contact__my-contact-skype">
                <b>Skype:</b>{' '}
                <a
                  href="skype:live:.cid.985f030235657018?add"
                  target="_blank"
                  rel="noreferrer">
                  Maksim Egorov
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
