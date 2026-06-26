import React from 'react'
import { useParams } from 'react-router-dom';

const aboutdynamic = () => {
   const recive= useParams()
   console.log(recive.id);
   
  return (
    <div>
      dynamic page result "{recive.id}" not found
    </div>
  )
}

export default aboutdynamic
