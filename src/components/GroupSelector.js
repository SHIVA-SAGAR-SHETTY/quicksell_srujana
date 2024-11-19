 
import React from "react";
import "../styles/GroupSelector.css";

const GroupSelector = ({ grouping, setGrouping }) => {
    return (
        <div className="group-selector">
            <label>Group by: </label>
            <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
                <option value="status">Status</option>
                <option value="assigned_to">User</option>
                <option value="priority">Priority</option>
            </select>
        </div>
    );
};

export default GroupSelector;
