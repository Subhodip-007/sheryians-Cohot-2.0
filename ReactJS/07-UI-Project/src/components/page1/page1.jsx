import React from 'react'
import Navbar from './Navbar';
import Center from './Center';

const page1 = (props) => {
  return (
   
    
    <div className='h-screen w-full bg-white'>
      <Navbar/>
      <Center user={props.user}/>
    </div>
  )
}

export default page1