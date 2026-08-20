import React from "react";
import { useNavigate } from "react-router";

const Nav = () => {
    const navigate = useNavigate()
  return (
    <nav className="absolute top-4 left-1/2 z-50 flex w-[calc(25%-24px)] -translate-x-1/2 items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/15 px-4 py-3 shadow-lg backdrop-blur-xl">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white font-bold text-black">
          I
        </div>

        <span className="text-base font-semibold tracking-tight text-white">
          Insta
        </span>
      </div>

      {/* New Post */}
      <button onClick={()=>{navigate("/create-post")}} className=" w-fit rounded-xl bg-white px-2 py-1.5 text-xs font-semibold text-black transition active:scale-95 hover:bg-zinc-200">
        + New Post
      </button>

    </nav>
  );
};

export default Nav;