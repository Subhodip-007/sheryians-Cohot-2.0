import React from 'react'
import Sec2txttemplate from './sec2txttemplate';

const tsec2extcont = () => {
    return (
   <div className="flex flex-col items-center gap-10 w-full text-center text-gray-800 mt-30 bg-amber-50 py-16">
  <h1 className="w-full md:w-[60%] lg:w-[40%] text-xl font-semibold capitalize">
    The visual top section of a page, thousands of high-quality header
    images, and text titles used to organize content.
  </h1>

  <div className="w-full flex flex-wrap justify-center gap-10 px-6">
    < Sec2txttemplate value=" Debonair" title="Confident, stylish, charming, and well-groomed."/>
        < Sec2txttemplate value=" Idyllic" title="Extremely peaceful, picturesque, and perfect."/>
          < Sec2txttemplate value="Quaint" title="Attractively unusual, old-fashioned, and charming."/>
              < Sec2txttemplate value=" Snazzy" title="Stylish, modern, and visually impressive."/>
  </div>
   <hr className=' mt-25 text-gray-600 w-full' />
</div>
    )
}

export default tsec2extcont