import { BrowserRouter,Route,Routes } from "react-router";
import Login from "./feature/auth/pages/Login";
import Register from "./feature/auth/pages/Register";
import Home from "./feature/auth/pages/Home";
import Feed from "./feature/post/pages/feed";



function appRoutes(){
    return(
        <BrowserRouter>
    <Routes> 
        <Route path='/' element = {<Home/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/register' element = {<Register/>}/>
        <Route path='/feed' element = {<Feed/>}/>
    </Routes>
    </BrowserRouter>
    )
}

export default appRoutes