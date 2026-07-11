import axios from 'axios';
import React, { useEffect, useState } from 'react'


const App = () => {
  const [notes, setnotes] = useState([{
    title:"task1",
    description:"heool"
  },{
    title:"task2",
    description:"heool2"
}])
async function getdata(){
 let response = await axios.get('http://localhost:3000/')
 setnotes(response.data.fetchnotes)
 console.log(response.data);
 
}
useEffect(()=>{
 getdata()
},[])


  return (

    <div className="notes">
      {notes.map(note=>{
      return(
          <div className="note">
        <h1>{note.title}</h1>
        <p>{note.description}</p>
      </div>
      )
      })}
    </div>
  )
}

export default App
