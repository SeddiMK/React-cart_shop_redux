import { createSlice } from '@reduxjs/toolkit';
import goodsArr from '../data/goods.json';

export const goodsSlice = createSlice({
  name: 'goods',
  initialState: {
    goodsVal: goodsArr,
  },
  reducers: {},
});

export const {} = goodsSlice.actions;
export const selectGoods = (state) => {
  // console.log(state);
  return state.goodsVal.goodsVal;
};
export default goodsSlice.reducer;
