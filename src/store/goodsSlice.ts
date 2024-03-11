import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

// import goodsArr from '../action/goods.json';

type GoodsSliceState = {
  cost: number;
  currency: string;
  flagSelCurrency: boolean;
  fullQuantityGoodsSt: number;
};

const initialState: GoodsSliceState = {
  cost: 0,
  currency: 'RUB',
  flagSelCurrency: false,
  fullQuantityGoodsSt: 0,
};

export const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    selCurrensy(state, action: PayloadAction<string>) {
      if (state.currency !== undefined) {
        if (state.currency !== action.payload) {
          state.currency = action.payload;
        }
      }
    },
    selCostFlag(state, action: PayloadAction<boolean>) {
      state.flagSelCurrency = action.payload;
    },
    fullQuantity(state, action: PayloadAction<number>) {
      if (action.payload !== undefined) {
        state.fullQuantityGoodsSt = action.payload;
      }
    },
  },
});

export const { selCurrensy, selCostFlag, fullQuantity } = goodsSlice.actions; //, setGoodsValArr

export const fullQuantityGoods = (state: RootState) =>
  state.goodsVal.fullQuantityGoodsSt;

export const selectCostFlag = (state: RootState) =>
  state.goodsVal.flagSelCurrency;

export const selectCurrensy = (state: RootState) => state.goodsVal.currency;

// export const selectGoods = (state: RootState) => state.goodsVal.goodsValArr;

export default goodsSlice.reducer;
