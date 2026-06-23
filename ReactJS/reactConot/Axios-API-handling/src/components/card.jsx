import React from 'react'

const card = (props) => {
    console.log(props.data.url);
    
    const clr1=Math.floor(Math.random()*256);
    const clr2=Math.floor(Math.random()*256);
    const clr3=Math.floor(Math.random()*256);
  return (
    <div className='h-100 w-75 rounded-2xl w-2 p-8' style={{backgroundColor:`rgb(${clr1},${clr2},${clr3})`}}>
      <div className="h-full w-full" style={{ backgroundImage: `url(${props.data.url})`}}>{props.data.id}</div>
    </div>
  )
}

export default card ;
