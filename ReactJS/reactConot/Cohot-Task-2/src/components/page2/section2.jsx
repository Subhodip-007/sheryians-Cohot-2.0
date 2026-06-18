import React from 'react'
import Headsec from './headsec';
import Cards from './cards';
import Tsec2extcont from './tsec2extcont';

const section2 = () => {
  return (
    <div className='min-h-screen w-full bg-amber-50 px-8 py-8'>
     <Headsec/>
     <Cards />
     <Tsec2extcont />
    </div>
  )
}

export default section2