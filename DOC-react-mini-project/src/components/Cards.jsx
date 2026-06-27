import React from 'react'
import { distance2D, motion } from "framer-motion";
import { style } from 'framer-motion/client';
const Cards = ({data,reff}) => {
    console.log(data);
  return (
    
    
    <motion.div drag dragConstraints={reff} className="font-mono min-w-[200px] min-h-[200px] max-h-[300px] max-w-[200px] bg-zinc-100 rounded-4xl overflow-hidden flex flex-col">
    
    {/* Top Content Area - flex-1 makes this take up all available space */}
    <div className="p-5 flex-1 flex flex-col justify-between">
        
       
        <div>
            <div><i className="ri-attachment-line"></i></div>
            <p className="break-all mt-2">
                {data.desc}
            </p>
        </div>

    
        <div className='flex justify-between items-center mt-4'>
            <h5>{data.filesize}</h5>
            <div className="w-7 h-7 bg-zinc-900 rounded-full flex items-center justify-center text-white">
                {data.close ? <i class="ri-close-line"></i> : <i className="ri-arrow-down-line text-amber-50"></i>}
               
            </div>
        </div>
    </div>
    <div
  className={`footer bg-amber-700 w-full h-10 justify-center items-center ${
    data.tag.isOpen ? 'flex' : 'hidden'
  }` }style={{backgroundColor:data.tag.tagColor}}
>
  {data.tag.tagTitle}
</div>
   
    

</motion.div>
  )
}

export default Cards
