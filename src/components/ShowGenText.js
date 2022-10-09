import React, { useState } from "react";
import PaginatedItems from "./ItemPage";

const ShowGenText = ({ items }) => {
    const [inputItems, setInputItems] = useState(items)
    return (
        <>
            <PaginatedItems items={items} itemsPerPage={1} />
        </>
    );
};

export default ShowGenText;