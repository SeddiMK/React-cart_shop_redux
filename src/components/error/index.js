import style from './Error.module.css';

export default function Error() {
  return (
    <>
      <div className={style.root}>
        <h1>Ой... 404 такой страницы не существует</h1>
      </div>
    </>
  );
}
