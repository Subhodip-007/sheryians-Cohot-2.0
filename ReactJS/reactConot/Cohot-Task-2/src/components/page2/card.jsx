import React from 'react'

const card = (props) => {
  return (
  <div
  className="h-[400px] w-[520px] rounded-3xl bg-cover bg-center"
  style={{ backgroundImage: `url(${props.src})` }}
></div>
  )
}

export default card