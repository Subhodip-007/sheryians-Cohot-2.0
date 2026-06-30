import React, { useContext } from 'react'
import { ThemeDataContext } from '../context/ThemeContext';

const Footer = () => {
  const [Theme,setTheme] =useContext(ThemeDataContext)
  return (
    <div className='footer'>Footer{Theme}</div>
  )
}

export default Footer