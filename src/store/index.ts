import { configureStore } from '@reduxjs/toolkit';

import goodsSlice from './goodsSlice';
import cartSlice from './cartSlice';
import filter from './filterSlice';
import furniture from './furnitureSlice';

export const store = configureStore({
  reducer: {
    goodsVal: goodsSlice,
    cartVal: cartSlice,
    filter,
    furniture,
  },
});

export type RootState = ReturnType<typeof store.getState>;
