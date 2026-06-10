import React from 'react'
import Card from './components/card';

const App = () => {
  return (
     <div className="parent">


      <Card user="shub" age={20}/>
            <Card user="lohar" age={20}/>  
                  <Card user="john" age={20}/>        
    </div>
  )
}

export default App
// now i want change data of every card
// now there is a flow of sending data 
// data flow form app(parent)---->card or following component(child) 
// mostly we keep data on app and sent it to childs or while application
// <Card user="subhodip" for number {} />  now this value is passed to props in card.js
// 1;41;27 