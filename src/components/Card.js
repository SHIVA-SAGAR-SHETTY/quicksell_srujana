import React from "react";
import "../styles/Card.css";

const Card = ({ ticket }) => {
    
   
 
    return (
        <div className="card">
            <h3>{ticket.title}</h3>
            <p>Priority: {ticket.priority}</p>
            <p>Status: {ticket.status}</p>
            <p>Tags: {ticket.tag.join(", ")}</p>
        </div>
    );
};

export default Card;
