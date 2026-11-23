
import React from 'react'
import "../shared/Nav.scss"
import DateTime from './DateTime';
const Nav = () => {
  return (
    <nav className="nav-container">
        <div className="nav-left">
            <span>subhodip chatterjee</span>
            <div className="nav-item">
                <a href="">file</a>
                <a href="">lock</a>
                <a href="">window</a>

            </div>
        </div>
         <div className="nav-right"><DateTime/></div>
    </nav>
  )
}

export default Nav
