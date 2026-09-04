import React from 'react'
import FaceExpression from "./feature/Expression/components/FaceExpression";
import { RouterProvider } from 'react-router';
import { router } from './app.routes';
import "./feature/shared/styles/Global.scss"
import { AuthProvider } from './feature/auth/context/auth.context';
import { SongContextProvider } from './feature/Home/song.context';
const App = () => {
  return (
    // <FaceExpression/>
    <AuthProvider>
      <SongContextProvider>
      <RouterProvider router={router}/>
      </SongContextProvider>
    </AuthProvider>

  )
}

export default App
