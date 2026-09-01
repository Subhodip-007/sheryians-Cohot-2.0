import React from 'react'
import FaceExpression from './feature/Expression/components/FileExpression';
import { RouterProvider } from 'react-router';
import { router } from './app.routes';
import "./feature/shared/styles/Global.scss"
import { AuthProvider } from './feature/auth/context/auth.context';
const App = () => {
  return (
    // <FaceExpression/>
    <AuthProvider>
          <RouterProvider router={router}/>
    </AuthProvider>

  )
}

export default App
