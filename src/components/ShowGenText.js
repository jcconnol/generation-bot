import React, { useState, useEffect } from "react";
import PaginatedItems from "./ItemPage";

const ShowGenText = ({ items }) => {
    return (
        <>
            <PaginatedItems items={items} itemsPerPage={1} />
        </>
    );
};

export default ShowGenText;