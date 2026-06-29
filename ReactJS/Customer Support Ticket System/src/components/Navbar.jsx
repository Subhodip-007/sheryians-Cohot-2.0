import React from 'react'

const Navbar = ({  setShowForm,
  setShowArchive,
  totallength,
  archiveCount }) => {
  return (
    <div className='rounded-4xl mt-4 fixed top-0 right-1/2 translate-x-1/2 translate-y-1/2 w-[80%] h-12 bg-amber-200 flex items-center justify-between px-8 font-mono'>

      <h1>Support Desk</h1>

      <div className='flex gap-4 items-center'>

        <button
          onClick={() => setShowForm(true)}
          className='border rounded-3xl p-1 px-2 text-m bg-zinc-800 text-amber-200 cursor-pointer'
        >
          Add-Ticket
        </button>
      <button
  onClick={() => setShowArchive(true)}
  className='border rounded-3xl p-1 px-2'
>
  View Archive ({archiveCount})
</button>
        <h3>
          Total Tickets: {totallength}/15
        </h3>

      </div>

    </div>
  )
}

export default Navbar