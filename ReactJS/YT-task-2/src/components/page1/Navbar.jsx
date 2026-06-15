import React from 'react'

const Navbar = () => {
  return (
    <div className="Navbar">
        <div className="Nav-left">
            <i className="ri-bubble-chart-line"></i>
            <h3>DUNE</h3>
        </div>
        <div className="Nav-mid">
           <a href="">Produce</a>
           <a href="">Dashboard</a>
           <a href="">Company</a>
           <a href="">Resounce</a>
        </div>
         <div className="Nav-right">
            <button className="Nav-join-btn">
                let's connect
            </button>
         </div>
    </div>
  )
}

export default Navbar