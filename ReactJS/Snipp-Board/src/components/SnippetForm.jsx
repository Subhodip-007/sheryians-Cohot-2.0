import React from 'react'
import { languages } from "../data/languages";
const SnippetForm = ({clickFormbtn}) => {

    return (
        <div className=' p-4 h-100 w-200 bg-amber-300 rounded-3xl fixed top-20 left-100  z-100 '>
            
         <div className='flex w-full justify-between'>
               <h1 className='font-mono text-2xl capitalize bg-zinc-700 w-fit rounded-2xl p-2'>built your sni<i className="ri-puzzle-2-line text-amber-500 font-medium text-2xl"></i>et</h1>
            <i onClick={clickFormbtn} className="ri-close-line  text-4xl"></i>
         </div>
            <form action="" onSubmit={(e)=>{
                e.preventDefault();
                clickFormbtn()
            }}>
               <div className='flex justify-between p-4'>
                 <div className='flex flex-col gap-4'>
                    <input type="text" placeholder='Enter Title OF snippet' className='p-4 rounded-2xl border ' />
                    <select className='p-2 rounded-2xl border' >
                        <option className='bg-zinc-800 text-amber-50 rounded-2xl' value="">Select Language</option>

                        {languages.map((lang) => (
                            <option className='bg-zinc-800 text-amber-50 rounded-2xl' key={lang} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                </div>
                <textarea
                    rows="10"
                    placeholder="Paste your code here..."
                    className=" max-h-60 w-1/2 rounded-lg border border-zinc-700 bg-zinc-900 p-3 font-mono resize-none outline-none text-amber-50"
                />
               </div>
                <button
                    className="rounded-2xl bg-zinc-800 p-3 font-semibold hover:bg-zinc-600 active:scale-95 transition text-amber-50"
                >
                    Add Snippet
                </button>
            </form>
        </div>
    )
}

export default SnippetForm 
