import { CartItem } from '../store/cartSlice';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const jsonCart = () => {
    if (data) {
      return JSON.parse(data) as CartItem;
    } else {
      return {} as CartItem;
    }
  };
  return jsonCart();
};
