// function app(){
//   return "hello";
// }
// export default app
// short cut rafce
import React from 'react'

const App = () => {
  return (
   <> <div id="parent">
      <div className="child"></div>
      <div id="child2"></div>
      <h1> heloooo</h1>

    </div>
    <div id="chahca"></div>
   </> // now i want to pass to differnt div fragments is used <></> empty tags to containt things
    
  )
}

export default App
// Meaning
// r → React
// a → Arrow function
// f → Function
// c → Component
// e → Export default