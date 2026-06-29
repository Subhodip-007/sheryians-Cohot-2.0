import React, { createContext } from 'react'
export const userdatacontext=createContext();
const UserContext = (props) => {
    console.log(props);
    const user='shub'
  return (
    <div className='context-div'>
        <userdatacontext.Provider value={user}>
            {props.children}
        </userdatacontext.Provider>
        
    </div>
  )
}

export default UserContext