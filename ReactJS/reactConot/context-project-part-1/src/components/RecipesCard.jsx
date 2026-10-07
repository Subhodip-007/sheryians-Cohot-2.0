import React from 'react'
import { Trash } from 'lucide-react';
import { set } from 'react-hook-form';
const RecipesCard = ({ recipe , setRecipe,recipeList,show,setShow,edithandle }) => {
    const deleteHandler = (id) =>{
    const updatedRecipes = recipeList.filter(item => item.id !== id);
  setRecipe(updatedRecipes);
    console.log("deleted task id: ",id   );
  }
  
  

  return (
    <div className="w-full mx-auto bg-[#FAF9F6] text-black font-sans p-8 md:p-12 border border-zinc-200 shadow-sm antialiased mb-8">
    <div className=" flex w-full justify-end ">
        <button onClick={()=>{deleteHandler(recipe.id)}} className="p-4 rounded-full bg-amber-400 text-amber-50 font-mono ">
        <Trash/>
      </button>
      <button onClick={()=>{edithandle(recipe.id)}} className="p-4 rounded-full bg-blue-400 text-blue-50 font-mono ml-2">
        Edit
      </button>
    </div>
      {/* UPPER SECTION: Title, Description, and Ingredients */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-zinc-300">

        {/* Left Side: Dynamic Monospace Word-Wrapped Title & Intro Paragraph */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-mono font-black uppercase leading-tight tracking-tight mb-6">
              {recipe.recipeName.split(" ").map((word, index) => (
                <span key={index} className="block">
                  {word}
                </span>
              ))}
            </h1>
            {/* Dynamic Description Text */}
            <p className="text-xs md:text-sm text-zinc-800 leading-relaxed font-normal max-w-[350px] break-words whitespace-normal">
              {recipe.description}
            </p>
          </div>
        </div>

        {/* Right Side: Ingredients Structured Grid Layout (Static Demo Template) */}
             <div className="md:col-span-7">
  <h2 className="text-lg font-serif italic font-bold mb-4">Ingredients:</h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2">
    {recipe.ingredients
      ?.split('\n')
      .filter(step => step.trim() !== '')
      .map((ingredientText, index) => (
        <div key={index} className="flex flex-col bg-white/50 p-2 border border-zinc-100 rounded-sm">
          <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
            Ingredient {index + 1}
          </span>
          <span className="text-xs font-medium text-zinc-900 mt-0.5">
            {/* Removes any pre-written numbers or 'Ingredient 1.' typed by the user */}
            {ingredientText.replace(/^\s*(ingredient\s*\d+\.?|\d+\.?)\s*/i, '')}
          </span>
        </div>
      ))}
  </div>
</div>
      </div>

      {/* LOWER SECTION: Image Block and Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 items-start">

        {/* Left Side: Recipe Preview Frame (Shows the cover media file name) */}
       <div className="md:col-span-5">
  <div className="border border-zinc-300 p-2 bg-white shadow-xs">
    <div className="w-full aspect-square bg-zinc-200 flex flex-col items-center justify-center p-4 text-center text-xs font-mono text-zinc-500 uppercase tracking-wider gap-2">
      {recipe.recipeImage ? (
        <img
          src={recipe.recipeImage}
          alt={recipe.title || "Recipe preview"}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-[10px] text-zinc-400 font-sans normal-case break-all">
          No file uploaded
        </span>
      )}
    </div>
  </div>
</div>

        {/* Right Side: Dynamic Instructions Line Break Parser */}
        <div className="md:col-span-7">
          <h2 className="text-lg font-serif italic font-bold mb-4">Instructions:</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {/* 
              Splits text area input by newlines, filters out empty loops, 
              and maps out distinct custom step list fragments 
            */}
            {recipe.instruction
              .split('\n')
              .filter(step => step.trim() !== '')
              .map((stepText, index) => (
                <div key={index} className="flex gap-2 text-xs leading-relaxed text-zinc-800">
                  <span className="font-mono font-bold text-sm text-black">
                    {index + 1}.
                  </span>
                  <p>
                    {/* Removes any pre-written numbers like 'Step 1' or '1.' typed by the user */}
                    {stepText.replace(/^\s*(step\s*\d+\.?|\d+\.?)\s*/i, '')}
                  </p>
                </div>
              ))}
          </div>

          {/* Interactive footer tag */}
          <div className="mt-6 pt-4 border-t border-dashed border-zinc-300 text-left">
            <a href="#video" className="text-xs font-bold uppercase tracking-wider text-black underline underline-offset-4 hover:text-zinc-600">
              Watch the video
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}

export default RecipesCard
