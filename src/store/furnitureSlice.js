import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFurniture = createAsyncThunk(
  'furniture/fetchFurnitureStatus',
  async (params) => {
    const {
      sortBy,
      order,
      searchCategoryFilter,
      searchInpValData,
      currentPage,
    } = params;

    const { data } = await axios.get(
      `https://65c21d61f7e6ea59682aa9c7.mockapi.io/data_shop_furniture?page=${currentPage}&sortBy=${sortBy}&order=${order}&search=${searchInpValData}&filter=${searchCategoryFilter}`
    ); //limit=должен давать бэкенд(mockapi.io- не дает всех страниц от количетва товара и массив, объект корзины)limit=6&sortBy=cost&order=asc&page=${currentPage}&search=${valFilterSearch}&rating= можно вынести в отдельный файл
    console.log(
      `https://65c21d61f7e6ea59682aa9c7.mockapi.io/data_shop_furniture?page=${currentPage}&sortBy=${sortBy}&order=${order}&search=${searchInpValData}&filter=${searchCategoryFilter}`
    );
    return data;
  }
);

export const furnitureSlice = createSlice({
  name: 'furniture',
  initialState: {
    items: [],
    status: 'loading', // loading | success | error
    loading: true,
  },
  reducers: {
    setItems: (state, data) => {
      state.items = data.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFurniture.pending, (state) => {
      state.status = 'loading';
      state.loading = true;
      state.items = [];
    });
    builder.addCase(fetchFurniture.fulfilled, (state, data) => {
      state.status = 'success';
      state.items = data.payload;
      state.loading = false;
    });
    builder.addCase(fetchFurniture.rejected, (state) => {
      state.status = 'error';
      state.items = [];
      state.loading = false;
    });
  },
});

export const { setItems } = furnitureSlice.actions;

export default furnitureSlice.reducer;
