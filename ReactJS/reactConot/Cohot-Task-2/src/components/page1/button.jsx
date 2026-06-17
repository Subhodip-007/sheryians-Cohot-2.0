import React from 'react'

const button = (props) => {
  return (
      <button className=" px-4 py-2 rounded-full bg-gray-800 text-amber-50 ">
    <h1>{props.name}</h1>
  </button>
  )
}

export default button
