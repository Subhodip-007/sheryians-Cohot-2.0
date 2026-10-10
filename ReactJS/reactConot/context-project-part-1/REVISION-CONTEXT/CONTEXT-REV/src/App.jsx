import React from 'react'
import Routes from './routes/MainRoutes';
import MainRoutes from './routes/MainRoutes';
import Navbar from './components/home/Navbar';


const App = () => {
  return (
  <div className="h-screen w-full">
    <Navbar/>
    <MainRoutes/>
  </div>    
  )
}

export default App
