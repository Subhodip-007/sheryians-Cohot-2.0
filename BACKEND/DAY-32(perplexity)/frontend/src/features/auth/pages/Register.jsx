import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
const Register = () => {
 const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
       const payload = {
      username,
      email,
      password
    };
    console.log("login payload:", payload);
  };

  return (
    <div className="min-h-screen w-full bg-zinc-300 flex items-center justify-center p-4 antialiased text-black font-sans">
      {/* Main Container - Sharp structural borders mimicking the image grid */}
      <div className="w-full max-w-xl bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        
        {/* Header Section */}
        <div className="border-b border-black p-6 tracking-wide">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block mb-2">
            START YOUR JOURNEY
          </span>
          <h1 className="text-4xl font-extrabold uppercase leading-none tracking-tight">
            Create your <br /> account.
          </h1>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="divide-y divide-black">
          
          {/* Username Input Block */}
          <div className="p-6 flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-black">
              01 / Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
              placeholder="Enter your unique username"
              className="w-full border border-black p-3 text-sm focus:outline-none focus:bg-zinc-50 transition-colors placeholder:text-zinc-400"
              required
            />
          </div>

          {/* Email Input Block */}
          <div className="p-6 flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-black">
              02 / Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-black p-3 text-sm focus:outline-none focus:bg-zinc-50 transition-colors placeholder:text-zinc-400"
              required
            />
          </div>

          {/* Password Input Block */}
          <div className="p-6 flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-black">
              03 / Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-black p-3 text-sm focus:outline-none focus:bg-zinc-50 transition-colors placeholder:text-zinc-400"
              required
            />
          </div>

          {/* Submit Button Block - Stylized exactly like the image call-to-action blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black items-center">
            
            {/* Redirect Paragraph Link */}
            <div className="p-6 text-sm text-zinc-600">
              Already have an account?{' '}
              <a href="/login" className="font-bold text-black underline underline-offset-4 hover:text-zinc-700 transition-colors">
                Login here
              </a>
            </div>

            {/* Themed Interactive Submit Button */}
            <button
              type="submit"
              className="w-full p-6 text-left font-bold uppercase tracking-wider flex items-center justify-between group bg-white hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
            >
              <span>Register Now</span>
              <span className="text-xl transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">
               <ArrowUpRight />
              </span>
            </button>
          </div>

        </form>

        {/* Footer Accent Row matching the reference layout style */}
        <div className="border-t border-black bg-zinc-50 px-6 py-4 flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-zinc-500">
          <span>TACTILE BRUTALISM UI</span>
          <span>SECURE ACCESS v1.0</span>
        </div>

      </div>
    </div>
  );
};

export default Register;
