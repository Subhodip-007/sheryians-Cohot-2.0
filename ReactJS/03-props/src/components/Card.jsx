// rafce
import React from 'react'

const card = (props) => {    
  return (
         <div className="card">
        <img src="https://i.pinimg.com/originals/8f/f6/d9/8ff6d9ec0a170288ece8e6313b35de47.gif" alt="" />
        <h1>{props.user}</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <button>view profile</button>
      </div>
  )
}

export default card
// now here props is taking some values from his parent file app.js
// here props is a obj that can be seen by consleing it 