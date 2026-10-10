import React, { useContext } from 'react'
import RecipeNavbar from '../components/recipes/RecipeNavbar';
import RecipesForm from '../components/recipes/RecipesForm';
import RecipesCard from '../components/recipes/RecipesCard';
import { RecipeContext } from '../context/RecipeContext';

const RecipiesPage = () => {
  const {recipes , setrecipes} = useContext(RecipeContext)
  return (
    <div className="min-h-screen w-full bg-zinc-50">
      <RecipeNavbar/>
      <RecipesForm/>
      <div className="h-screen w-full bg-zinc-800 overflow-y-auto flex flex-col gap-1">
          {recipes.map((recipe, index) => {
  return <RecipesCard key={recipe.id} recipe={recipe}/>;
})}
          
          
          
      </div>
     
      

      </div>
      
      
    
  )
}

export default RecipiesPage
