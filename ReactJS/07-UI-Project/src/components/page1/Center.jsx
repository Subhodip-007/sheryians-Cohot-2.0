import React from 'react'
import LeftText from './LeftText';
import ImgCont from './Img-cont';

const Center = (props) => {
  return (
    <div className='flex gap-4 h-[90vh] py-10 px-9'>
        <LeftText/>
        <ImgCont user={props.user}/>
    </div>
  )
}

export default Center