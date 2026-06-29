import React, { useContext } from 'react'
import { userdatacontext } from '../context/UserContext';

const Footer = () => {
      const data= useContext(userdatacontext);
  return (
    <div className=' absolute bottom-0 w-screen h-10 bg-amber-500'>Footer{data}</div>
  )
}

export default Footer