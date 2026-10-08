
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';

const mainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Recipes" element={<h1>recipes</h1>}/>
      <Route path="/About" element={<h1>about</h1>}/>
      <Route path="*" element={<h1>PageNotfound</h1>}/>
    </Routes>
  )
}

export default mainRoutes
