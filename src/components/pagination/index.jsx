import style from './pagination.module.css'

import React from 'react';
import ReactPaginate from 'react-paginate';


export default function Pagination({currentPage, onChangePage}) {
   
    return (
        <div className={style.root}>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={(e)=> onChangePage(e.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={3}
                forcePage={currentPage - 1}
                previousLabel="<"
                renderOnZeroPageCount={null}
            />
        </div>
     
)
};

