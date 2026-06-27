import React from 'react'

const Navbar = (props) => {

  return (
    <div>
      <button onClick={
        
        ()=>{props.settheme(props.theme === 'Light' ? 'Dark' : 'Light');}
      }  className='p-4 rounded-2xl bg-amber-400 w-fit' >Switch-Theme</button>
    </div>
  )
}

export default Navbar
