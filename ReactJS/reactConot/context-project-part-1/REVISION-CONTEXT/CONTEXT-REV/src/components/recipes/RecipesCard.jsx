import React, { useContext } from 'react'
import { RecipeContext } from '../../context/RecipeContext';


const RecipesCard = ({recipe}) => {
  
  let {handleDelete} = useContext(RecipeContext)
  console.log("recipe", recipe)
  return (
    <div className = "flex flex-col gap-2 bg-white/100 p-18 rounded-md shadow-md border border-zinc-300/50 mb-8">
      {/* button function section*/}
      <div className="w-full flex justify-end gap-2">
        <button className="p-6 rounded-full bg-amber-600 font-mono">edit</button>
        <button onClick={()=>{handleDelete(recipe.id)}} className="p-6 rounded-full bg-amber-600 font-mono">delete</button>
      </div>
        {/* UPPER SECTION: Title, Description, and Ingredients */}
  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-zinc-300">

    {/* Left Side: Monospace Word-Wrapped Title & Intro Paragraph */}
    <div className="md:col-span-5 flex flex-col justify-between">
      <div>
        <h1 className="text-4xl md:text-5xl font-mono font-black uppercase leading-tight tracking-tight mb-6 text-zinc-950">
          {recipe.RecipeName.split(" ").map((word, index) => (
            <span key={index} className="block">
              {word}
            </span>
          ))}
        </h1>
        {/* Description Text */}
        <p className="text-xs md:text-sm text-zinc-900 leading-relaxed font-normal max-w-[350px] break-words whitespace-normal">
          {recipe.RecipeDescription}
        </p>
      </div>
    </div>

    {/* Right Side: Ingredients Structured Grid Layout */}
    <div className="md:col-span-7">
      <h2 className="text-lg font-serif italic font-bold mb-4 text-zinc-950">Ingredients:</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2">
        <div className="flex flex-col bg-white/60 p-2 border border-zinc-200/50 rounded-sm shadow-xs">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Ingredient 1</span>
          <span className="text-xs font-medium text-zinc-900 mt-0.5">250g Pizza Dough</span>
        </div>
        <div className="flex flex-col bg-white/60 p-2 border border-zinc-200/50 rounded-sm shadow-xs">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Ingredient 2</span>
          <span className="text-xs font-medium text-zinc-900 mt-0.5">1/2 cup Crushed San Marzano Tomatoes</span>
        </div>
        <div className="flex flex-col bg-white/60 p-2 border border-zinc-200/50 rounded-sm shadow-xs">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Ingredient 3</span>
          <span className="text-xs font-medium text-zinc-900 mt-0.5">100g Fresh Mozzarella Cheese</span>
        </div>
        <div className="flex flex-col bg-white/60 p-2 border border-zinc-200/50 rounded-sm shadow-xs">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Ingredient 4</span>
          <span className="text-xs font-medium text-zinc-900 mt-0.5">Fresh Basil Leaves</span>
        </div>
        <div className="flex flex-col bg-white/60 p-2 border border-zinc-200/50 rounded-sm shadow-xs">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Ingredient 5</span>
          <span className="text-xs font-medium text-zinc-900 mt-0.5">1 tbsp Extra Virgin Olive Oil</span>
        </div>
        <div className="flex flex-col bg-white/60 p-2 border border-zinc-200/50 rounded-sm shadow-xs">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Ingredient 6</span>
          <span className="text-xs font-medium text-zinc-900 mt-0.5">A pinch of Sea Salt</span>
        </div>
      </div>
    </div>
  </div>

  {/* LOWER SECTION: Image Block and Instructions */}
  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 items-start">

    {/* Left Side: Recipe Preview Frame */}
    <div className="md:col-span-5">
      <div className="border border-zinc-300 p-2 bg-white/80 shadow-xs">
        <div className="w-full aspect-square bg-zinc-200 flex flex-col items-center justify-center p-4 text-center text-xs font-mono text-zinc-500 uppercase tracking-wider gap-2">
          <div className="w-full h-full bg-zinc-300 flex items-center justify-center border border-dashed border-zinc-400">
            <span className="text-[10px] text-zinc-600 font-sans tracking-normal font-medium px-4">
              [ Recipe Image Preview Placeholder ]
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* Right Side: Instructions List Layout */}
    <div className="md:col-span-7">
      <h2 className="text-lg font-serif italic font-bold mb-4 text-zinc-950">Instructions:</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        <div className="flex gap-2 text-xs leading-relaxed text-zinc-900">
          <span className="font-mono font-bold text-sm text-zinc-950">1.</span>
          <p>Preheat your oven to its absolute highest temperature setting, ideally with a pizza stone positioned inside.</p>
        </div>
        <div className="flex gap-2 text-xs leading-relaxed text-zinc-900">
          <span className="font-mono font-bold text-sm text-zinc-950">2.</span>
          <p>Stretch out the pizza dough on a floured surface to form a circular shape, maintaining a slightly thicker border.</p>
        </div>
        <div className="flex gap-2 text-xs leading-relaxed text-zinc-900">
          <span className="font-mono font-bold text-sm text-zinc-950">3.</span>
          <p>Spread the crushed San Marzano tomatoes evenly across the base, leaving a margin around the edge for the crust.</p>
        </div>
        <div className="flex gap-2 text-xs leading-relaxed text-zinc-900">
          <span className="font-mono font-bold text-sm text-zinc-950">4.</span>
          <p>Tear fresh mozzarella cheese into medium pieces and distribute them uniformly over the tomato sauce layer.</p>
        </div>
        <div className="flex gap-2 text-xs leading-relaxed text-zinc-900">
          <span className="font-mono font-bold text-sm text-zinc-950">5.</span>
          <p>Bake in the preheated oven for about 7 to 10 minutes until the golden crust becomes crisp and cheese melts beautifully.</p>
        </div>
        <div className="flex gap-2 text-xs leading-relaxed text-zinc-900">
          <span className="font-mono font-bold text-sm text-zinc-950">6.</span>
          <p>Garnish directly with fresh basil leaves, a light drizzle of high-quality extra virgin olive oil, and serve immediately.</p>
        </div>
      </div>

      {/* Interactive footer tag */}
      <div className="mt-6 pt-4 border-t border-dashed border-zinc-400 text-left">
        <a href="#video" className="text-xs font-bold uppercase tracking-wider text-zinc-950 underline underline-offset-4 hover:text-zinc-800">
          Watch the video
        </a>
      </div>
    </div>
  </div>
    </div>
  )
}

export default RecipesCard
