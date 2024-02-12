import styles from './search.module.css';

import React, { useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

import { searchInpHeader, setCurrentPage } from '../../store/filterSlice';

export default function Search() {
  const dispatch = useDispatch();

  return <></>;
}
