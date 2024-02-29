import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
type CartItem = {
  articul: string;
  cost: number;
};

interface CartSliceState {
  cartVal: { [articul: string]: any }; // CartItem[]; //
  articul: string;
  cartOpen: boolean;
}

const initialState: CartSliceState = {
  cartVal: {},
  articul: 'articul',
  cartOpen: false,
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

      // state.cartVal = []; //---------------------------
    },
    clearCart: (state) => {
      // clear cart
      state.cartVal = {};

      // state.cartVal = []; //---------------------------
    },
    cartOpen: (state, action: PayloadAction<false>) => {
      state.cartOpen = action.payload;
    },
  },
});

export const { increment, minus, del, clearCart, cartOpen } = cartSlice.actions;

export const selectCartOpenSt = (state: RootState) => state.cartVal.cartOpen;
export const selectCart = (state: RootState) => state.cartVal.cartVal;

export default cartSlice.reducer;
