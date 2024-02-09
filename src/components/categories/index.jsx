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
    //   onChange={(e)=>onChangeCategories(e.target.value)}
    return (
        <select name="category" 
            className={"cart-header__category select--header " + styles.root }>
            {selectCategory.map((categoryName, i) => (
                <option onClick={() => {
                    console.log('kllklklkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
                    onChangeCategories(i);
                }} value={categoryName} key={categoryName + i}>{categoryName}</option>
            ))}
        </select>
)
};

