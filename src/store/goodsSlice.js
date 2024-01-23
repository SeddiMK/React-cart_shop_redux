import { createSlice } from '@reduxjs/toolkit';
import goodsArr from '../data/goods.json';

export const goodsSlice = createSlice({
  name: 'goods',
  initialState: {
    goodsValArr: goodsArr,
    cost: goodsArr[0].cost,
    currency: goodsArr[0].currency,
    flagSelCurrency: false,
    fullQuantGoods: 0,
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
    fullQuantity: (state, data) => {
      if (data.payload !== undefined) {
        state.fullQuantGoods = data.payload;
      }
    },
  },
});

export const { selCurrensy, selCostFlag, fullQuantity } = goodsSlice.actions;

export const fullQuantityGoods = (state) => {
  // console.log(state.goodsVal.fullQuantGoods);
  return state.goodsVal.fullQuantGoods;
};

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
  return state.goodsVal.goodsValArr;
};

export default goodsSlice.reducer;
