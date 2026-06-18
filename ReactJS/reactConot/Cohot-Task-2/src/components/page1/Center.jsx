import React from 'react'
import Textcont from './Textcont';
import FooterNav from './footerNav'

const Center = () => {
  return (
    <div className="w-full px-8 py-8 rounded-2xl h-[80vh] bg-[url('https://i.pinimg.com/1200x/ec/33/40/ec334048c56d2cfbbdcd7e04de2a3094.jpg')] bg-cover bg-center flex flex-col items-center justify-between mt-20 ">
      <Textcont/>
      <FooterNav />
</div>
  )
}

export default Center