import React from 'react'
import { Route, Router, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';

const App = () => {
  
  return (
     <div className='h-screen w-full relative bg-zinc-800'>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
        </Routes>
    </div>
  )
}

export default App