export default function Cart(props) {
  return (
    <>
      <div className="carts-block">
        <table>
          <tbody>
            <tr className="goods">
              <td>Name good</td>
              <td>Price for one item</td>
              <td>Quantity</td>
              <td>Price all item</td>
            </tr>
            <tr className="goods">
              <td className="goods-name">
                {props.title}
                <img
                  className="image-table-td"
                  src={props.image}
                  alt={props.title}
                />
              </td>
              <td className="goods-price-one">{props.cost}</td>
              <td className="goods-quantity">{props.quantity}</td>
              <td className="goods-price-all">{props.priceAllItem}</td>
            </tr>
          </tbody>
        </table>
        <button className="delete-one-position" data-key={props.articul}>
          Delete one position
        </button>
        <button className="delete-quantity" data-key={props.articul}>
          Delete quantity
        </button>
      </div>
    </>
  );
}
