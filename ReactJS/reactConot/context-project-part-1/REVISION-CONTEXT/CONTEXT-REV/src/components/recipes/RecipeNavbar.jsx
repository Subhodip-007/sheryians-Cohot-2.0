import { ClosedCaption, Cross, Plus, X } from 'lucide-react';
import React, { useContext } from 'react'
import { RecipeContext } from '../../context/RecipeContext';

const RecipeNavbar = () => {
  const { isOpen , setisOpen ,handleButton  } = useContext(RecipeContext)
  return (
  
<div className="fixed top-3 left-[96%] -translate-x-1/2 z-200">
  <nav>
    <button onClick={handleButton} className="p-4 bg-amber-200 rounded-full">
      {isOpen ?<X/> : <Cross/>}
     
    </button>
  </nav>
</div>

  )
}

export default RecipeNavbar
