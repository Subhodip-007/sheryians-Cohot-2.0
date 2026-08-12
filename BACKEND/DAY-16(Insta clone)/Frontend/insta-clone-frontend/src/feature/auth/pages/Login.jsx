import React, { useState } from 'react'
import "../style/form.scss"
import {Link} from "react-router"
import axios from 'axios';

const Login = () => {
    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")
      const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:3000/api/user/auth/login',{
      Username,
      Password
      
    },{
        withCredentials:true
      }).then(res=>{
      console.log(res.data);
      
    })
  }
  return (
    <div>
      <main>
        <div className="form-cont">
          <h1>login</h1>
          <form action="" onSubmit={handleSubmit}>
            <input onInput={(e)=>{setUsername(e.target.value)}} type="text" name="Username" placeholder="Enter your username" />
            <input onInput={(e)=>{setPassword(e.target.value)}} type="password" name="Password" placeholder="Enter your password" />
            <button type="submit">login</button>
          </form>
          <p>Don't have a account ? <Link to={"/register"}>register</Link></p>
        </div>
      </main>
    </div>
  )
}

export default Login
