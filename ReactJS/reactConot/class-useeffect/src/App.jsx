import axios from 'axios';
import React, { useEffect, useState } from 'react'

const App = () => {
  const [counter, setcounter] = useState(0);
  const [value, setValue] = useState('');
 async function getuserdata(){
    let response= await axios.get('https://randomuser.me/api/0.8/?results=10');
    console.log(response.data.results);
    
 }

  useEffect(function(){
    getuserdata()
    
  },[counter])
  return (
    <div className='bg-black h-screen w-full text-amber-50 p-6'>
      <h1 className='text-4xl'>{counter}</h1>
      <button onClick={()=>{setcounter(counter+1)}}  className='border-2 rounded-2xl p-4 text-amber-900'>+</button>
      <br />
      <form action="">
        <input onChange={(e)=>{ setValue(e.target.value)}} type="text" className='border p-5 rounded-2xl text-amber-50' placeholder='enter anything....' value={value} />
      </form>
    </div>
  )
}

export default App
