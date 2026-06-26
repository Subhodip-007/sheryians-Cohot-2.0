import React from 'react'

const App = () => {
  const user={
    name:'shub',
    age:12,
    Role:"SDE2"
  }
  localStorage.setItem('user',JSON.stringify(user));
  const localdata= JSON.parse(localStorage.getItem('user'))
  return (
    <div>
      
    </div>
  )
}

export default App
