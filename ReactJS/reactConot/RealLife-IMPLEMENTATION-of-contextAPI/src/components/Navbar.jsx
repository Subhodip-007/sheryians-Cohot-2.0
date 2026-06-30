import React, { useContext } from 'react'
import { ThemeDataContext } from '../context/ThemeContext';


const Navbar = () => {
 const [Theme,setTheme] = useContext(ThemeDataContext)
  return (
    <div className='Nav'>Navbar {Theme} <button onClick={() =>{if(Theme=='light'){ setTheme("dark")}else{setTheme("light")}}}>change</button></div>
  )
}

export default Navbar