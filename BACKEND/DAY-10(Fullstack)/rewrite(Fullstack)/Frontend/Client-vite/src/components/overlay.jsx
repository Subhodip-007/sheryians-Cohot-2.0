import React, { useEffect, useRef, useState } from 'react'
import Cards from './Cards'
import axios from 'axios';
import { div } from 'framer-motion/client';


// const data = [

//   {
//     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//     filesize: ".9mb",
//     close: true,
//     tag: {
//       isOpen: true,
//       tagTitle: "Download Now",
//       tagColor: "green",
//     },
//   },

//   {
//     desc: "React notes and documentation for beginners.",
//     filesize: "1.2mb",
//     close: false,
//     tag: {
//       isOpen: true,
//       tagTitle: "Read More",
//       tagColor: "blue",
//     },
//   },

//   {
//     desc: "Complete JavaScript interview questions PDF.",
//     filesize: "2.4mb",
//     close: true,
//     tag: {
//       isOpen: true,
//       tagTitle: "Download",
//       tagColor: "purple",
//     },
//   },

//   {
//     desc: "Frontend roadmap and learning resources.",
//     filesize: "3.1mb",
//     close: false,
//     tag: {
//       isOpen: false,
//       tagTitle: "Unavailable",
//       tagColor: "red",
//     },
//   },

//   {
//     desc: "Advanced CSS animations with GSAP examples.",
//     filesize: "4.5mb",
//     close: true,
//     tag: {
//       isOpen: true,
//       tagTitle: "Explore",
//       tagColor: "orange",
//     },
//   },
// ];

const Overlay = ({fetchedData,fetchData}) => {
 
  const ref= useRef(null)
  return (
  
          <div ref={ref} className=' z-[3] h-full w-full fixed flex flex-wrap p-5 gap-4 '>
           
             {fetchedData.map((item) => (
        <Cards key={item._id} data={item} fetchData={fetchData}   />
      ))}
            
      </div>
  )
}

export default Overlay
