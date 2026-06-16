import React from 'react'

const Navbar = () => {
  return (
<div className="w-full bg-red-50 flex justify-between items-center px-8 py-4" text->
  <h1 className="text-white text-2xl font-bold">
    Horizon Counts
  </h1>

  <div className="flex gap-6 text-white">
    <a href="">About Us</a>
    <a href="">Services</a>
    <a href="">Coaches</a>
    <a href="">Events</a>
    <a href="">Contacts</a>
  </div>

  <button className=" px-4 py-2 rounded-full bg-gray-800 text-amber-50 ">
    Book Now
  </button>
</div>
  )
}

export default Navbar