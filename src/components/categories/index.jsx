import React from 'react';

import styles from './select.module.css'

export default function Categories({onChangeCategories}) {
    const selectCategory = [
        'All goods',
        'Cartoon',
        'Chair',
        'Bed',
        'Table',
        'Drawer',
      ];
      
    return (
        <select name="category" onChange={(e)=>onChangeCategories(e.target.value)}
            className={"cart-header__category select--header" + " " + styles.root }>
            {selectCategory.map((el, i) => (
                <option value={el} key={el + i}>{el}</option>
            ))}
        </select>
)
};

