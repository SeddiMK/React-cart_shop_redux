import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    categoryId: 0,
    currentPage: 1,
    sort: {
      title: 'All goods',
      sortProperty: 'rating',
    },
  },
  reducers: {
    setCategoryId(state, action) {
      console.log(
        action.payload,
        'action.payload categoryID-------------------------'
      );
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      console.log(
        action.payload,
        'action.payload sort-------------------------'
      );
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      console.log(
        action.payload,
        'action.payload PageCount-------------------------'
      );
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage } = filterSlice.actions;

// export const fullQuantityGoods = (state) => {
//   // console.log(state.goodsVal.fullQuantityGoodsSt);
//   return state.goodsVal.fullQuantityGoodsSt;
// };

export default filterSlice.reducer;
