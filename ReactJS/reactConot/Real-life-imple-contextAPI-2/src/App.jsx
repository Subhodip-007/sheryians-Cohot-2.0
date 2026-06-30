
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/products';
import Productsdets from './pages/Productsdets';

const App = () => {

  return (
   
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<Productsdets />} />
      </Routes>
    </div>
  )
}

export default App
