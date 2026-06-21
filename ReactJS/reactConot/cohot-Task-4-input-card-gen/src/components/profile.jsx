import React from 'react'

const profile = (props) => {
 
  
  return (
     <div className="h-[80px] w-[80px] rounded-full bg-amber-300 absolute top-[15%] left-[8%] bg-center bg-cover" style={{ backgroundImage: `url(${props.img})`}}></div>
  )
}

export default profile