import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import About from './pages/About';
import Product from './pages/product';
import Navbar from './components/Navbar';
import Home from './pages/home';
import NotFoundPage from './pages/notfoundpage';
import Mensproduct from './pages/mensproduct';
import Womensproduct from './pages/womensproduct';

const App = () => {
  let renavpage = useNavigate()
  return (
    <div className='h-screen w-full bg-black text-amber-50'>
      <Navbar />
      <div className='flex p-4 gap-4'>
        <button onClick={()=>{renavpage('/home')}} className=" p-4 border rounded-2xl bg-amber-200 text-black" >return to home</button>
        <button onClick={()=>{renavpage(-1)}} className=" p-4 border rounded-2xl bg-amber-200 text-black" >prev</button>
        <button onClick={()=>{renavpage(+1)}} className=" p-4 border rounded-2xl bg-amber-200 text-black" >Next</button>
      </div>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/products" element={<Product />}>
          <Route path="mensproduct" element={<Mensproduct />} />
          <Route path="womenproduct" element={<Womensproduct />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
