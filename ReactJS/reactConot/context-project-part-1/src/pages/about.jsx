
import { LogIn } from 'lucide-react';
import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'

const about = () => {
  // i am using about section for understanding
  // api integration
  const [loading, setloading] = useState(false)
  const [data , setData] =useState([])
  // const getData = async()=>{
  //   setloading(true);
  //   try{
  //       const response = await fetch("https://dummyjson.com/recipes");
  //       const dataJson = await response.json()
  //       console.log(dataJson);
  //       setData(dataJson.recipes)
        
        
  //   }catch(err){
  //     console.log(err);
      
  //   }finally{
  //     setloading(false)
  //   }
  
  // } 
  // now let suppose u have more then 3 , 4 components and u have ot call this api 
// then how to........... 
//  then  we have to cinfiger axios
// we have to outsource axios 
// make a util folder
    const getData = async()=>{
    setloading(true);
    try{
        const response = await axios.get("/recipes");
        const data = response.data
        console.log(response.data);
        setData(data.recipes)
        
        
    }catch(err){
      console.log(err);
      
    }finally{
      setloading(false)
    }
  
  } 
  useEffect(()=>{
    console.log("about.mounted....");
    getData()
    return()=>{
      console.log("abount unmounted......");
      
    }
    
  },[]) // this is for create NOW WHAT HAppNES IN UPDATE  -- means change in state USESTATE update = delete + create (A tha A haatke B aaya) {RERANDER} -- WE DONT NEED FULL COMPONENT RERENDER TO STOP IT WE SET A DEPENCENCY ARAY IN USE EFFECT  
  // WHICH WILL MAKE CHANGE IN ONLY THE CHANGED COMPONENT
  return (
    <div className='min-h-full bg-amber-100 w-full text-zinc-700'>
      <button onClick={getData}>get data</button>  // NOW THE THING  WE CLICK ON THIS BUTTON WE GET DATA I WANT WHEN WE OPEN APpLICATION WE GET DATA (useEffect)
      <div style={{ marginTop: "20px" }}>
        {loading ? "loading....." : data.map((recipe) => (
          <div key={recipe.id} style={{ marginBottom: "15px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
            <h3>{recipe.name}</h3>
            <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
            <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default about
