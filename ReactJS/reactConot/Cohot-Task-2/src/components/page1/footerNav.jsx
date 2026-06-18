import React from 'react'
import 'remixicon/fonts/remixicon.css'

const footerNav = () => {
    return (
        <div className="w-full flex justify-between items-center py-4 ">
            <div className='flex gap-4'>
                <h1 className=" text-gray-100  font-medium">
                    Train with real heros & <br />
                    get real results...
                </h1>
                <div className=" px-4 py-2 rounded-full bg-gray-800 text-amber-50 "><i className="ri-user-line"></i></div>
            </div>


            <div className="flex gap-8  text-gray-100">
                <a className="  border-b border-transparent hover:border-gray-100 transition-all duration-300" href="">Instagram <i className="ri-arrow-right-up-line"></i></a>
                <a className=" border-b border-transparent hover:border-gray-100 transition-all duration-300" href="">FaceBook <i className="ri-arrow-right-up-line"></i></a>
                <a className="  border-b border-transparent hover:border-gray-100 transition-all duration-300" href="">Reddit <i className="ri-arrow-right-up-line"></i></a>

            </div>

        </div>
    )
}

export default footerNav