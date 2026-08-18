import React from 'react'
import { BrowserRouter, Route, RouterProvider, useRoutes } from 'react-router';
import { Routes } from 'react-router';
import AppRoutes from './AppRoutes.jsx';
import "./style.css"
import { AuthProvider } from './feature/auth/auth.context.jsx';
import { PostContext } from './feature/post/post.context.jsx';

const App = () => {
  return (
    <AuthProvider>
      
      <AppRoutes/>
      
    </AuthProvider>
    
  )
}

export default App
