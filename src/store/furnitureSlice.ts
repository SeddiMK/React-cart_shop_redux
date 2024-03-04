import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '.';
import { Sort } from './filterSlice';

export type SearchFurnitureParams = {
  sortBy: string;
  order: string;
  searchCategoryFilter: string;
  searchInpValData: string;
  currentPage: string;
};

export type Furniture = {
  articul: string;
  title: string;
  cost: number;
  image: string;
  rating: number;
  description: string;
  currency: string;
};

export const fetchFurniture = createAsyncThunk<
  Furniture[],
  SearchFurnitureParams
>('furniture/fetchFurnitureStatus', async (params) => {
  // (params:Record<string, string>)
  const { sortBy, order, searchCategoryFilter, searchInpValData, currentPage } =
    params;

  const { data } = await axios.get<Furniture[]>(
    `https://65c21d61f7e6ea59682aa9c7.mockapi.io/data_shop_furniture?limit=9&page=${currentPage}&sortBy=${sortBy}&order=${order}&search=${searchInpValData}&filter=${searchCategoryFilter}`
  ); //limit=должен давать бэкенд(mockapi.io- не дает всех страниц от количетва товара и массив, объект корзины)limit=6&sortBy=cost&order=asc
  console.log(
    `https://65c21d61f7e6ea59682aa9c7.mockapi.io/data_shop_furniture?page=${currentPage}&sortBy=${sortBy}&order=${order}&search=${searchInpValData}&filter=${searchCategoryFilter}`
  );
  return data; // as Furniture[];
});

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface FurnitureSliceState {
  items: Furniture[];
  itemsReindexing: Furniture[];
  status: Status;
  loading: boolean;
}

const initialState: FurnitureSliceState = {
  items: [],
  itemsReindexing: [],
  status: Status.LOADING, // loading | success | error
  loading: true,
};

export const furnitureSlice = createSlice({
  name: 'furniture',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<[]>) => {
      state.items = action.payload;
    },

    setItemsReindexing: (state) => {
      if (state.items.length > 1) {
        state.items.reduce((accum: any, item) => {
          accum.item.articul = item;
          return (state.itemsReindexing = accum);
        }, []);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFurniture.pending, (state) => {
      state.status = Status.LOADING;
      state.loading = true;
      state.items = [];
    });
    builder.addCase(fetchFurniture.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
      state.loading = false;
      if (state.items.length > 1) {
        setItemsReindexing();
      }
      // state.items.reduce<[]>((accum, item) => {
      //   accum[item.articul] = item;
      //   return (state.itemsReindexing = accum);
      // }, []);
    });
    builder.addCase(fetchFurniture.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
      state.loading = false;
    });
  },
});

export const { setItems, setItemsReindexing } = furnitureSlice.actions;

export const itemsReindexing = (state: RootState) =>
  state.furniture.itemsReindexing;

export default furnitureSlice.reducer;
