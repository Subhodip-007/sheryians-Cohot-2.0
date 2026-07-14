import React from 'react'
import { distance2D, motion } from "framer-motion";
import { style } from 'framer-motion/client';
import axios from 'axios';

const Cards = ({data,reff, fetchData }) => {
  
  console.log(data);

  async function deleteHandle(Id){
    await axios.delete('http://localhost:3000/api/home' + Id)
    .then((res)=>{
      console.log(res.data);
      fetchData()
    })
    console.log(Id);
    
  }
    
  return (
  
    <motion.div
  drag
  dragConstraints={reff}
  className=" min-h-52 max-h-60 w-52 rounded-2xl bg-white shadow-lg p-5 flex flex-col gap-4"
>
  {/* Task Title */}
  <h2 className="text-xl font-bold">
    {data.title}
  </h2>

  {/* Task Description */}
  <p className="text-gray-600 break-words">
    {data.description}
  </p>

  {/* Delete Button */}
  <button
    onClick={() => deleteHandle(data._id)}

    className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
  >
    Delete
  </button>
</motion.div>
  )
}

export default Cards
