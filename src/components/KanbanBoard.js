import React, { useState, useEffect } from "react";
import Card from "./Card";
import GroupSelector from "./GroupSelector";
import SortSelector from "./SortSelector";
import "../styles/KanbanBoard.css";

const KanbanBoard = () => {
    const [tickets, setTickets] = useState([]); // Holds the tickets data
    const [grouping, setGrouping] = useState("status"); // Current grouping type
    const [sortBy, setSortBy] = useState("priority"); // Current sorting type
    const [groupedTickets, setGroupedTickets] = useState({}); // Tickets grouped dynamically

    // Fetch data from API
    useEffect(() => {
        fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
            .then((response) => response.json())
            .then((data) => {
                console.log("API Data:", data); // Debug: Log API response
                // Extract tickets from the response and set the state
                setTickets(data.tickets || []); // Use data.tickets to set the tickets state
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    // Debug: Check tickets state after it's set
    useEffect(() => {
        console.log("Debug Tickets after state update:", tickets); // Check state after it's updated
    }, [tickets]); // This will log every time tickets state is updated

    // Load persistent state from localStorage on mount
    useEffect(() => {
        const savedGrouping = localStorage.getItem("grouping");
        const savedSortBy = localStorage.getItem("sortBy");

        if (savedGrouping) setGrouping(savedGrouping);
        if (savedSortBy) setSortBy(savedSortBy);
    }, []);

    // Save grouping and sorting preferences to localStorage
    useEffect(() => {
        localStorage.setItem("grouping", grouping);
        localStorage.setItem("sortBy", sortBy);
    }, [grouping, sortBy]);

    // Group and sort tickets dynamically
    useEffect(() => {
        if (!Array.isArray(tickets)) {
            console.error("Tickets is not an array:", tickets);
            return;
        }

        // Group tickets by the selected grouping (status, userId, or priority)
        const grouped = tickets.reduce((acc, ticket) => {
            const key = ticket[grouping] || "Uncategorized"; // Fallback to 'Uncategorized' if key is missing
            acc[key] = acc[key] ? [...acc[key], ticket] : [ticket];
            return acc;
        }, {});

        console.log("Grouped Tickets:", grouped); // Debug: Check the grouping

        // Sort tickets within each group based on selected sort type (priority or title)
        for (const key in grouped) {
            grouped[key].sort((a, b) => {
                if (sortBy === "priority") return b.priority - a.priority; // Sort by priority (high to low)
                if (sortBy === "title") return a.title.localeCompare(b.title); // Sort by title (alphabetically)
                return 0;
            });
        }

        setGroupedTickets(grouped);
    }, [tickets, grouping, sortBy]);

    return (
        <div className="kanban-board">
            <h1>Kanban Board</h1>
            {/* GroupSelector to choose grouping criteria */}
            <GroupSelector grouping={grouping} setGrouping={setGrouping} />
            {/* SortSelector to choose sorting criteria */}
            <SortSelector sortBy={sortBy} setSortBy={setSortBy} />
            <div className="board">
                {/* Render groups dynamically based on grouping */}
                {Object.entries(groupedTickets).map(([key, tickets]) => (
                    <div key={key} className="column">
                        <h2>{key}</h2>
                        {/* Render tickets in each group */}
                        {tickets.length > 0 ? (
                            tickets.map((ticket) => <Card key={ticket.id} ticket={ticket} />)
                        ) : (
                            <p>No tickets in this group</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KanbanBoard;
