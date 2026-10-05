import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Recipes from '../pages/Recipes';
import About from '../pages/about';
import PageNotfound from '../pages/PageNotfound';

const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/recipes" element={<Recipes/>}/>
         <Route path="/about" element={<About/>}/>
         <Route path="*" element={<PageNotfound/>}/>
    </Routes>
  )
}

export default MainRoutes
