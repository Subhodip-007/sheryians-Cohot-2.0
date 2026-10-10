import React, { useContext, useState } from 'react';
import { RecipeContext } from '../../context/RecipeContext';

const RecipesForm = () => {
  const { isOpen, setIsOpen ,form , setform , handleChange , handleSubmit } = useContext(RecipeContext);
  



  return (
    <div
      className={`fixed right-0 top-0 z-100 h-screen w-full md:w-1/3 bg-white border-l-2 border-black transition-transform duration-500 ease-in-out antialiased text-black font-sans shadow-[-4px_0px_0px_0px_rgba(0,0,0,1)] overflow-y-auto ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header Section */}
      <div className="border-b border-black p-4 tracking-wide flex justify-between items-start">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-1">
            CREATOR WORKSPACE
          </span>
          <h1 className="text-2xl font-extrabold uppercase leading-none tracking-tight">
            Share your recipe.
          </h1>
        </div>
       
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="divide-y divide-black h-[calc(100vh-77px)] flex flex-col justify-between">
        
        {/* Scrollable Form Fields Content */}
        <div className="flex-1 overflow-y-auto divide-y divide-black">
          
          {/* 01 / Recipe Name Input */}
          <div className="p-4 flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-black">
              01 / Recipe Name
            </label>
            <input
              type="text"
              name="RecipeName"
              placeholder="Enter recipe name..."
              className="w-full border border-black p-2 text-xs focus:outline-none focus:bg-zinc-50 transition-colors placeholder:text-zinc-400 bg-white"
              required
              onChange={handleChange}
              value={form.RecipeName || ""}
            />
          </div>

          {/* 02 / Description Area */}
          <div className="p-4 flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-black">
              02 / Description
            </label>
            <textarea
            name="RecipeDescription"
              placeholder="Give a short breakdown..."
              rows={2}
              className="w-full border border-black p-2 text-xs focus:outline-none focus:bg-zinc-50 transition-colors placeholder:text-zinc-400 resize-none bg-white"
              required
              onChange={handleChange}
              value={form.RecipeDescription || ""}
            />
          </div>

          {/* 03 / Ingredients */}
          <div className="p-4 flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-black">
              03 / Ingredients
            </label>
            <textarea
            name="RecipeIngredients"
              placeholder="List ingredients here..."
              rows={2}
              className="w-full border border-black p-2 text-xs focus:outline-none focus:bg-zinc-50 transition-colors placeholder:text-zinc-400 resize-none bg-white"
              required
              onChange={handleChange}
              value={form.RecipeIngredients || ""}
            />
          </div>

          {/* 04 / Meal Type Selection Section */}
          <div className="p-4 flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-black">
              04 / Meal Type Section
            </label>
            <select
              className="w-full border border-black p-2 text-xs focus:outline-none focus:bg-zinc-50 transition-colors bg-white cursor-pointer uppercase font-medium tracking-wide text-zinc-800"
              required
              name="RecipeType"
              onChange={handleChange}
              value={form.RecipeType || ""}
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

          {/* 05 / Instructions Area */}
          <div className="p-4 flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-black">
              05 / Instructions
            </label>
            <textarea
              placeholder="Step 1. Prep... Step 2. Heat..."
              rows={5}
              className="w-full border border-black p-2 text-xs focus:outline-none focus:bg-zinc-50 transition-colors placeholder:text-zinc-400 resize-none min-h-[100px] bg-white"
              required
              name="RecipeInstructions"
              onChange={handleChange}
              value={form.RecipeInstructions || ""}
            />
          </div>

          {/* 06 / Recipe Cover Media */}
          <div className="p-4 flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-black">
              06 / Recipe Cover Media
            </label>
            <div className="border border-dashed border-black p-4 text-center cursor-pointer relative hover:bg-zinc-50 transition-colors">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                value={form.RecipeCoverImage || ""}
                name="RecipeCoverImage"
                onChange={(e) => setform((prev) => ({ ...prev, RecipeCoverImage: e.target.files[0] }))}
              />
              <div className="flex flex-col items-center gap-1 text-zinc-400">
                <span className="text-xs font-bold text-black uppercase tracking-wider">
                  Upload Cover Image
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Submit Action Trigger Button */}
        <button
          type="submit"
          className="w-full bg-black text-white p-4 font-bold uppercase tracking-widest text-xs hover:bg-zinc-900 transition-colors shrink-0"
        >
          Save Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipesForm;

