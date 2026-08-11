import { BrowserRouter,Route,Routes } from "react-router";
import Login from "./feature/auth/pages/Login";
import Register from "./feature/auth/pages/Register";



function appRoutes(){
    return(
        <BrowserRouter>
    <Routes> 
      <Route path='/login' element = {<Login/>}/>
      <Route path='/register' element = {<Register/>}/>

    </Routes>
    </BrowserRouter>
    )
}

export default appRoutes