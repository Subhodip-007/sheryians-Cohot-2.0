import React from 'react'
import Sec1 from './Sec1';
import Sec2 from './Sec2';

const Allsections = (props) => {
  console.log();
  
  return (
   <div>
    Allsections
     <Sec1 />
    <Sec2 coursedata={props.coursedata} />
   </div>
  )
}

export default Allsections