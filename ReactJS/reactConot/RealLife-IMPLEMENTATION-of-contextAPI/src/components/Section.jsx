import React, { useContext } from 'react'
import Section1 from './Section1';
import Section2 from './Section2';
import { ThemeDataContext } from '../context/ThemeContext';

const  Section = () => {
   const [Theme,setTheme] = useContext(ThemeDataContext)
  return (
    <div className='section w-full h- bg-amber-200 flex justify-between p-4'>
<Section1 />
<Section2 />
{Theme}
</div>
  )
}

export default  Section