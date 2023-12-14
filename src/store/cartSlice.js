import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartVal: {},
  },
  reducers: {
    increment: (state, data) => {
      let articul = data.payload;

      // есть ли что то в объекте cartVal
      if (state.cartVal[articul] === undefined) {
        state.cartVal[articul] = 0;
      }
      state.cartVal[articul]++;
    },
    minus: (state, data) => {
      // let priceVal = +data.payload;
      let articul = data.payload;
      // console.log('minus');

      if (state.cartVal[articul] === undefined) {
        state.cartVal[articul] = 0;
      }

      // // delete one goods
      // console.log(state.cartVal[articul]);
      if (state.cartVal[articul] > 0) {
        state.cartVal[articul]--;
      }
      // // delete to cart
      if (state.cartVal[articul] === 0) {
        state.cartVal[articul] = 0;
      }
    },
    del: (state, data) => {
      let articul = data.payload;
      // console.log('del');

      // // delete to cart
      if (state.cartVal[articul] > 0) {
        state.cartVal[articul] = 0;
      }
    },
  },
});

export const { increment, minus, del } = cartSlice.actions;
export const selectCart = (state) => {
  // console.log(state);
  return state.cartVal.cartVal;
};
export default cartSlice.reducer;
