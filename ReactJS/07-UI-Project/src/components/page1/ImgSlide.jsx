import React from 'react'

const ImgSlide = (props) => {
    return (
    
            <div className="w-2/6 h-full rounded-4xl px-8 py-8 bg-cover bg-center flex justify-between flex-col shrink-0"
                style={{
                    backgroundImage:
                        `url(${props.src})`,
                }}
            >
                <h1 className='h-9.5 w-9.5 px-1 py-1 rounded-full bg-amber-100 text-center text-xl'>{props.id}</h1>
                <div>
                    <p>{props.intro}</p>
                    <button className="relative flex items-center h-10 bg-[#4F6CF7] rounded-full text-white pl-4 pr-2">
                        <span className="text-sm font-medium">{props.tag}</span>

                        <div className="absolute right-8 w-4 h-4 rounded-full bg-white"></div>

                        <div className="ml-5 w-7 h-7 rounded-full bg-[#5E7BFF] flex items-center justify-center">
                            <span>→</span>
                        </div>
                    </button>
                </div>
            </div>
        
    )
}

export default ImgSlide