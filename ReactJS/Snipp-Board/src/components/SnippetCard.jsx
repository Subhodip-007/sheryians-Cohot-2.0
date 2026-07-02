import React, { useState } from 'react'
const SnippetCard = ({ data }) => {
  const [copy, setCopy] = useState(false)
const handleCopy =async () => {
   await navigator.clipboard.writeText(data.code);

  setCopy(true);

  setTimeout(() => {
 
    setCopy(false);
  }, 2000);
};
 
  console.log(data);

  return (
    // motion.div drag dragConstraints={reff}
    <div className="font-mono min-w-[200px] min-h-[200px] max-h-[300px] max-w-[200px] bg-zinc-100 rounded-4xl overflow-hidden flex flex-col">

      {/* Top Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">

        {/* Language + Title */}
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs px-2 py-1 rounded-full bg-zinc-200 text-zinc-700">
              {data.language}
            </span>

            <button  onClick={handleCopy}>
  {copy ? "Copied" : <i className="ri-file-copy-line text-lg"></i>}
  
</button>
          </div>

          <h3 className="font-bold text-base mt-3 text-zinc-900">
            {data.title}
          </h3>

          <pre className="text-xs mt-3 overflow-hidden">
            <code>
              {data.code}
            </code>
          </pre>
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-center mt-4">

          <div className="flex gap-1 flex-wrap">
            {data.tags.map((elem) => {
              return (<span className="text-[10px] px-2 py-1 rounded-full bg-zinc-200">
                {elem}
              </span>)
            })}


          </div>

          {!data.favorite ? null : <div className="w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center text-white">
            <i className="ri-star-fill text-sm"></i>
          </div>}

        </div>

      </div>

    </div>
    // motion.div
  )
}

export default SnippetCard
