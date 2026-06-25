import React from 'react'

const card = (props) => {
  console.log(props.idx);
  
    
  return (
   <div
  className="w-[280px] min-h-[300px] rounded-xl p-3 "
  style={{ backgroundColor:props.data.colorset.card }}
>
 <div className='flex justify-between'>
     <h1
    className="text-2xl font-semibold capitalize p-2 rounded-2xl  text-center w-full"
    style={{ backgroundColor: props.data.colorset.header }}
  >
    {props.data.heading}
   
  </h1>
   <i onClick={props.deletion} className="ri-close-fill text-4xl text-red-600 font-bold cursor-pointer" ></i>
 </div>

  <p className='break-words whitespace-pre-wrap'>{props.data.description}</p>
</div>
  )
}

export default card
