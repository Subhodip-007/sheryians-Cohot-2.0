import { Children, createContext, useEffect, useState } from "react";

export const AuthContext = createContext()
 export const AuthProvider  = ({children})=>{
    const [user, setuser] = useState(null);
    const [loading, setloading] = useState(false)
  

    return (
        <AuthContext.Provider value={{user,loading,setloading,setuser}}>
            {children}
        </AuthContext.Provider>
    )
    
 }