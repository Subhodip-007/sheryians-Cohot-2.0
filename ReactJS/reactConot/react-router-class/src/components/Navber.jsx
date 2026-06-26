import React from 'react'
import { Link } from 'react-router-dom';

const navber = () => {
  return (
    <nav className='h-[10%] w-full bg-amber-300 flex justify-between p-4'>
      <h1>simple</h1>
      {/* <a href="/">home</a>
      <a href="/about">About</a>  reload */}
      <input type="text" placeholder='search' className="border" />
      <Link to='/' >home</Link>
      <Link to='/about' >about</Link>
      <button>add</button>
    </nav>
  )
}

export default navber
