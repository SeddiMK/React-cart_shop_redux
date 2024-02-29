import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

// import goodsArr from '../data/goods.json';

type GoodsSliceState = {
  goodsValArr: [];
  cost: number;
  currency: string;
  flagSelCurrency: boolean;
  fullQuantityGoodsSt: number;
};

const initialState: GoodsSliceState = {
  goodsValArr: [], //goodsArr
  cost: 0, //goodsArr[0].cost,
  currency: 'RUB', //goodsArr[0].currency,
  flagSelCurrency: false,
  fullQuantityGoodsSt: 0,
};

export const goodsSlice = createSlice({
  name: 'goods',
  initialState,
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

export const fullQuantityGoods = (state: RootState) =>
  state.goodsVal.fullQuantityGoodsSt;

export const selectCostFlag = (state: RootState) =>
  state.goodsVal.flagSelCurrency;

export const selectCurrensy = (state: RootState) => state.goodsVal.currency;

export const selectGoods = (state: RootState) => state.goodsVal.goodsValArr;

export default goodsSlice.reducer;
