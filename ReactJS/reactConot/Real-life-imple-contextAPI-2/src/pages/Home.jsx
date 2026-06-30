import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const nav= useNavigate()
  return (
    <div>
      <h1>This is home page</h1>
      <button onClick={()=>{
        nav('/products')
      }}>Explore Products</button>
    </div>
  )
}

export default Home
