import React, { useContext } from 'react'
import Navbar from './components/Navbar';
import Section from './components/Section';
import Footer from './components/Footer';
import { ThemeDataContext } from './context/ThemeContext';

const App = () => {
  let [Theme,setTheme]=useContext(ThemeDataContext)
  return (
    <div className='h-screen w-full bg-zinc-800'  style={{
    backgroundColor: Theme === 'light' ? 'white' : 'black',
    color: Theme === "light" ? 'black' : 'white'
  }}>
      <Navbar/>
      <Section />
      <Footer />
    </div>
  )
}

export default App