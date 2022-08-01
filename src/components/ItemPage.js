import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
//import "../styles/pagination.css"

function Items({ currentItems }) {
    console.log(currentItems)
    return (
    <>
      {currentItems &&
        currentItems.map((item, index) => (
          <div>
            <h3>Item #{index}</h3>
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
        console.log("paginated...")

        const endOffset = itemOffset + itemsPerPage;

        console.log("offset: "+itemOffset)
        console.log("itemsPerPage: "+itemsPerPage)
        console.log("currentItems: "+currentItems)
        console.log(Math.ceil(items.length / itemsPerPage))

        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }

    useEffect(() => {
        // Fetch items from another resources.
        buildPagination()
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems} />
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
                    renderOnZeroPageCount={"No Text was retrieved. Please try again later."}
                    itemClass="page-item"
                    linkClass="page-link"
                />
            }
        </>
    );
}

export default PaginatedItems;