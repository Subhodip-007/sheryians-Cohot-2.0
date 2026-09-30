import React, { useState } from 'react';
import { ArrowUpRight, Upload } from 'lucide-react';

const CreateRecipes = ({ toggleForm , show , setShow, recipe , setRecipe }) => {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [mealType, setMealType] = useState(""); 
  const [instruction, setInstruction] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      recipeName,
      description,
      mealType, // Added to submission payload
      instruction
    };
        setShow(false)
     setRecipe((prevRecipes) => [...prevRecipes, payload]);
    console.log("Recipe Payload:", payload);
      setRecipeName("");
  setDescription("");
  setInstruction("");
  setFileName("");
  };

  return (
    <div className="min-h-screen w-full bg-transparent flex items-center justify-center p-4 antialiased text-black font-sans z-50">
      {/* Main Container - High-contrast grid box matching layout theme */}
      <div className="w-full max-w-3xl bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        
        {/* Header Section - Kept small text height but scales wide */}
        <div className="border-b border-black p-4 tracking-wide">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-1">
            CREATOR WORKSPACE
          </span>
          <h1 className="text-2xl font-extrabold uppercase leading-none tracking-tight">
            Share your recipe.
          </h1>
        </div>

        {/* Form Container - Split horizontally into a 2-column grid to maximize wide space */}
        <form onSubmit={handleSubmit} className="divide-y divide-black">
          
          {/* Grid wrapper for row fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black">
            
            {/* Left Column Fields - Text Inputs */}
            <div className="flex flex-col divide-y divide-black">
              {/* 01 / Recipe Name Input */}
              <div className="p-4 flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-black">
                  01 / Recipe Name
                </label>
                <input
                  type="text"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  placeholder="Enter recipe name..."
                  className="w-full border border-black p-2 text-xs focus:outline-none focus:bg-zinc-50 transition-colors placeholder:text-zinc-400 bg-white"
                  required
                />
              </div>

              {/* 02 / Description Area */}
              <div className="p-4 flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-black">
                  02 / Description
                </label>
                <textarea
                  id="recipeDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Give a short breakdown..."
                  rows={2}
                  className="w-full border border-black p-2 text-xs focus:outline-none focus:bg-zinc-50 transition-colors placeholder:text-zinc-400 resize-none bg-white"
                  required
                />
              </div>

              {/* 03 / Meal Type Selection Section */}
              <div className="p-4 flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-black">
                  03 / Meal Type Section
                </label>
                <select
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value)}
                  className="w-full border border-black p-2 text-xs focus:outline-none focus:bg-zinc-50 transition-colors bg-white cursor-pointer uppercase font-medium tracking-wide text-zinc-800"
                  required
                >
                  <option value="" disabled className="text-zinc-400">Select Category...</option>
                  <option value="breakfast">Breakfast & Brunch</option>
                  <option value="appetizers">Appetizers & Snacks</option>
                  <option value="main">Main Dishes</option>
                  <option value="sides">Side Dishes</option>
                  <option value="dessert">Desserts</option>
                  <option value="beverages">Beverages</option>
                </select>
              </div>
            </div>

            {/* Right Column Fields - Execution & Action Inputs */}
            <div className="flex flex-col divide-y divide-black">
              {/* 04 / Instructions Area */}
              <div className="p-4 flex flex-col gap-1 flex-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-black">
                  04 / Instructions
                </label>
                <textarea
                  id="recipeInstruction"
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  placeholder="Step 1. Prep... Step 2. Heat..."
                  rows={6} /* Increased row span to visually balance the left side columns */
                  className="w-full border border-black p-2 text-xs focus:outline-none focus:bg-zinc-50 transition-colors placeholder:text-zinc-400 resize-none h-full min-h-[120px] bg-white"
                  required
                />
              </div>

              {/* 05 / Media Attachment */}
              <div className="p-4 flex flex-col gap-1 justify-end">
                <label className="text-[10px] font-bold uppercase tracking-wider text-black">
                  05 / Recipe Cover Media
                </label>
                <label 
                  htmlFor="profile_pic" 
                  className="w-full border border-dashed border-black bg-zinc-50 hover:bg-zinc-100 transition-colors p-2 flex flex-row items-center justify-center gap-3 cursor-pointer group h-[38px]"
                >
                  <Upload size={14} className="text-zinc-600 group-hover:text-black transition-colors shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-wide truncate max-w-[180px]">
                    {fileName ? fileName : "Upload Media"}
                  </span>
                  <span className="text-[9px] text-zinc-400 uppercase font-medium hidden sm:inline">
                    (.jpg, .png, .pdf)
                  </span>
                  <input
                    type="file"
                    id="profile_pic"
                    name="profile_pic"
                    accept=".jpg, .png, .pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

          </div>

          {/* Form Action Layout Row */}
          <div className="flex flex-col items-center">
            {/* Brutalist Form Submit Button */}
            <button
              type="submit"
              className="w-full p-4 text-left font-bold text-xs uppercase tracking-wider flex items-center justify-between group bg-white hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
            >
              <span>Publish Recipe</span>
              <span className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </span>
            </button>
          </div>

        </form>

        {/* Footer Design Line */}
        <div className="border-t border-black bg-zinc-50 px-4 py-2.5 flex justify-between items-center text-[9px] uppercase font-bold tracking-widest text-zinc-500">
          <span>TACTILE UI</span>
          <span>v1.0</span>
        </div>

      </div>
    </div>
  );
};

export default CreateRecipes;
