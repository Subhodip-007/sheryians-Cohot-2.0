import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './components/card';
const App = () => {
  let [alluser, setallusers] = useState([])
 async function getdata(){
    // in normal
  // let response= await fetch('https://picsum.photos/v2/list?page=2&limit=100')
  // console.log(response);

  const response =await axios.get('https://picsum.photos/v2/list?page=2&limit=10')
  console.log(response.data);
  setallusers(response.data)
  
 }
 useEffect(function(){
  getdata()
 },[])//dependencies
  return (
    <div className='min-h-screen w-full bg-black flex flex-wrap gap-2 items-center justify-center'>
      <button className=' w-full border text-amber-300 bg-amber-500 p-4 rounded-2xl'  onClick={getdata}>click</button>
      {alluser.map((elem,idx)=>{
        return <Card key={idx} data={elem} />
      })}
    </div>
  )
}

export default App
// now i want to run this automaticly 
// without buton cluck 
// if i call getdata() directly it will start sending request repitatively crash api 
/// usning use effect (pagination,infiniter scrolling)
// task free pokemoin api 
