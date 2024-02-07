import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    categoryId: 0,
    sort: {
      title: 'All goods',
      sortProperty: 'rating',
    },
  },
  reducers: {
    setCategoryId(state, action) {
      console.log(action.payload);
      state.categoryId = action.payload;
    },
  },
});

export const { setCategoryId } = filterSlice.actions;

// export const fullQuantityGoods = (state) => {
//   // console.log(state.goodsVal.fullQuantityGoodsSt);
//   return state.goodsVal.fullQuantityGoodsSt;
// };

export default filterSlice.reducer;
