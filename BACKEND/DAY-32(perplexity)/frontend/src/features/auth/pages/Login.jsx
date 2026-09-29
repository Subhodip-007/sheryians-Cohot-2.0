import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const Login = () => {
  // 1. Your individual states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email,
      password
    };
    console.log("login payload:", payload);
  };

  return (
    <div className="min-h-screen w-full bg-zinc-300 flex items-center justify-center p-4 antialiased text-black font-sans">
      {/* Main Container - High-contrast grid box */}
      <div className="w-full max-w-xl bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        
        {/* Header Section */}
        <div className="border-b border-black p-6 tracking-wide">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block mb-2">
            WELCOME BACK
          </span>
          <h1 className="text-4xl font-extrabold uppercase leading-none tracking-tight">
            Log into your <br /> journey.
          </h1>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="divide-y divide-black">
          
          {/* Email Input Block */}
          <div className="p-6 flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-black">
              01 / Email Address
            </label>
            <input
              type="email"
              name="email"
              // 2. Wired directly to email state
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-black p-3 text-sm focus:outline-none focus:bg-zinc-50 transition-colors placeholder:text-zinc-400"
              required
            />
          </div>

          {/* Password Input Block */}
          <div className="p-6 flex flex-col gap-2">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-bold uppercase tracking-wider text-black">
                02 / Password
              </label>
              <a href="/forgot-password" className="text-xs font-bold uppercase text-zinc-500 hover:text-black transition-colors underline underline-offset-2">
                Forgot?
              </a>
            </div>
            <input
              type="password"
              name="password"
              // 3. Wired directly to password state
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-black p-3 text-sm focus:outline-none focus:bg-zinc-50 transition-colors placeholder:text-zinc-400"
              required
            />
          </div>

          {/* Action Split Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black items-center">
            
            {/* Redirect Paragraph Link */}
            <div className="p-6 text-sm text-zinc-600">
              Don't have an account?{' '}
              <a href="/register" className="font-bold text-black underline underline-offset-4 hover:text-zinc-700 transition-colors">
                Register here
              </a>
            </div>

            {/* Themed Interactive Submit Button */}
            <button
              type="submit"
              className="w-full p-6 text-left font-bold uppercase tracking-wider flex items-center justify-between group bg-white hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
            >
              <span>Login Now</span>
              {/* 4. Styled lucide icon wrapper */}
              <span className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">
                <ArrowUpRight size={24} strokeWidth={2.5} />
              </span>
            </button>
          </div>

        </form>

        {/* Footer Accent Row */}
        <div className="border-t border-black bg-zinc-50 px-6 py-4 flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-zinc-500">
          <span>TACTILE BRUTALISM UI</span>
          <span>SECURE ACCESS v1.0</span>
        </div>

      </div>
    </div>
  );
};

export default Login;
