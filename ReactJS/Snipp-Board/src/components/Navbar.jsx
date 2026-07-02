import React from 'react'
import { languages } from "../data/languages";
const Navbar = ({clickFormbtn}) => {
    
    
  return (
      <nav className=" z-[999] h-14 w-[80%] fixed top-4 left-1/2 -translate-x-1/2 pr-4 flex items-center justify-between rounded-2xl bg-zinc-900/30 backdrop-blur-xl border border-white/10 shadow-xl">
        <div>
            <img src="Logo.jpg" alt="" className='h-[100px] w-[100px] scale-125' />
        </div>
<div className='flex gap-3'>
            <select
 
  className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2"
>
  <option value="all">All Languages</option>

  {languages.map((lang) => (
    <option key={lang} value={lang}>
      {lang}
    </option>
  ))}
</select>
        <button onClick={clickFormbtn} className='px-4 rounded-2xl bg-zinc-700 flex gap-1 items-center active:scale-95 transition-transform duration-150 '>
            <i className="ri-puzzle-2-line text-amber-50 font-medium text-xl"></i>
            <h1 className='font-mono text-amber-300 '>Add</h1>
        </button>
</div>
       </nav>
  )
}

export default Navbar
