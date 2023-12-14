import { configureStore } from '@reduxjs/toolkit';
import goodsSlice from './goodsSlice';
import cartSlice from './cartSlice';

export default configureStore({
  reducer: {
    goodsVal: goodsSlice,
    cartVal: cartSlice,
  },
});
