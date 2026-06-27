import React, { useRef } from 'react'
import Cards from './Cards'

const data = [
  {
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    filesize: ".9mb",
    close: true,
    tag: {
      isOpen: true,
      tagTitle: "Download Now",
      tagColor: "green",
    },
  },

  {
    desc: "React notes and documentation for beginners.",
    filesize: "1.2mb",
    close: false,
    tag: {
      isOpen: true,
      tagTitle: "Read More",
      tagColor: "blue",
    },
  },

  {
    desc: "Complete JavaScript interview questions PDF.",
    filesize: "2.4mb",
    close: true,
    tag: {
      isOpen: true,
      tagTitle: "Download",
      tagColor: "purple",
    },
  },

  {
    desc: "Frontend roadmap and learning resources.",
    filesize: "3.1mb",
    close: false,
    tag: {
      isOpen: false,
      tagTitle: "Unavailable",
      tagColor: "red",
    },
  },

  {
    desc: "Advanced CSS animations with GSAP examples.",
    filesize: "4.5mb",
    close: true,
    tag: {
      isOpen: true,
      tagTitle: "Explore",
      tagColor: "orange",
    },
  },
];
const Overlay = () => {
  const ref= useRef(null)
  return (
          <div ref={ref} className=' z-[3] h-full w-full fixed flex flex-wrap p-5 gap-4 '>
            {data.map((elem,idx)=>{
              return <Cards key={idx} data={elem} reff={ref}/>
            })}
            
      </div>
  )
}

export default Overlay
