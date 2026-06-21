import React from 'react'
import Button from './button';
import Profile from './profile';

const card = (props) => {
  return (
    <div className=" relative h-100 w-75 bg-amber-50 rounded-4xl overflow-hidden">
            <div className='w-[95%] h-[100px] bg-amber-50 rounded-3xl px-1.5 py-1.5 flex items-start justify-end mt-2 ml-2' style={{ backgroundImage: `url(${props.coverimg})`}}>
                <Button />
            </div>
         <Profile img={props.profile}/>
         <div className=' w-full  mt-8 py-4 px-4'>
            <h1>{props.name}</h1>
            <p> {props.descrp}</p>
         </div>
     


         <div className=' flex items-center justify-between py-8 px-3 bg-neutral-200 rounded-2xl m-2'>
            <div className=''>
                <h1>{props.followers}</h1>
                <p>followres</p>
            </div>
                        <div className=''>
                <h1>{props.posts}</h1>
                <p>Posts</p>
            </div>
            <div className=''>
                <h1>{props.network}</h1>
                <p>Network</p>
            </div>

         </div>
        <div className='w-full flex item-center justify-between px-6 text-1xl bg-gray-400 pb-10 pt-1'>
            <i className="ri-instagram-line"></i>
        <i className="ri-flutter-line"></i> 
        <i className="ri-chat-smile-ai-3-line"></i>
        </div>

        </div>
  )
}

export default card
