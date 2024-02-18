import style from './Error.module.css';

export default function Error() {
  return (
    <>
      <div></div>
      <div className={style.root}>
        <h1>Ой... 404 такой страницы не существует.</h1>
        <h3>На данный момент есть страницы: Home, About us, Contacts </h3>
      </div>
    </>
  );
}
