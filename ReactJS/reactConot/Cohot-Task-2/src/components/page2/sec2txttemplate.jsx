import React from 'react'

const sec2txttemplate = (props) => {
  return (
        <div className="w-[280px]">
      <h1 className="font-['Playfair_Display',serif] text-6xl mb-5">
        {props.value}
      </h1>
      <p>{props.title}</p>
    </div>
  )
}

export default sec2txttemplate