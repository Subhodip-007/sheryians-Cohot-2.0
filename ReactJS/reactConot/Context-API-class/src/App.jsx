// import axios from 'axios';
import React, { use, useState } from 'react'
import Navbar from './components/Navbar';
// import Allsections from './components/Allsections';
// import Footer from './components/footer';

const App = () => {
  const [getdata, setGetdata] = useState('')
  const backward=(caught)=>{
    setGetdata(caught);
  }
  const coursedata={
    name:"cohot2",
    instructor:"shartakh",
    duration:"6 months"

  };
  // const getdata= async ()=>{
  //   const res= await axios.get('http://localhost:8000/data');
  //   console.log(res);
    
  // }
  return (
<div className='h-screen w-full bg-black'>
    <h1>{getdata}</h1>
      <Navbar backward={backward} />
   {/* <Allsections coursedata={coursedata}  />
   <Footer /> */}
</div>
  )
}

export default App
