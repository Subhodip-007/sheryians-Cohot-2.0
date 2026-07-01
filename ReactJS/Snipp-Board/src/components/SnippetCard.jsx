import React from 'react'

const SnippetCard = () => {
  return (
    // motion.div drag dragConstraints={reff}
<div className="font-mono min-w-[200px] min-h-[200px] max-h-[300px] max-w-[200px] bg-zinc-100 rounded-4xl overflow-hidden flex flex-col">

  {/* Top Content Area */}
  <div className="p-5 flex-1 flex flex-col justify-between">

    {/* Language + Title */}
    <div>
      <div className="flex items-center justify-between">
        <span className="text-xs px-2 py-1 rounded-full bg-zinc-200 text-zinc-700">
          JavaScript
        </span>

        <i className="ri-file-copy-line text-lg cursor-pointer"></i>
      </div>

      <h3 className="font-bold text-base mt-3 text-zinc-900">
        Debounce Function
      </h3>

      <pre className="text-xs mt-3 overflow-hidden">
        <code>
{`const debounce = (fn, delay) => {
  let timer;
};`}
        </code>
      </pre>
    </div>

    {/* Bottom */}
    <div className="flex justify-between items-center mt-4">

      <div className="flex gap-1 flex-wrap">
        <span className="text-[10px] px-2 py-1 rounded-full bg-zinc-200">
          JS
        </span>

        <span className="text-[10px] px-2 py-1 rounded-full bg-zinc-200">
          Hooks
        </span>
      </div>

      <div className="w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center text-white">
        <i className="ri-star-fill text-sm"></i>
      </div>

    </div>

  </div>

</div>
// motion.div
  )
}

export default SnippetCard
