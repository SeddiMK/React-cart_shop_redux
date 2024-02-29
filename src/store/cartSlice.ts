import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartVal: {},
    articul: 'articul',
    cartOpen: false,
  },
  reducers: {
    increment: (state, data) => {
      let articul = data.payload;

      if (state.cartVal[articul] === undefined) {
        state.cartVal[articul] = 0;
      }

      state.cartVal[articul]++;
      // state.cartVal.push(data.payload); //----------------------
    },
    minus: (state, data) => {
      let articul = data.payload;

      if (state.cartVal[articul] === undefined) {
        state.cartVal[articul] = 0;
      }

      // // delete one goods
      if (state.cartVal[articul] > 0) {
        state.cartVal[articul]--;
      }

      // state.cartVal = state.cartVal.filter(obj => obj[articul] === data.payload); //----------------------

      // // delete to cart
      if (state.cartVal[articul] === 0) {
        state.cartVal[articul] = 0;
        delete state.cartVal[articul];
      }
    },
    del: (state, data) => {
      let articul = data.payload;

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
    cartOpen: (state, data) => {
      state.cartOpen = data.payload;
    },
  },
});

export const { increment, minus, del, clearCart, cartOpen } = cartSlice.actions;

export const selectCartOpenSt = (state) => state.cartVal.cartOpen;
export const selectCart = (state) => state.cartVal.cartVal;

export default cartSlice.reducer;
