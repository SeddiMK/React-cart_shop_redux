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
    ); //limit=должен давать бэкенд(mockapi.io- не дает всех страниц от количетва товара)limit=6&sortBy=cost&order=asc&page=${currentPage}&search=${valFilterSearch}&rating= можно вынести в отдельный файл

    return data;
  }
);

export const furnitureSlice = createSlice({
  name: 'furniture',
  initialState: {
    items: [],
  },
  reducers: {
    setItems: (state, data) => {
      state.items = data.payload;
    },
  },
});

export const { setItems } = furnitureSlice.actions;

// export const selectCart = (state) => {
//   console.log(state.cartVal.cartVal, 'state.cartVal.cartVal');
//   return state.cartVal.cartVal;
// };

export default furnitureSlice.reducer;
