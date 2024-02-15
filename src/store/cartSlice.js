import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    //начальное состояние хранилища
    cartVal: {},
    articul: 'articul',
  },
  reducers: {
    increment: (state, data) => {
      let articul = data.payload;

      // есть ли что то в объекте cartVal
      if (state.cartVal[articul] === undefined) {
        state.cartVal[articul] = 0;
      }
      state.cartVal[articul]++;
      state.articul = articul;
    },
    minus: (state, data) => {
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
        delete state.cartVal[articul];
      }
    },
    del: (state, data) => {
      let articul = data.payload;

      // // delete to cart
      if (state.cartVal[articul] > 0) {
        state.cartVal[articul] = 0;
        delete state.cartVal[articul];
      }
    },
  },
});

export const { increment, minus, del } = cartSlice.actions;

export const selectCart = (state) => {
  // console.log(state.cartVal.cartVal, 'state.cartVal.cartVal');
  return state.cartVal.cartVal;
};

export default cartSlice.reducer;
