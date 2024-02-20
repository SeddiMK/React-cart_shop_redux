import { createSlice } from '@reduxjs/toolkit';

// import goodsArr from '../data/goods.json';

export const goodsSlice = createSlice({
  name: 'goods',
  initialState: {
    goodsValArr: [], //goodsArr
    cost: 0, //goodsArr[0].cost,
    currency: 'RUB', //goodsArr[0].currency,
    flagSelCurrency: false,
    fullQuantityGoodsSt: 0,
  },
  reducers: {
    selCurrensy(state, data) {
      if (state.currency !== undefined) {
        if (state.currency !== data.payload) {
          state.currency = data.payload;
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
    setGoodsValArr(state, data) {
      if (state.goodsValArr !== undefined) {
        state.goodsValArr = data.payload;
      }
    },
    // selectCostFlag(state, data) {
    //   if (state.currency !== 'RUB') {
    //     state.currency = data.payload;
    //   }
    // },
  },
});

export const { selCurrensy, selCostFlag, fullQuantity, setGoodsValArr } =
  goodsSlice.actions;

export const fullQuantityGoods = (state) => state.goodsVal.fullQuantityGoodsSt;

export const selectCostFlag = (state) => state.goodsVal.flagSelCurrency;

export const selectCurrensy = (state) => state.goodsVal.currency;

export const selectGoods = (state) => state.goodsVal.goodsValArr;

export default goodsSlice.reducer;
