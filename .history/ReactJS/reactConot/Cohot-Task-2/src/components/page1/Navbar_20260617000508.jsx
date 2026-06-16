import React from 'react'

const Navbar = () => {
  return (
    <div className=' h-[40px]w-full bg-red-500 flex justify-between items-center px-8 py-8 text-2xl'>
        <h1>Horizon Counts</h1>
        <div className='flex gap-4'>
          <a href="">About Us</a>
          <a href="">Services</a>
          <a href="">Coaches</a>
          <a href="">Events</a>
          <a href="">Contacts</a>
        </div>

        <button>book now</button>
     
    </div>
  )
}

export default Navbar