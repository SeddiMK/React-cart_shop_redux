import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import goodsArr from '../data/goods.json';

// import {goodsArr2} from '../data/Goods';

// const goodsArr = () => {
//   const URL = `https://65c21d61f7e6ea59682aa9c7.mockapi.io/data_shop_furniture`; // можно вынести в отдельный файл

//   // fetch(URL)
//   // .then(res => res.json())
//   // .then(data=>data)

//   axios.get(URL).then((res) => {
//     return res.data;
//   });
// };
// console.log(goodsArr());

export const goodsSlice = createSlice({
  name: 'goods',
  initialState: {
    goodsValArr: goodsArr,
    cost: goodsArr[0].cost,
    currency: goodsArr[0].currency,
    flagSelCurrency: false,
    fullQuantityGoodsSt: 0,
  },
  reducers: {
    selCurrensy(state, data) {
      let selCurrensy = data.payload;
      // есть ли что то в объекте cartVal
      if (state.currency !== undefined) {
        if (state.currency !== selCurrensy) {
          state.currency = selCurrensy;
        }
      }
    },
    selCostFlag(state, data) {
      if (state.currency !== selCurrensy) {
        state.flagSelCurrency = data.payload;
      }
    },
    fullQuantity(state, data) {
      if (data.payload !== undefined) {
        state.fullQuantityGoodsSt = data.payload;
      }
    },
    selGoodsValArr(state, data) {
      if (state.goodsValArr !== undefined) {
        state.goodsValArr = data.payload;
      }
    },
  },
});

export const { selCurrensy, selCostFlag, fullQuantity, selGoodsValArr } =
  goodsSlice.actions;

export const fullQuantityGoods = (state) => {
  // console.log(state.goodsVal.fullQuantityGoodsSt);
  return state.goodsVal.fullQuantityGoodsSt;
};

export const selectCostFlag = (state) => {
  // console.log(state.goodsVal.flagSelCurrency);
  return state.goodsVal.flagSelCurrency;
};
export const selectCurrensy = (state) => {
  // console.log(state.goodsVal.currency);
  return state.goodsVal.currency;
};

export const selectGoods = (state) => {
  console.log(state.goodsVal.goodsValArr, 'state.goodsVal.goodsValArr');
  return state.goodsVal.goodsValArr;
};

export default goodsSlice.reducer;
