import React, { useContext } from 'react'
import { userdatacontext } from '../context/UserContext';

const Navbar = (props) => {
    console.log(props);
    const data=useContext(userdatacontext)
  return (
    <div className='h-[8%] w-full bg-amber-400'>Navbar{data}</div>
  )
}

export default Navbar