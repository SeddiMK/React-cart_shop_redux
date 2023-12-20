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
                {props.title}
                <img
                  className="cart__image-table-td"
                  src={props.image}
                  alt={props.title}
                />
              </td>
              <td className="cart__goods-price-one">{props.cost}</td>
              <td className="cart__goods-quantity">{props.quantity}</td>
              <td className="cart__goods-price-all">{props.priceAllItem}</td>
            </tr>
          </tbody>
        </table>
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
    </>
  );
}
