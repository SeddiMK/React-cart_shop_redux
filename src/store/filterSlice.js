import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    categoryName: 'All goods',
    searchInpVal:'',
    currentPage: 1,
    sort: {
      title: 'All goods',
      sortProperty: 'rating',
    },
  },
  reducers: {
    setCategoryName(state, action) {
         state.categoryName = action.payload;
    },
    setSort(state, action) {
      console.log(
        action.payload,
        'action.payload sort-------------------------'
      );
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
        state.currentPage = action.payload;
    },
    searchInpHeader(state, action) {
        state.searchInpVal = action.payload;
    },
  },
});

export const { setCategoryName, setSort, setCurrentPage,searchInpHeader } = filterSlice.actions;

// export const fullQuantityGoods = (state) => {
//   // console.log(state.goodsVal.fullQuantityGoodsSt);
//   return state.goodsVal.fullQuantityGoodsSt;
// };

export default filterSlice.reducer;
