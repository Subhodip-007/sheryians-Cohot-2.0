import axios from 'axios';
import React, { use, useState } from 'react'
import { resumeAndPrerender } from 'react-dom/static';

const App = () => {
  // async function getdata(){
  //   const response= await fetch(`https://jsonplaceholder.typicode.com/comments`)
  //   console.log(response);
    
  // }
  const [data, setdata] = useState([])
  const getdata= async ()=>{
   const resp= await axios.get('https://jsonplaceholder.typicode.com/comments');
    setdata(resp.data)
   
  }
  
  return (
      <div>
      <button onClick={getdata}>Add</button>

      {data.map((elem) => (
        <div key={elem.id}>
          <h1>{elem.name}</h1>
          <p>{elem.email}</p>
        </div>
      ))}
    </div>
  )
}

export default App
