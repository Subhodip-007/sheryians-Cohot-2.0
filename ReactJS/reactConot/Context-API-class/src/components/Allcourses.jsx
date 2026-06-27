import React from 'react'
import Course1 from './Course1';

const Allcourses = (props) => {
  return (
    <div>Allcourses
      <Course1 coursedata={props.coursedata} />
    </div>
  )
}

export default Allcourses