import React from 'react'
import { useState } from "react";

const App = () => {
    const [nums, setnums] = useState(0)
 let inc = ()=>{
  console.log(nums);
  
  setnums(nums+1)  // is a async functiuon
  console.log(nums);
  
}
  // let num=0;

  // readonly , writeonly value
  return (
    <div className= ' flex flex-col gap-6 items-center justify-center h-screen w-full bg-amber-600'>
      
      <h1 className='text-6xl'> {nums}</h1>
    <div>
            <button onClick={inc} className='px-4 py-4 rounded-4xl bg-gray-800'>increase</button>
      <button onClick={()=>setnums(nums-1)} className='px-4 py-4 rounded-4xl bg-gray-800'>decrease</button>
    </div>
    </div>
  )
}

export default App
// write a arr code to give grace marks 