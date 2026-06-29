import React, { useRef } from 'react';
import TicketCard from "./Ticketcard";

const Overlay = ({ tickets, deleteTicket,changeStatus }) => {
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      className="absolute inset-0 z-[3] flex flex-wrap gap-4 p-5 overflow-auto"
    >
      {tickets.map((ticket) => (
        <TicketCard
  key={ticket.id}
  data={ticket}
  reff={ref}
  deleteTicket={deleteTicket}
  changeStatus={changeStatus}
/>
      ))}
    </div>
  );
};

export default Overlay;