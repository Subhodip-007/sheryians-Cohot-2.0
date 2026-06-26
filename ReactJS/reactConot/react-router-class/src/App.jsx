import React from 'react'
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/Contact';
import { Route, Routes } from 'react-router-dom';
import Navber from './components/navber';
import Aboutdynamic from './pages/aboutdynamic';
import Notfound from './pages/notfound';


const App = () => {

  return (
    <div className='h-screen w-full bg-black text-amber-50'> 
     <Navber />
     <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/about' element={<About />}></Route>
      <Route path='/about/Contact' element={<Contact />}></Route>
       <Route path='/about/:id' element={<Aboutdynamic />}></Route>
       <Route path='/*' element={<Notfound />}></Route>

     </Routes>
     
 
    </div>
  )
}

export default App ;
 