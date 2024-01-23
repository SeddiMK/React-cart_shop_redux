import './Cart.css';

export default function Cart(props) {
  return (
    <>
      <div className=" cart__one-product">
        <table>
          <tbody>
            <tr className="cart__goods-list">
              <td>Name good</td>
              <td>Price for one item</td>
              <td>Quantity</td>
              <td>Price all item</td>
            </tr>
            <tr className="cart__goods">
              <td className="cart__goods-name">
                <h2 className="cart__goods-title">{props.title}</h2>
                <img
                  className="cart__image-table-td"
                  src={props.image}
                  alt={props.title}
                />
              </td>
              <td className="cart__goods-price-one">
                {props.cost} {props.currency}
              </td>
              <td className="cart__goods-quantity">{props.quantity}</td>
              <td className="cart__goods-price-all">{props.priceAllItem}</td>
            </tr>
          </tbody>
        </table>
        <div className="cart__btn-block">
          <button
            className="cart__delete-one-position delete-one-position btn"
            data-key={props.articul}>
            Delete one position
          </button>
          <button
            className="cart__delete-quantity delete-quantity btn"
            data-key={props.articul}>
            Delete quantity
          </button>
        </div>
      </div>
    </>
  );
}
