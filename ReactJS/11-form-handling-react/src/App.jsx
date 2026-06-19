import React, { useState } from 'react'

const App = () => {
  const [title, settitle] = useState("")
  return (
    <div className='bg-gray-600 h-screen w-full p-8'>
      <form onSubmit={(e)=>{e.preventDefault(); console.log('form submitted by',title); settitle("") }} action="">
        <input value={title} onChange={(e)=>{settitle(e.target.value)}} className='p-6 rounded-4xl' type="text" placeholder='enter your name'/>
        <button className='p-6 rounded-4xl'>submit</button>
      </form>
    </div>
  )
}

export default App
