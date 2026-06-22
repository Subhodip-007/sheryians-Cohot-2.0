import React from 'react'

const card = (props) => {
 
    
    
  return (
     <div
              key={props.idx}
              className="rounded-2xl bg-white p-4 shadow"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4">
                    <i className="ri-delete-bin-line"onClick={() => props.handledelete(props.idx)}></i>
                {/* Profile Image */}
                <div
                  className="h-16 w-16 rounded-full bg-cover bg-center shrink-0 bg-gray-300"
                  style={{
                    backgroundImage: `url(${props.elem.url})`
                  }}
                ></div>

                {/* User Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-xl font-bold">
                    {props.elem.Name}
                  </h2>

                  <p className="text-gray-600">
                    {props.elem.Description}
                  </p>
                </div>

                {/* Role Badge */}
                <div className="bg-yellow-300 rounded-2xl px-4 py-2 uppercase text-sm font-medium">
                  {props.elem.Role}
                </div>

              </div>
            </div>
  )
}

export default card
