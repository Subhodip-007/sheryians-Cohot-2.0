import React from 'react'
import Navbar from './Navbar'
import Center from './Center';
const Section1 = () => {
  return (
    <div className='h-screen w-full bg-amber-50'>
     <Navbar />
     <div className='w-full px-8 py-8'>
      <Center />
     </div>
    </div>
  )
}

export default Section1