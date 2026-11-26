
import React, { useContext } from 'react'
import "../shared/Nav.scss"
import DateTime from './DateTime';
import { AppContext } from '../context/App.context';
const Nav = () => {
  const { closeLock } = useContext(AppContext)
  return (
    <nav className="nav-container">
        <div className="nav-left">
            <span>subhodip chatterjee</span>
            <div className="nav-item">
                <a href="">file</a>
                <button onClick={closeLock}>Lock</button>
                <a href="">window</a>

            </div>
        </div>
         <div className="nav-right"><DateTime/></div>
    </nav>
  )
}

export default Nav
