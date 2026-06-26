import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Product = () => {
  return (
    <div>
      <h1 className='text-3xl'>Products Page</h1>

      <div className='flex gap-4 my-4'>
        <Link to="mensproduct">Mens Products</Link>
        <Link to="womenproduct">Women Products</Link>
      </div>

      {/* Child routes render here */}
      <Outlet />
    </div>
  )
}

export default Product