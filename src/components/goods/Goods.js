import './Goods.css';

import { useDispatch } from 'react-redux';

import { increment } from '../../store/cartSlice';

export default function Goods({
  articul,
  title,
  cost,
  image,
  rating,
  currency,
  quantityOneGoods,
}) {
  // // карзина в локальном store/ карзину должен давать бэкенд
  // const dispath = useDispatch();
  // // передать все параметры в store dispatch CartList
  // const onClickAddGoods = () => {
  //   const dataGoods = {
  //     articul,
  //     title,
  //     cost,
  //     image,
  //     rating,
  //     currency,
  //     quantityOneGoods,
  //   };
  //   dispath(increment(dataGoods));
  // };

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
        data-key={articul}
        // onClick={onClickAddGoods}
      >
        Add to cart <span>{quantityOneGoods}</span>
      </button>
    </div>
  );
}
