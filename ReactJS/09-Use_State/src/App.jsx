import React, { useState } from 'react'

const App = () => {
  // let num=0; this wont work inste usestate 
  const [num, setnum] = useState(0)
  return (
    <div className="h-screen w-full bg-amber-400 px-8 py-8">
      <div className='h-75 w-75 rounded-3xl bg-gray-800 text-amber-50'>
        <h1>{num}</h1>
      </div>
      <button className='p-4 rounded-3xl text-amber-100 bg-black' onClick={()=>setnum(num+1)}>increase</button>
      <button className='p-4 rounded-3xl text-amber-100 bg-black' onClick={()=>setnum(num-1)}>decrease</button>
    </div>
  )
}

export default App