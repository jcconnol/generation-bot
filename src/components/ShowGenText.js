import React, { useState, useEffect } from "react";
import PaginatedItems from "./ItemPage";

const ShowGenText = ({ items }) => {
    const [inputItems, setInputItems] = useState(items)

    useEffect(() => {
        console.log("showGenText")
      })

    return (
        <>
            <PaginatedItems items={items} itemsPerPage={1} />
        </>
    );
};

export default ShowGenText;