import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
//import "../styles/pagination.css"

function Items({ currentItems, itemOffset }) {
    return (
    <>
      {currentItems &&
        currentItems.map((item, index) => (
          <div>
            <h3>Item #{itemOffset+1}</h3>
            <br />
            {item}
          </div>
        ))}
    </>
  );
}

function PaginatedItems({ itemsPerPage, items }) {
    const [currentItems, setCurrentItems] = useState(items);
    const [pageCount, setPageCount] = useState(items.length);
    const [itemOffset, setItemOffset] = useState(0);

    function buildPagination() {
        const endOffset = itemOffset + itemsPerPage;
    
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }

    useEffect(() => {
        buildPagination()
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    console.log(pageCount);

    return (
        <>
            <Items currentItems={currentItems} itemOffset={itemOffset} />
            {pageCount < 1 ?
                null
                :
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={1}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    itemClass="page-item"
                    linkClass="page-link"
                />
            }
        </>
    );
}

export default PaginatedItems;