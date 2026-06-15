import React from 'react'

import ImgSlide from './ImgSlide';

const ImgCont = (props) => {
    console.log(props.user)
    return (
        <div className='h-full w-fit  flex gap-8 items-center overflow-auto'>
            {props.user.map((elem,idx)=>{
                return <ImgSlide  id={idx+1} key={idx} intro={elem.intro} src={elem.img} tag={elem.tag}/>
            })}
        </div>
    )
}

export default ImgCont