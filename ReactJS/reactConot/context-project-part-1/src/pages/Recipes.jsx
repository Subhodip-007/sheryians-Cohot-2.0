import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { findValueType } from 'framer-motion';
import { BookPlus, VolumeX, X } from 'lucide-react';
import CreateRecipes from '../components/CreateRecipes';
import RecipesCard from '../components/RecipesCard';

const Recipes = () => {
   const [show, setShow] = useState(false);
   const [recipe,setRecipe] = useState([]);
   const toggleForm = ()=>{
     setShow(!show)
   }
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#faf9f5] select-none dragga ">
      <Navbar />
      <div className=" h-screen w-full bg-zinc-900 flex justify-between items-center flex-col px-3">
        <div className="h-[20%] w-[80%] bg-zinc-900 rounded-xl flex items-center px-6">
          <h1 className="font-mono text-zinc-100 text-3xl">whats did u pick today..</h1>
                <div className="fixed top-6 left-[90%] z-[999] w-[90%] max-w-m">
        <button onClick={toggleForm} className="bg-amber-200 flex flex-col items-center gap-1 rounded-full px-5 py-2 text-amber-600">
         {show ?<X/>:<BookPlus/>}
        </button>
      </div>
       {show ?
      <div className="absolute bottom-10 right-[50%] translate-x-1/2">
        <CreateRecipes toggleForm = {toggleForm} show ={show} setShow={setShow} recipes={recipe} setRecipe={setRecipe}/> 
        </div> : null}
        </div>
        <div className=" h-[80%] w-[80%] bg-amber-50 rounded-xl overflow-auto">
              {recipe.map((recipe, index) => (
    // Pass the individual 'recipe' object down as a prop to your card component
    <RecipesCard key={index} recipe={recipe} />
  ))}
        </div>
      </div>
    </div>
  )
}


export default Recipes
