import React from 'react'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Section from './components/Section';

const App = () => {
  return (
    <div className='h-screen w-full bg-zinc-800'>
    <Navbar brand='shery'>
      
      <h1>children</h1>
      </Navbar>
    <Section />
    <Footer />
    </div>
  )
}

export default App