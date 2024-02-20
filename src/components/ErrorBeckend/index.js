import style from './ErrorBeckend.module.css';

export default function ErrorBeckend() {
  return (
    <>
      <div></div>
      <div className={style.root}>
        <h1>Ой... Мы не можем отобразить товар.</h1>
        <p>
          Ошибка бекенда. Наша серверная часть не может отправить список
          корзины.
        </p>
        <br></br>
        <p>
          Внимание! Для отображения корзины сначала выберите все фильры, потом
          добавляйте товар в корзину.
        </p>
      </div>
    </>
  );
}
