export default function Goods(props) {
  return (
    <div className="goods-block">
      <div className="goods-block__imgage-wrap">
        <img className="goods-block__img" src={props.image} alt={props.title} />
      </div>

      <div className="goods-block__title-coast">
        <p>{props.title}</p>
        <p>{props.cost}</p>
      </div>

      <button
        className="goods-block__add-to-cart  btn add-to-cart"
        data-key={props.articul}>
        Add to cart
      </button>
    </div>
  );
}
