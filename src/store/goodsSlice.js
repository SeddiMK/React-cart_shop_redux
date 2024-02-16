import { createSlice } from '@reduxjs/toolkit';

import goodsArr from '../data/goods.json';

export const goodsSlice = createSlice({
  name: 'goods',
  initialState: {
    goodsValArr: goodsArr,
    cost: goodsArr[0].cost,
    currency: goodsArr[0].currency,
    flagSelCurrency: false,
    fullQuantityGoodsSt: 0,
  },
  reducers: {
    selCurrensy(state, data) {
      let selCurrensy = data.payload;
      if (state.currency !== undefined) {
        if (state.currency !== selCurrensy) {
          state.currency = selCurrensy;
        }
      }
    },
    selCostFlag(state, data) {
      if (state.currency !== selCurrensy) {
        state.flagSelCurrency = data.payload;
      }
    },
    fullQuantity(state, data) {
      if (data.payload !== undefined) {
        state.fullQuantityGoodsSt = data.payload;
      }
    },
    // setGoodsValArr(state, data) {
    //   if (state.goodsValArr !== undefined) {
    //     state.goodsValArr = data.payload;
    //   }
    // },
  },
});

export const { selCurrensy, selCostFlag, fullQuantity } = goodsSlice.actions;

export const fullQuantityGoods = (state) => {
  return state.goodsVal.fullQuantityGoodsSt;
};

export const selectCostFlag = (state) => {
  return state.goodsVal.flagSelCurrency;
};
export const selectCurrensy = (state) => {
  return state.goodsVal.currency;
};

export const selectGoods = (state) => {
  return state.goodsVal.goodsValArr;
};

export default goodsSlice.reducer;
