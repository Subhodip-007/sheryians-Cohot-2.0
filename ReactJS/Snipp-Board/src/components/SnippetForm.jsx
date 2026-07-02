import React, { useState } from 'react'
import { languages } from "../data/languages";
import { Form } from 'react-router-dom';
const SnippetForm = ({ clickFormbtn, addSnippet }) => {
    const [FormData, setFormData] = useState({
        id: null,
        title: "",
        language: "",
        code: "",
        favorite: false,
        tags: ""
    });





    return (
        <div className=' p-4 h-100 w-200 bg-amber-300 rounded-3xl fixed top-20 left-100  z-100 '>

            <div className='flex w-full justify-between'>
                <h1 className='font-mono text-2xl capitalize bg-zinc-700 w-fit rounded-2xl p-2'>built your sni<i className="ri-puzzle-2-line text-amber-500 font-medium text-2xl"></i>et</h1>
                <i onClick={clickFormbtn} className="ri-close-line  text-4xl"></i>
            </div>
            <form action="" onSubmit={(e) => {
                e.preventDefault();
                addSnippet(FormData)
                clickFormbtn()
            }}>
                <div className='flex justify-between p-4'>
                    <div className='flex flex-col gap-4'>
                        <input value={FormData.title}
                            onChange={(e) =>
                                setFormData({ ...FormData, title: e.target.value, })
                            } type="text" placeholder='Enter Title OF snippet' className='p-4 rounded-2xl border ' />
                        <select value={FormData.language}
                            onChange={(e) =>
                                setFormData({ ...FormData, language: e.target.value, })
                            } className='p-2 rounded-2xl border' >
                            <option className='bg-zinc-800 text-amber-50 rounded-2xl' value="">Select Language</option>

                            {languages.map((lang) => (
                                <option className='bg-zinc-800 text-amber-50 rounded-2xl' key={lang} value={lang}>
                                    {lang}
                                </option>
                            ))}
                        </select>
                        <input
                        className='p-4 rounded-2xl border ' 
                            type="text"
                            placeholder="React, Hooks, useEffect"
                            value={FormData.tags}
                            onChange={(e) =>
                                setFormData({
                                    ...FormData,
                                    tags: e.target.value,
                                })
                            }
                        />
                    </div>
                    <textarea
                        value={FormData.code}
                        onChange={(e) =>
                            setFormData({
                                ...FormData,
                                code: e.target.value,
                            })
                        }
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
