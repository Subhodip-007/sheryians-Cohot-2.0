import React from 'react'
import Button from './button';
import Profile from './profile';

const cardcont = () => {
  return (
    <div className=' h-full w-full px-16 py-16 bg-amber-300 rounded-4xl'>
        <div className=" relative h-100 w-75 bg-amber-700 rounded-4xl px-2 py-2">
            <div className='w-full h-[100px] bg-amber-900 rounded-3xl px-1.5 py-1.5 flex items-start justify-end'>
                <Button />
            </div>
         <Profile />
         <div className=' w-full  mt-8 py-4 px-4'>
            <h1>subhodip</h1>
            <p> i am a wonderful frontend,Backend,cloud,DevOPS,guy can help u out with development</p>
         </div>
     


         <div className=' flex items-center justify-between py-4 px-3 bg-neutral-500 rounded-2xl'>
            <div className=''>
                <h1>79.6k</h1>
                <p>followres</p>
            </div>
                        <div className=''>
                <h1>79.6k</h1>
                <p>followres</p>
            </div>
            <div className=''>
                <h1>79.6k</h1>
                <p>followres</p>
            </div>

         </div>


        </div>
    </div>
  )
}

export default cardcont