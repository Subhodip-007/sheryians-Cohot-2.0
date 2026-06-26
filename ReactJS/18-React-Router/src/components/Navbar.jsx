import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='h-[10%] w-full bg-amber-100 flex justify-between p-4 text-black'>
      <div>LOGO</div>
      <input type="text" placeholder="enter name" />
      <div className='flex gap-4'>
    <Link to="/Home">
      Home
    </Link>
     <Link to="/About">
      About
    </Link>
     <Link to="/products">
      Products
    </Link>
      </div>
    </div>
  )
}

export default Navbar
