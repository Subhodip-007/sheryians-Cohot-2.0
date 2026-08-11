import axios from 'axios';
import React, { useState } from 'react'
import {Link} from "react-router"

const Register = () => {
  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:3000/api/user/auth/Register',{
      Username,
      Email,
      Password
      
    },{
        withCredentials:true
      }).then(res=>{
      console.log(res.data);
      
    })
  }
  const [Username, setUsername] = useState("")
   const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
  return (
    <div>
       <main>
        <div className="form-cont">
          <h1>Register</h1>
          <form onSubmit={handleSubmit} action="">
            <input onInput={(e)=>{setUsername(e.target.value)}} type="text" name="Username" placeholder="Enter your username" />
            <input onInput={(e)=>{setEmail(e.target.value)}} type="text" name="Email" placeholder="Enter your Email" />
            <input onInput={(e)=>{setPassword(e.target.value)}} type="password" name="Password" placeholder="Enter your password" />
            <button type="submit">Register</button>
          </form>
          <p>Already have a account ? <Link to={"/login"}>login</Link></p>
        </div>
      </main>
    </div>
  )
}

export default Register
