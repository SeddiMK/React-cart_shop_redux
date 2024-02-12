import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    categoryName: 'allgoods',
    searchInpVal: '',
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
      console.log(state.sort, 'state.sort sort-------------------------');
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    searchInpHeader(state, action) {
      state.searchInpVal = action.payload;
    },
    setFilters(state, action) {
      state.categoryName = action.payload.categoryName;
      state.searchInpVal = action.payload.searchInpVal;
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
    },
  },
});

export const {
  setCategoryName,
  setSort,
  setCurrentPage,
  searchInpHeader,
  setFilters,
} = filterSlice.actions;

// export const setCategoryName = (state) => {
//   // console.log(state.goodsVal.setCategoryName);
//   return state.goodsVal.setCategoryName;
// };

export default filterSlice.reducer;
