import React from "react";
import "../styles/Card.css";

const Card = ({ ticket }) => {
    const priorityMap = ["No Priority", "Low", "Medium", "High", "Urgent"];
    const priorityClass = ["low", "low", "medium", "high", "urgent"][ticket.priority];

    return (
        <div className={`card card-${priorityClass}`}>
            <h3 className="card-title">{ticket.title}</h3>
            <p className="card-priority">Priority: {priorityMap[ticket.priority]}</p>
            <div className="card-tag">Tag: {ticket.tag.join(", ")}</div>
            <p className="card-meta">Assigned to: {ticket.userId}</p>
        </div>
    );
};

export default Card;