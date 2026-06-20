import React, { useState } from 'react'

const App = () => {
  const handlesubmit=(e)=>{e.preventDefault();  if (!val.trim()) return; console.log("form submitted by ",val);  const dstrucarr=[...list]; dstrucarr.push(val); setlist(dstrucarr); console.log(dstrucarr);
   setval("") }
 const [val, setval] = useState("")
 const [list, setlist] = useState([])


  return (
    <div>
            <form onSubmit={handlesubmit} 
            className='p-20 bg-gray-700 flex gap-5 rounded-2xl' action="">
              <label htmlFor="val">Name</label>
        <input value={val} onChange={(e)=>{ setval(e.target.value)}} className='border rounded-2xl p-2' type="text" placeholder='enter name' />
        <button
  type="submit"
  className="border p-2 rounded-2xl bg-amber-500 active:scale-95 transition-transform"> submit</button>
        
      </form>
      {
        list.map((elem,idx)=><h1 key={idx}>{idx+1} : {elem}</h1>)
      }
    </div>
  )
}

export default App
// task form acha ui 3 input and submit create cards 
