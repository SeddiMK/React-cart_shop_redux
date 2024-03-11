import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum SortPropertyEnum {
  RATING_ASC = '-rating',
  COST_DESC = 'cost',
  COST_ASC = '-cost',
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
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
    sortProperty: SortPropertyEnum.RATING_ASC,
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryName(state, action: PayloadAction<string>) {
      state.categoryName = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    searchInpHeader(state, action: PayloadAction<string>) {
      state.searchInpVal = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.categoryName = action.payload.categoryName;
        state.searchInpVal = action.payload.searchInpVal;
        state.currentPage = action.payload.currentPage;
        state.sort = action.payload.sort;
      } else {
        state.categoryName = 'allgoods';
        state.searchInpVal = '';
        state.currentPage = 1;
        state.sort = {
          name: 'popularity',
          sortProperty: SortPropertyEnum.RATING_ASC,
        };
      }
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
