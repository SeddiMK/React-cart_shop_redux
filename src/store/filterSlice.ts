import { createSlice } from '@reduxjs/toolkit';

type Sort = {
  name: string;
  sortProperty: '-rating' | 'cost' | '-cost';
};

interface FilterSliceState {
  categoryName: string;
  searchInpVal: string;
  currentPage: number;
  sort: Sort;
}

const initialState: FilterSliceState = {
  categoryName: 'allgoods',
  searchInpVal: '',
  currentPage: 1,
  sort: {
    name: 'popularity',
    sortProperty: '-rating',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryName(state, action) {
      state.categoryName = action.payload;
    },
    setSort(state, action) {
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

export default filterSlice.reducer;
