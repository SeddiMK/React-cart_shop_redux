import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { getCartFromLS } from '../utils/getCartLS';

export type CartItem = {
  [articul: string]: number;
};

interface CartSliceState {
  cartVal: CartItem;
  articul: string;
  cartOpen: boolean;
  cartOpenError: boolean;
}

const initialState: CartSliceState = {
  cartVal: getCartFromLS(),
  articul: 'articul',
  cartOpen: false,
  cartOpenError: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<string>) => {
      let articul = action.payload;

      if (state.cartVal[articul] === undefined) {
        state.cartVal[articul] = 0;
      }

      state.cartVal[articul]++;
      // state.cartVal.push(action.payload); //----------------------
    },
    minus: (state, action: PayloadAction<string>) => {
      let articul = action.payload;

      if (state.cartVal[articul] === undefined) {
        state.cartVal[articul] = 0;
      }

      // // delete one goods
      if (state.cartVal[articul] > 0) {
        state.cartVal[articul]--;
      }

      // state.cartVal = state.cartVal.filter(obj => obj[articul] === action.payload); //----------------------

      // // delete to cart
      if (state.cartVal[articul] === 0) {
        state.cartVal[articul] = 0;
        delete state.cartVal[articul];
      }
    },
    del: (state, action: PayloadAction<string>) => {
      let articul = action.payload;

      // delete to cart
      if (state.cartVal[articul] > 0) {
        state.cartVal[articul] = 0;
        delete state.cartVal[articul];
      }
    },
    clearCart: (state) => {
      // clear cart
      state.cartVal = {};
    },
    cartOpen: (state, action: PayloadAction<false>) => {
      state.cartOpen = action.payload;
    },
    cartOpenError: (state, action: PayloadAction<boolean>) => {
      state.cartOpenError = action.payload;
    },
  },
});

export const { increment, minus, del, clearCart, cartOpen, cartOpenError } =
  cartSlice.actions;

export const selectCartOpenSt = (state: RootState) => state.cartVal.cartOpen;
export const selectCartOpenErrorSt = (state: RootState) =>
  state.cartVal.cartOpenError;
export const selectCart = (state: RootState) => state.cartVal.cartVal;

export default cartSlice.reducer;
