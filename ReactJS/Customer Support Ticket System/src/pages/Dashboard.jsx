import React, { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import TicketForm from "../components/TicketForm";
import Overlay from "../components/Overlay";
import ArchivePanel from "../components/ArchivePanel";

const Dashboard = () => {
    // =========================
    // State
    // =========================
    const [showArchive, setShowArchive] = useState(false);
    const [tickets, setTickets] = useState(() => {
        const storedTickets = localStorage.getItem("tickets");
        return storedTickets ? JSON.parse(storedTickets) : [];
    });

    const [showForm, setShowForm] = useState(false);

    // =========================
    // Derived Data
    // =========================
    const activeTickets = tickets.filter(
        (ticket) =>
            ticket.status === "Open" ||
            ticket.status === "In Progress"
    );

    const archivedTickets = tickets.filter(
        (ticket) =>
            ticket.status === "Resolved" ||
            ticket.status === "Closed"
    );

    // =========================
    // Functions
    // =========================
    const addTicket = (newTicket) => {
        if (activeTickets.length >= 15) {
            alert("Maximum limit of 15 tickets reached.");
            return;
        }

        setTickets((prev) => [
            ...prev,
            {
                id: Date.now(),
                ...newTicket,
            },
        ]);
    };
const changeStatus = (id, newStatus) => {

  setTickets((prevTickets) =>
    prevTickets.map((ticket) =>
      ticket.id === id
        ? { ...ticket, status: newStatus }
        : ticket
    )
  );

};
    const deleteTicket = (id) => {
        setTickets((prevTickets) =>
            prevTickets.filter((ticket) => ticket.id !== id)
        );
    };

    // =========================
    // Effects
    // =========================
    useEffect(() => {
        localStorage.setItem("tickets", JSON.stringify(tickets));
    }, [tickets]);

    return (
        <div className="h-screen w-full relative bg-zinc-800 flex items-center justify-center">
            <>
                <Navbar
  setShowForm={setShowForm}
  totallength={activeTickets.length}
  archiveCount={archivedTickets.length}
  setShowArchive={setShowArchive}
/>
 {showArchive && (
  <ArchivePanel
    setShowArchive={setShowArchive}
    archivedTickets={archivedTickets}
  />
)}

                {showForm && (
                    <TicketForm
                        setShowForm={setShowForm}
                        addTicket={addTicket}
                    />
                )}
            </>

            <div className="absolute bottom-1 w-[98%] h-[85%] p-4 border-2 border-white flex flex-col rounded-2xl">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

                    {/* Title */}
                    <h1 className="text-3xl font-bold">
                        All Tickets
                    </h1>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">

                        {/* Search */}
                        <div className="flex flex-col gap-2 w-full md:w-64">
                            <input
                                id="search"
                                type="text"
                                placeholder="Search task..."
                                className="px-4 py-2 rounded-xl border border-zinc-400 bg-white text-black w-full"
                            />
                        </div>

                        {/* Priority Filter */}
                        <div className="flex flex-col gap-2 w-full md:w-52">
                            <select
                                id="priorityFilter"
                                className="px-4 py-2 rounded-xl border border-zinc-400 bg-white text-black w-full"
                            >
                                <option value="">All Priorities</option>
                                <option value="low">Low</option>
                                <option value="moderate">Moderate</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div className="flex flex-col gap-2 w-full md:w-52">
                            <select
                                id="statusFilter"
                                className="px-4 py-2 rounded-xl border border-zinc-400 bg-white text-black w-full"
                            >
                                <option value="">All Statuses</option>
                                <option value="open">Open</option>
                                <option value="in-progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>

                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-4 grow bg-amber-300 relative overflow-hidden rounded-2xl">

                    {/* Background Layer */}
                    <div className="absolute inset-0 z-[1] bg-zinc-800">

                        <div className="absolute top-[5%] py-10 w-full flex justify-center text-zinc-700 text-3xl font-mono capitalize">
                            Make-it-simple
                        </div>

                        <h1
                            className="
                absolute top-1/2 left-1/2
                -translate-x-1/2 -translate-y-1/2
                tracking-tight text-[8vw]
                font-mono font-extrabold text-zinc-900
              "
                        >
                            DOCs
                        </h1>
                    </div>

                    {/* Ticket List */}
                    <Overlay   tickets={activeTickets}
  deleteTicket={deleteTicket}
  changeStatus={changeStatus} />

                </div>
            </div>
        </div>
    );
};

export default Dashboard;