import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { UseAuth } from '../hooks/UseAuth';


const Register = () => {
    const navigate = useNavigate()
    const {handleRegister,user, loading} = UseAuth()
     const [Username, setUsername] = useState("")
   const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const handleSubmit =async (e)=>{
        e.preventDefault()
        await handleRegister(Username,Email,Password)
         console.log("user registered");
        
        navigate('/')
    }
    if(loading){
      return (
        <div>
            <h1>loading</h1>
        </div>
      )
    }
  return (
    <div className="min-h-screen bg-[#f5f5f3] flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                {/* SVG */}
                <div className="flex justify-center mb-8">
                    {/* your SVG */}
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold text-[#111]">
                        Create account
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Create your account to get started
                    </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="bg-white border border-black/10 rounded-2xl p-6 shadow-sm">

                    <div className="mb-5">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-[#111] mb-2"
                        >
                            Username
                        </label>

                        <input
                            onInput={(e)=>{setUsername(e.target.value)}}
                            id="username"
                            name="Username"
                            type="text"
                            placeholder="Choose a username"
                            required
                            className="w-full h-12 px-4 rounded-xl border border-gray-200 outline-none text-sm focus:border-black transition"
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-[#111] mb-2"
                        >
                            Email
                        </label>

                        <input
                        onInput={(e)=>{setEmail(e.target.value)}}
                            id="email"
                            name="Email"
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="w-full h-12 px-4 rounded-xl border border-gray-200 outline-none text-sm focus:border-black transition"
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-[#111] mb-2"
                        >
                            Password
                        </label>

                        <input
                        onInput={(e)=>{setPassword(e.target.value)}}
                            id="password"
                            name="Password"
                            type="password"
                            placeholder="Create a password"
                            required
                            className="w-full h-12 px-4 rounded-xl border border-gray-200 outline-none text-sm focus:border-black transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full h-12 rounded-xl bg-[#111] text-white text-sm font-medium hover:bg-black/80 transition"
                    >
                        Create account
                    </button>
                     <p className="mt-2 text-sm text-gray-500">Have an account ? <Link className="text-sm font-medium text-black underline" to={'/Login'}>Login</Link>  </p>
                </form>

            </div>
        </div>
  )
}

export default Register
