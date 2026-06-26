import React from 'react'

const cards = ({data}) => {
  
  
  return (
    <div>
        <div className='h-80 w-80 bg-amber-300 rounded-2xl border-4 text-amber-600 overflow-hidden' >
        <img className='h-full w-full bg-center bg-cover' src={data.download_url} alt="NOT avil" />
      </div>
    </div>
  )
}

export default cards
