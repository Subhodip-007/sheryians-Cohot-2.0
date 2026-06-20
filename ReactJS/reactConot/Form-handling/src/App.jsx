import React from 'react'

const App = () => {
  return (
    <div>
      <form onSubmit={(e)=>{e.preventDefault(); console.log("form submitted");
      }} className='p-20 bg-gray-700 flex gap-5 rounded-2xl' action="">
        <input className='border rounded-2xl p-2' type="text" placeholder='enter name' />
        <button
  type="submit"
  className="border p-2 rounded-2xl bg-amber-500 active:scale-95 transition-transform"> submit</button>
        
      </form>
    </div>
  )
}

export default App
