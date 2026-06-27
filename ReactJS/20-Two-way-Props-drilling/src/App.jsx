import React, { useState } from 'react'
import Navbar from './components/Navbar';

const App = () => {
  const [Theme, setTheme] = useState('Light')
  return (
 <div
  className={`w-full h-screen ${
    Theme === 'Light' ? 'bg-amber-50 text-black' : 'bg-zinc-800 text-white'
  }`}
>
    <h1>Theme is {Theme}</h1>
    <Navbar theme={Theme} settheme={setTheme}/>
  </div>
  )
}

export default App
