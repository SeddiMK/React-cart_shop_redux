import style from './pagination.module.scss';

import React from 'react';
import ReactPaginate from 'react-paginate';

export default function Pagination({ currentPage, onChangePage }) {
  return (
    <div className={style.root}>
      <ReactPaginate
        className={style.pagination}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(e) => {
          onChangePage(e.selected + 1);
          console.log(e.selected, '+++++++++++++++++++++++++++++++++++++++++');
        }}
        pageRangeDisplayed={4}
        pageCount={5}
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
