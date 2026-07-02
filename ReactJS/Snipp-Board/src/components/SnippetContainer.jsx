import React from 'react'
import SnippetCard from './SnippetCard';

const SnippetContainer = ({alldata}) => {
  return (
    <div className='mt-15 z-[3] h-full w-full fixed flex flex-wrap p-5 gap-4  '>
      {alldata.map((elem,idx)=>{
        return(
          <SnippetCard key={idx} data={elem} />
        )
      })}
      
    </div>
  )
}

export default SnippetContainer
