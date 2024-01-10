import { useEffect } from 'react';
// import { selectCurrency } from '../header/Header';

export default function Goods(props) {
  // const [selCurState, setSelCurState] = useState(0);
  // console.log(props.currency[selectCurrency]);
  // console.log(props.selCurState);
  console.log(props.currency);

  // useEffect(() => {
  //   console.log(props.selCurState);
  //   if (props.selCurState !== 0) return props.currency[props.selCurState];
  // }, [props.selCurState]); {props.currency[props.selCurState]}
  return (
    <div className="goods-block">
      <div className="goods-block__imgage-wrap">
        <img className="goods-block__img" src={props.image} alt={props.title} />
      </div>

      <div className="goods-block__title-coast">
        <p>{props.title}</p>

        <p>{props.cost + ' '}</p>
      </div>

      <button
        className="goods-block__add-to-cart  btn add-to-cart"
        data-key={props.articul}>
        Add to cart
      </button>
    </div>
  );
}
