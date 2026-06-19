import React, { useState } from 'react'

const App = () => {
  const [obj, setobj] = useState({name:"shub" , age:20})
  return (
    <div className='h-screen w-full bg-amber-200' >
      <h1>Name : {obj.name}, age : {obj.age} </h1>
      <button className='p-6 bg-amber-700' onClick={()=>{
        let destr={...obj};
        destr.name="subhodip";
        setobj(destr)  
        // shortcut
        setobj(prev=>({...prev,age:50})); // alse used in batch update
      }}> change name</button>
    </div>
  )
}

export default App
