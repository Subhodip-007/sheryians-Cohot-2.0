import React, { useState } from 'react'

const App = () => {
  let [marks, setmarks] = useState([4,3,3,3,3,8])
  return (
    <div className='h-screen w-full bg-black text-amber-100'>
      {marks.map((elem,idx)=>{
        return <h1 key={idx}>student {idx+1} {elem} / 10 marks</h1>
      })}
      <button onClick={()=>{
       setmarks(marks.map((elem)=>{
          if(elem < 5){
            return elem + 2;
          }else{
            return elem;
          }
        
      }))
      }} className='px-4 py-4 rounded-4xl '> give grace marks</button>
    </div>
  )
}

export default App
