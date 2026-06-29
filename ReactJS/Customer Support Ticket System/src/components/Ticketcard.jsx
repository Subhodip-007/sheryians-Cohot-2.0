import React from 'react';
import { motion } from "framer-motion";

const TicketCard = ({  data,
  reff,
  deleteTicket,
  changeStatus }) => {

  const priorityColors = {
    low: "bg-green-500",
    moderate: "bg-yellow-500",
    high: "bg-orange-500",
    critical: "bg-red-600"
  };

  const statusColors = {
    Open: "bg-blue-500",
    "In Progress": "bg-purple-500",
    Resolved: "bg-green-600",
    Closed: "bg-zinc-600"
  };

  return (
    <motion.div
      drag
      dragConstraints={reff}
      whileDrag={{ scale: 1.05 }}
      className="w-[200px] max-h-[300px]
                 bg-zinc-900 text-white
                 rounded-3xl border border-zinc-700
                 p-5 flex flex-col justify-between
                 shadow-lg"
    >

      {/* Top Section */}
      <div>

        <div className="flex justify-between items-start">

          <h2 className="text-xl font-bold break-words">
            {data.title}
          </h2>

          

        </div>

        <p className="text-zinc-400 mt-4 text-sm break-words">
          {data.description}
        </p>

      </div>

      {/* Bottom Section */}
      <div className="mt-6">

        <div className="flex justify-between gap-2">

          {/* Priority */}
          <span
            className={`px-3 py-1 rounded-full text-sm
            ${priorityColors[data.priority]}`}
          >
            {data.priority}
          </span>

          {/* Status */}
         <select
  value={data.status}
  onChange={(e) =>
    changeStatus(data.id, e.target.value)
  }
  className={`px-3 py-1 rounded-full text-sm
              ${statusColors[data.status]}`}
>

  <option value="Open">Open</option>

  <option value="In Progress">
    In Progress
  </option>

  <option value="Resolved">
    Resolved
  </option>

  <option value="Closed">
    Closed
  </option>

</select>

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            className="w-10 h-10 rounded-full
                       bg-zinc-800 hover:bg-zinc-700
                       flex justify-center items-center"
          >
            <i className="ri-edit-line"></i>
          </button>

          <button onClick={() => deleteTicket(data.id)}
            className="w-10 h-10 rounded-full
                       bg-red-600 hover:bg-red-700
                       flex justify-center items-center"
          >
            <i className="ri-delete-bin-6-line"></i>
          </button>

        </div>

      </div>

    </motion.div>
  );
};

export default TicketCard;