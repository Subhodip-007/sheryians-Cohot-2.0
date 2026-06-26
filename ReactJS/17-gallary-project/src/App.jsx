import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cards from './components/cards';

const App = () => {
  const [alldata, setAlldata] = useState([])
  const [index, setIndex] = useState(1)
const nextidx = () => {
  setIndex(prev => prev + 1);
  setAlldata([])
}

const previdx = () => {
  if(index > 1) {
    setIndex(prev => prev - 1);
    setAlldata([])
  }
}
  let getPic= async ()=>{
    let response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=10`)
    setAlldata(response.data)
   console.log(response.data);
   
    
  }

  useEffect(function(){
    getPic()
    
  },[index])
  return (
    <div className='min-h-screen w-full bg-black p-5 flex gap-4 flex-wrap justify-center'>
       {alldata.length === 0 && (
      <div className='w-full flex justify-center items-center py-10'>
        <h3 className='text-3xl text-gray-200'>Loading...</h3>
      </div>
    )}
    {alldata.map((elem,idx)=>{
      return <Cards key={idx} data={elem} />
    })}
    <div className='w-full flex justify-center gap-4 items-center'>
      <button onClick={previdx} className='p-4 bg-amber-300 rounded-2xl border-4 text-amber-800 active:scale-90'>prev</button>
      <h1 className='text-3xl text-amber-50'>{index}</h1>
      <button onClick={nextidx} className='p-4 bg-amber-300 rounded-2xl border-4 text-amber-800 active:scale-90'>Next</button>
    </div>
    </div>
  )
}

export default App
