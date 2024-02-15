import './Goods.css';

export default function Goods({
  image,
  title,
  cost,
  currency,
  articul,
  rating,
  quantityOneGoods,
}) {
  return (
    <div className="goods-block">
      <div className="goods-block__imgage-wrap">
        <img className="goods-block__img" src={image} alt={title} />
      </div>

      <div className="goods-block__title-coast">
        <p>{title}</p>

        <p>{cost + ' ' + currency}</p>
      </div>
      <div className="goods-block__rating">rating: {rating}</div>

      <button
        className="goods-block__add-to-cart  btn add-to-cart"
        data-key={articul}>
        Add to cart <span>{quantityOneGoods}</span>
      </button>
    </div>
  );
}
