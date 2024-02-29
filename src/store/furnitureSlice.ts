import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '.';

// export type FetchFurnitureState = {
//   sortBy,
//       order,
//       searchCategoryFilter,
//       searchInpValaction,
//       currentPage,
// }

export const fetchFurniture = createAsyncThunk(
  'furniture/fetchFurnitureStatus',
  async (params) => {
    const {
      sortBy,
      order,
      searchCategoryFilter,
      searchInpValaction,
      currentPage,
    } = params;

    const { action } = await axios.get(
      `https://65c21d61f7e6ea59682aa9c7.mockapi.io/action_shop_furniture?limit=9&page=${currentPage}&sortBy=${sortBy}&order=${order}&search=${searchInpValaction}&filter=${searchCategoryFilter}`
    ); //limit=должен давать бэкенд(mockapi.io- не дает всех страниц от количетва товара и массив, объект корзины)limit=6&sortBy=cost&order=asc&page=${currentPage}&search=${valFilterSearch}&rating= можно вынести в отдельный файл
    console.log(
      `https://65c21d61f7e6ea59682aa9c7.mockapi.io/action_shop_furniture?page=${currentPage}&sortBy=${sortBy}&order=${order}&search=${searchInpValaction}&filter=${searchCategoryFilter}`
    );
    return action;
  }
);

type Furniture = {
  articul: string;
  title: string;
  cost: number;
  image: string;
  rating: number;
  description: string;
  currency: string;
};

interface FurnitureSliceState {
  items: Furniture[];
  itemsReindexing: [];
  status: 'loading' | 'success' | 'error';
  loading: boolean;
}

const initialState: FurnitureSliceState = {
  items: [],
  itemsReindexing: [],
  status: 'loading', // loading | success | error
  loading: true,
};

export const furnitureSlice = createSlice({
  name: 'furniture',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Furniture[]>) => {
      state.items = action.payload;
    },

    setItemsReindexing: (state) => {
      if (state.items.length > 1) {
        state.items.reduce((accum:[], item:) => {
          accum[item.articul] = item;
          state.itemsReindexing = accum;
        }, {});
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFurniture.pending, (state) => {
      state.status = 'loading';
      state.loading = true;
      state.items = [];
    });
    builder.addCase(fetchFurniture.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
      state.loading = false;

      state.items.reduce((accum, item) => {
        accum[item.articul] = item;
        return (state.itemsReindexing = accum);
      }, {});
    });
    builder.addCase(fetchFurniture.rejected, (state) => {
      state.status = 'error';
      state.items = [];
      state.loading = false;
    });
  },
});

export const { setItems, setItemsReindexing } = furnitureSlice.actions;

export const itemsReindexing = (state: RootState) =>
  state.furniture.itemsReindexing;

export default furnitureSlice.reducer;
