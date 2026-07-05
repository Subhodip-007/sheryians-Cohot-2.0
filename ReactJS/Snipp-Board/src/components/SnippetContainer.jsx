import React from 'react'
import SnippetCard from './SnippetCard';

const SnippetContainer = ({alldata, deleteSnippet,copySnippet,editSnippet}) => {
  return (
    <div className='mt-20 z-[3] h-full w-full fixed flex flex-wrap p-5 gap-4  '>
      {alldata.map((elem,idx)=>{
        return(
          <SnippetCard key={idx} data={elem} deleteSnippet={deleteSnippet} copySnippet={copySnippet} editSnippet={editSnippet} />
        )
      })}
      
    </div>
  )
}

export default SnippetContainer
