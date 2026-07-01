import React from 'react'

const BackGroundCont = () => {
  return (
     <div className='z-[2] fixed h-screen w-full bg-zinc-800 selection:text-amber-500'>
      <div className=' absolute top-[5%] py-10 w-full flex justify-center text-zinc-700 text-3xl font-mono capitalize '>Make-it-simple</div>
      <h1 className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tracking-tight text-[8vw] font-mono font-extrabold text-zinc-900">
  DOCs
</h1>
    </div>
  )
}

export default BackGroundCont
