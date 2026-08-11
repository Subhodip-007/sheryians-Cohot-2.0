import React from 'react'
import { BrowserRouter, Route, RouterProvider, useRoutes } from 'react-router';
import { Routes } from 'react-router';
import AppRoutes from './appRoutes.jsx';
import "./style.scss"

const App = () => {
  return (
    <AppRoutes/>
  )
}

export default App
