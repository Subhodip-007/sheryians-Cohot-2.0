import React, { useState } from 'react'
import "../style/form.scss"
import {Link, useNavigate} from "react-router"
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  
    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")
    const{handleLogin,loading}=useAuth()
    const navigate= useNavigate()
    if(loading){
      return(
        <h1>Loading.....</h1>
      )
    }
      const handleSubmit = (e)=>{
    e.preventDefault();
    handleLogin(Username,Password)
    .then((res)=>{
      console.log(res);
      navigate("/feed")
      
    })
  }
  return (
  <div className="w-screen h-screen bg-zinc-950 flex items-center justify-center px-5">

  <main className="w-full max-w-[400px]">

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7 shadow-2xl">

      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-white text-3xl font-bold tracking-tight">
          Welcome back
        </h1>

        <p className="text-zinc-500 text-sm mt-2">
          Login to continue to Picly
        </p>
      </div>

      {/* Form */}
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">

        <div>
          <label className="block text-sm text-zinc-300 mb-2">
            Username
          </label>

          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="Username"
            placeholder="Enter your username"
            className="w-full h-12 px-4 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-300 mb-2">
            Password
          </label>

          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="Password"
            placeholder="Enter your password"
            className="w-full h-12 px-4 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 mt-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 active:scale-[0.98] transition"
        >
          Login
        </button>

      </form>

      {/* Register */}
      <p className="text-center text-sm text-zinc-500 mt-6">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-white font-medium hover:underline"
        >
          Register
        </Link>
      </p>

    </div>

  </main>

</div>
  )
}

export default Login
