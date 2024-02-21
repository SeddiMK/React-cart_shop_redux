import React from 'react';

import styles from './select.module.css';

export default function Categories({ onChangeCategories }) {
  let selectCategory = [
    'All goods',
    'Cartoon',
    'Chair',
    'Bed',
    'Table',
    'Drawer',
  ];

  return (
    <select
      name="category"
      className={'cart-header__category select--header ' + styles.root}
      onChange={(e) => onChangeCategories(e.target.value)}>
      {selectCategory.map((categoryName, i) => (
        <option
          value={categoryName}
          key={categoryName + i}
          label={categoryName}>
          {categoryName}
        </option>
      ))}
    </select>
  );
}
