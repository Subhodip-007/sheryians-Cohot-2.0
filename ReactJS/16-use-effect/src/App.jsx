import React, { useEffect, useState } from 'react'

const App = () => {
  const [a, seta] = useState(0);
  const [b, setb] = useState(0);
  useEffect(function(){
    setb(b+1);
  },[a])
  return (
    <div >
      <h1>{a}</h1>
      <button onMouseEnter={()=>{seta(a+1)}}>+</button>
      <br />
      <br />
      <h1>{b}</h1>
      <button>-</button>
    </div>
  )
}

export default App
