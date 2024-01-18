import { createSlice } from '@reduxjs/toolkit';
import goodsArr from '../data/goods.json';

export const goodsSlice = createSlice({
  name: 'goods',
  initialState: {
    goodsVal: goodsArr,
    cost: goodsArr[0].cost,
    currency: goodsArr[0].currency,
    flagSelCurrency: false,
  },
  reducers: {
    selCurrensy: (state, data) => {
      let selCurrensy = data.payload;
      // есть ли что то в объекте cartVal
      if (state.currency !== undefined) {
        if (state.currency !== selCurrensy) {
          state.currency = selCurrensy;
        }
      }
    },
    selCostFlag: (state, data) => {
      if (state.currency !== selCurrensy) {
        state.flagSelCurrency = data.payload;
      }
    },
  },
});

export const { selCostFlag, selCurrensy } = goodsSlice.actions;

export const selectCostFlag = (state) => {
  // console.log(state.goodsVal.flagSelCurrency);
  return state.goodsVal.flagSelCurrency;
};
export const selectCurrensy = (state) => {
  // console.log(state.goodsVal.currency);
  return state.goodsVal.currency;
};

export const selectGoods = (state) => {
  // console.log(state);
  return state.goodsVal.goodsVal;
};

export default goodsSlice.reducer;
