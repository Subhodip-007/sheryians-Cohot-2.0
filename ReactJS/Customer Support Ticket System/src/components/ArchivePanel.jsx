import React from 'react';

const ArchivePanel = ({
  setShowArchive,
  archivedTickets
}) => {
  return (
    <div className="absolute z-[200]
                    top-1/2 left-1/2
                    -translate-x-1/2 -translate-y-1/2
                    w-[90%] h-[80%]
                    bg-zinc-900 rounded-3xl p-6">

     <div className="flex justify-between items-center mb-6">

  <h1 className="text-3xl text-white">
    Archived Tickets
  </h1>

  <i
    onClick={() => setShowArchive(false)}
    className="ri-close-line text-4xl text-red-500 cursor-pointer"
  ></i>

</div>

<div className="h-[90%] overflow-y-auto flex flex-col gap-4">

  {archivedTickets.length === 0 ? (
    <h2 className="text-zinc-400 text-center mt-20">
      No archived tickets found.
    </h2>
  ) : (
    archivedTickets.map((ticket) => (
      <div
        key={ticket.id}
        className="bg-zinc-800 rounded-2xl p-4
                   border border-zinc-700"
      >

        <div className="flex justify-between items-center">

          <h2 className="text-xl text-white font-bold">
            {ticket.title}
          </h2>

          <span
            className={`px-3 py-1 rounded-full text-sm ${
              ticket.status === "Resolved"
                ? "bg-green-600"
                : "bg-zinc-600"
            }`}
          >
            {ticket.status}
          </span>

        </div>

        <p className="text-zinc-400 mt-3">
          {ticket.description}
        </p>

        <div className="mt-4">

          <span className="bg-orange-500 px-3 py-1 rounded-full text-sm">
            {ticket.priority}
          </span>

        </div>

      </div>
    ))
  )}

</div>

    </div>
  );
};

export default ArchivePanel;