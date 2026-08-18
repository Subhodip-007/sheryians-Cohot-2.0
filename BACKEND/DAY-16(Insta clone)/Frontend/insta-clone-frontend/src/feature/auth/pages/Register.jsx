import axios from 'axios';
import React, { useState } from 'react'
import {Link} from "react-router"
import { useAuth } from '../hooks/useAuth';
const Register = () => {
  const{handleRegister}=useAuth()
  const handleSubmit = (e)=>{
    e.preventDefault();
     handleRegister(Username,Email,Password)
    .then((res)=>{
      console.log(res);
    })
  }
  const [Username, setUsername] = useState("")
   const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
  return (
   <div className="w-screen h-screen bg-zinc-950 flex items-center justify-center px-5">

  <main className="w-full max-w-[400px]">

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7 shadow-2xl">

      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-white text-3xl font-bold tracking-tight">
          Create account
        </h1>

        <p className="text-zinc-500 text-sm mt-2">
          Join Picly and share your world
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex flex-col gap-4"
      >

        {/* Username */}
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

        {/* Email */}
        <div>
          <label className="block text-sm text-zinc-300 mb-2">
            Email
          </label>

          <input
            onInput={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            name="Email"
            placeholder="Enter your email"
            className="w-full h-12 px-4 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm placeholder:text-zinc-600 outline-none focus:border-zinc-500 transition"
          />
        </div>

        {/* Password */}
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

        {/* Register */}
        <button
          type="submit"
          className="w-full h-12 mt-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 active:scale-[0.98] transition"
        >
          Create account
        </button>

      </form>

      {/* Login */}
      <p className="text-center text-sm text-zinc-500 mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-white font-medium hover:underline"
        >
          Login
        </Link>
      </p>

    </div>

  </main>

</div>
  )
}

export default Register
