import React from 'react'
import {  RouterProvider } from 'react-router';
import AppRouter from './app.routes';
import { AuthProvider } from './features/auth/context/auth.context';

const App = () => {
  return (
   <AuthProvider>
     <RouterProvider router={AppRouter}/>
    </AuthProvider>
     
   
  )
}

export default App
