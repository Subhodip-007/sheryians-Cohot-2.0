import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-zinc-950 flex items-center justify-center px-5">

      {/* Mobile Container */}
      <div className="w-full max-w-[400px] h-full max-h-[800px] flex flex-col">

        {/* Top */}
        <div className="flex items-center py-6">
          <h1 className="text-white text-2xl font-bold tracking-tight">
            Picly
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">

          {/* Logo */}
          <div className="w-24 h-24 rounded-[28px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center mb-8 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl border-[3px] border-white flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border-[3px] border-white"></div>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-white text-4xl font-bold tracking-tight mb-4">
            Share your world.
          </h2>

          {/* Description */}
          <p className="text-zinc-400 text-sm leading-6 max-w-[300px]">
            Connect with friends, share moments, and discover
            something new every day.
          </p>

          {/* Get Started */}
          <button
            onClick={() => navigate("/register")}
            className="mt-10 w-full h-12 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition active:scale-[0.98]"
          >
            Get Started
          </button>

          {/* Login */}
          <p className="text-zinc-500 text-sm mt-5">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-white font-medium hover:underline"
            >
              Log in
            </button>
          </p>

        </div>

        {/* Bottom */}
        <div className="py-6 text-center">
          <p className="text-zinc-600 text-xs">
            By continuing, you agree to our Terms & Privacy Policy.
          </p>
        </div>

      </div>

    </div>
  );
};

export default Home;