import style from './Error.module.css';

export default function Error() {
  return (
    <>
      <div className={style.root}>Ой... 404 такой страницы не существует</div>
    </>
  );
}
