import React from 'react'
import { NavLink, Route, RouterProvider, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/products';
import Blogs from './pages/Blog';
import Contact from './pages/Contact';
import Mark2 from './pages/mark2';
import Mark1 from './pages/Mark1';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const App = () => {
  // 1. Define your routes as an array of objects
// const ourRouter = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />,
//   },
//   {
//     path: '/products',
//     element: <Products />,
//   },
//   {
//     // These are flat objects, so they render on a completely blank page
//     path: '/products/product1',
//     element: <Mark1 />,
//   },
//   {
//     path: '/products/product2',
//     element: <Mark2 />,
//   },
//   {
//     path: '/blog',
//     element: <Blogs />,
//   },
//   {
//     path: '/contact',
//     element: <Contact />,
//   }
// ]);
  return (
    <div>
      <nav className='h-[10%] w-full bg-zinc-700 p-3 flex justify-between'>
        <div>
          LOGO
        </div>
        <input className='border text-amber-50 rounded-2xl' type="text"  placeholder='search'/>
        <div className='flex gap-3.5'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold" : "text-gray-500 hover:text-blue-400"
            }
          >
            Home
          </NavLink>

          <NavLink
            to='/products'
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-bold" : "text-gray-500 hover:text-blue-400"
            }
          >
            Products
          </NavLink>
          <NavLink className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold" : "text-gray-500 hover:text-blue-400"
          } to='/blog'>Blog</NavLink>
          <NavLink className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold" : "text-gray-500 hover:text-blue-400"
          } to='/Contact'>Contact</NavLink>
        </div>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />}>
          <Route path='product1' element={<Mark1 />} />
          <Route path='product2' element={<Mark2 />} />
        </Route>
        <Route path='/blog' element={<Blogs />} />

        <Route path='/contact' element={<Contact />} />

      </Routes>
      {/* <RouterProvider router={ourRouter}/> */}
    </div>
  )
}

export default App
