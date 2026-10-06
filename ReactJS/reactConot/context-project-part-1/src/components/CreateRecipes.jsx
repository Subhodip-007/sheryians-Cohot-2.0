import React, { useState, useContext } from 'react';
import { Upload } from 'lucide-react';
import { RecipeContext } from '../context/Racipes.contect';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid/non-secure';


const CreateRecipes = ({ toggleForm, show, setShow }) => {
  // Local form state variables
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [mealType, setMealType] = useState(""); 
  const [instruction, setInstruction] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imagePreview, setImagePreview] = useState(""); // Holds the Base64 image string

  // Consume setRecipe state setter from global Context
  const { setRecipe } = useContext(RecipeContext); 

  // Process the file to a renderable Base64 data string
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Capture the first selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Updates local state with target image string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const payload = {
      id:nanoid(),
      recipeName,
      description,
      mealType,
      instruction,
      ingredients,
      recipeImage: imagePreview // Save Base64 image inside global context payload
    };
        console.log(payload);
        
    setShow(false); // Close modal container form overlay
    setRecipe((prevRecipes) => [...prevRecipes, payload]); // Append payload directly to Context array
    toast.success("new recipe created")
    // Clear all local states upon successful submission
    setRecipeName("");
    setDescription("");
    setMealType("");
    setInstruction("");
    setIngredients("");
    setImagePreview("");
  };


  return (
    <div className="min-h-screen w-full bg-transparent flex items-center justify-center p-4 antialiased text-black font-sans z-[999]">
      {/* Main Container - High-contrast grid box matching layout theme */}
      <div className="w-full max-w-3xl bg-white border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        
        {/* Header Section */}
        <div className="border-b border-black p-4 tracking-wide">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-1">
            CREATOR WORKSPACE
          </span>
          <h1 className="text-2xl font-extrabold uppercase leading-none tracking-tight">
            Share your recipe.
          </h1>
        </div>

        {/* Form Container - Split horizontally into a 2-column grid */}
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
              {/*02 ingredients  */}
              <div className="p-4 flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-black">
                  02 / Ingredients  
                </label>
                <textarea
                  id="recipeIngredients"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="List ingredients here..."
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
                  rows={6}
                  className="w-full border border-black p-2 text-xs focus:outline-none focus:bg-zinc-50 transition-colors placeholder:text-zinc-400 resize-none h-full min-h-[120px] bg-white"
                  required
                />
              </div>

              {/* 05 / Media Attachment Container */}
              <div className="p-4 flex flex-col gap-1 justify-end">
                <label className="text-[10px] font-bold uppercase tracking-wider text-black">
                  05 / Recipe Cover Media
                </label>
                <div className="border border-dashed border-black p-4 text-center cursor-pointer relative hover:bg-zinc-50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  {/* Image Context Preview State Logic Check */}
                  {imagePreview ? (
                    <div className="flex items-center justify-center gap-2">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-12 h-12 object-cover border border-black" 
                      />
                      <span className="text-xs font-mono truncate max-w-[150px]">
                        Image Loaded Successfully!
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-zinc-400">
                      <Upload size={16} className="text-black" />
                      <span className="text-xs font-bold text-black uppercase tracking-wider">
                        Upload Cover Image
                      </span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Submit Action Action Trigger Button */}
          <button 
            type="submit" 
            className="w-full bg-black text-white p-3 font-bold uppercase tracking-widest text-xs hover:bg-zinc-900 transition-colors"
          >
            Save Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipes;
