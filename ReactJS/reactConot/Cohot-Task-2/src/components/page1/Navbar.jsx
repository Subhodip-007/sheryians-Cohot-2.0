import React from 'react'
import Button from './button';

const Navbar = () => {
  return (
<div className="w-full bg-red-50 flex justify-between items-center px-8 py-4">
  <h1 className=" text-gray-900 text-2xl font-bold">
    Horizon Counts
  </h1>

  <div className="flex gap-6  text-gray-900">
    <a  className="px-4 py-2 rounded-full border border-transparent hover:border-gray-700 transition-all duration-300" href="">About Us</a>
    <a  className="px-4 py-2 rounded-full border border-transparent hover:border-gray-700 transition-all duration-300" href="">Services</a>
    <a  className="px-4 py-2 rounded-full border border-transparent hover:border-gray-700 transition-all duration-300" href="">Coaches</a>
    <a  className="px-4 py-2 rounded-full border border-transparent hover:border-gray-700 transition-all duration-300" href="">Events</a>
    <a  className="px-4 py-2 rounded-full border border-transparent hover:border-gray-700 transition-all duration-300" href="">Contacts</a>
  </div>
    <Button name='Book Now'/>

</div>
  )
}

export default Navbar