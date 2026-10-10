
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import RecipiesPage from '../pages/RecipiesPage';
import PageNotFound from '../pages/PageNotFound';

const mainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Recipes" element={<RecipiesPage/>}/>
      <Route path="/About" element={<h1>about</h1>}/>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
  )
}

export default mainRoutes
