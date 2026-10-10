import { nanoid } from "nanoid";
import { useState, createContext, useEffect } from "react"; 

// 1. Create the context
export const RecipeContext = createContext();

// 2. Create the provider component
export const RecipeProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [recipes, setrecipes] = useState(() => {
  const savedRecipes = localStorage.getItem('recipes');
  return savedRecipes ? JSON.parse(savedRecipes) : [];
});
useEffect(() => {
  localStorage.setItem('recipes', JSON.stringify(recipes));
}, [recipes]);

    const [form, setform] = useState({
    RecipeName:"",
    RecipeDescription:"",
    RecipeIngredients:[],
    RecipeType:"",
    RecipeInstructions:"",
  })
  const resetForm = () => {
    setform({
      recipeName: "",
      recipeDescription: "",
      recipeIngredients: [],
      recipeType: "",
      recipeInstructions: "",
    })
  }
  const handleButton = ()=>{
    setIsOpen((prev) => !prev);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;


    if (name === "RecipeIngredients") {
      setform((prev) => ({
        ...prev,
        [name]: value.split(',').map(item => item.trim())
      }));
    } else {
      setform((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = (e) =>{
    e.preventDefault();
    const finalPayLoad = {
      id:nanoid(),  
    ...form
    }
    console.log(finalPayLoad);
    setrecipes((prev) => [...prev , finalPayLoad]);

    setIsOpen(!isOpen);
    resetForm();
  }
  const handleDelete = (id) =>{
    let updatedRecipe = recipes.filter((recipe)=> recipe.id !== id);
    setrecipes(updatedRecipe);
  }
  return ( 
    <RecipeContext.Provider value={{ isOpen, setIsOpen , handleButton , form , setform , handleChange , handleSubmit, recipes , setrecipes, handleDelete }}>
      {children}
    </RecipeContext.Provider>
  );
};