import React from 'react'
import { Link, Outlet } from 'react-router-dom';

const products = () => {
  // anopther may to make rotues
  
  return (
    <div className="h-screen w-full bg-black text-3xl text-mist-50">Product page
      <div className='p-4 bg-amber-200 flex gap-3'>  <Link to="product1">Show Mark 1</Link>
        <Link to="product2">Show Mark 2</Link></div>
        <main className="viewing-area">
          <div className='h[8%] w-full bg-amber-300 flex gap-1 '>
            <p className='whitespace-nowrap'>SALE IS LIVE!!</p>
            <p className='whitespace-nowrap'>SALE IS LIVE!!</p>
            <p className='whitespace-nowrap'>SALE IS LIVE!!</p>
            <p className='whitespace-nowrap'>SALE IS LIVE!!</p>
            <p className='whitespace-nowrap'>SALE IS LIVE!!</p>
            <p className='whitespace-nowrap'>SALE IS LIVE!!</p>
          </div>
        <Outlet /> 
      </main>
    </div>
  )
}

export default products