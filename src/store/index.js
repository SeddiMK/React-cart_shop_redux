import { configureStore } from '@reduxjs/toolkit';

import goodsSlice from './goodsSlice';
import cartSlice from './cartSlice';
import filter from './filterSlice';

export default configureStore({
  reducer: {
    goodsVal: goodsSlice,
    cartVal: cartSlice,
    filter,
  },
});
