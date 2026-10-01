import { createContext, useEffect, useState } from "react";

export const RecipeContext = createContext()
export const RecipeProvider = ({children})=>{
  const [recipe, setRecipe] = useState(() => {
    try {
      const savedRecipes = localStorage.getItem("recipes_data");
      return savedRecipes ? JSON.parse(savedRecipes) : [];
    } catch (error) {
      console.error("Error loading recipes from localStorage:", error);
      return []; // Fallback to initial empty array or default list
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("recipes_data", JSON.stringify(recipe));
    } catch (error) {
      console.error("Error saving recipes to localStorage:", error);
    }
  }, [recipe]);
    return (
        <RecipeContext.Provider value={{recipe,setRecipe}}>
            {children}
        </RecipeContext.Provider>
    )

}