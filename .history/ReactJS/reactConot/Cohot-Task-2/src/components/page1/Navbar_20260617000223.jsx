import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full bg-red-500 flex justify-between items-center px-8 py-'>
        <div><h1>Horizon Counts</h1></div>
        <div>
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