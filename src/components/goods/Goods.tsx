import { Link } from 'react-router-dom';
import './Goods.scss';

type GoodsProps = {
  articul: string;
  title: string;
  cost: number;
  image: string;
  rating: number;
  currency: string;
  description: string;
  quantityOneGoods: number;
};

const Goods: React.FC<GoodsProps> = ({
  articul,
  title,
  cost,
  image,
  rating,
  currency,
}) => {
  return (
    <div className="goods-block">
      <Link to={`/fullOptions/${articul}`}>
        <div className="goods-block__image-wrap img-wrp">
          <img className="goods-block__img img" src={image} alt={title} />
          <div className="goods-block__click-bate">
            Click hier or image to more options
          </div>
        </div>
      </Link>
      <div className="goods-block__title-coast">
        <p>{title}</p>

        <p>{cost + ' ' + currency}</p>
      </div>
      <div className="goods-block__rating rating">rating: {rating}</div>
    </div>
  );
};

export default Goods;
