 
import React from "react";
import "../styles/SortSelector.css";

const SortSelector = ({ sortBy, setSortBy }) => {
    return (
        <div className="sort-selector">
            <label>Sort by: </label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
            </select>
        </div>
    );
};

export default SortSelector;
