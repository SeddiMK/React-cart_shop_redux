import style from './pagination.module.scss';

import React from 'react';
import ReactPaginate from 'react-paginate';

import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../store/filterSlice';
import { RootState } from '../../store';

const Pagination: React.FC = () => {
  const dispath = useDispatch();

  let currentPage = useSelector((state: RootState) => state.filter.currentPage);

  const onChangePage = (page: number) => {
    dispath(setCurrentPage(page));
  };

  return (
    <div className={style.root}>
      <ReactPaginate
        className={style.pagination}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(e: any) => {
          onChangePage(e.selected + 1);
        }}
        pageRangeDisplayed={4}
        pageCount={5}
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
