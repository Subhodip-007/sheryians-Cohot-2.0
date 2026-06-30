import React, { createContext, useState } from 'react'
export const ThemeDataContext= createContext();
const ThemeContext = (props) => {
    const [Theme, setTheme] = useState("light")
    
  return (
   
        <ThemeDataContext.Provider value={[Theme, setTheme]}>
            {props.children}
        </ThemeDataContext.Provider>
      

  )
}

export default ThemeContext
