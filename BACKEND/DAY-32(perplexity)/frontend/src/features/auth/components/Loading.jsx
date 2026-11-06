import React from 'react'

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950 font-sans p-4">
      <div className="text-center max-w-sm">
        <img 
          src="https://tenor.com" 
          alt="Loading Cat" 
          className="rounded-xl shadow-2xl w-full object-cover mb-6"
        />
        <p className="text-xl font-medium text-zinc-200 tracking-wide animate-pulse">
          
        </p>
      </div>
    </div>
  )
}

export default Loading
