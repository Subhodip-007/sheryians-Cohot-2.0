import React from 'react'
import MatrixText from "./MatrixText";
import axios from 'axios';
const InputForm = ({fetchData , setShow}) => {
      async function createdata({title,description}){
      await axios.post('http://localhost:3000/api/home',{
      title,description
    })
        .then((res)=>{
      console.log(res.data);
      fetchData(); 
      setShow(false);
    })

    }
    function submitHandler(e){
        e.preventDefault();
        let obj={
          title:e.target.title.value,
          description:e.target.description.value
        }
        createdata(obj);
             e.target.title.value = "";
              e.target.description.value = ""
      
         
    }

  return (
    <div className='absolute top-1/2 left-1/2 bg-amber-300 h-105 w-150 rounded-2xl z-995 -translate-x-1/2 -translate-y-1/2 backdrop-blur-2xl'>
   <form onSubmit={submitHandler}  className="flex flex-col gap-4 w-80">

      <MatrixText
        as="input"
        text="Enter title..."
        name="title"
        className="border p-3 rounded-lg bg-zinc-900 text-white"
      />

      <MatrixText
        as="textarea"
        text="Write your message..."
        name="description"
        rows={5}
        className="border p-3 rounded-lg bg-zinc-900 text-white"
      />

    
        <button   type="submit" className='bg-green-600 text-white p-3 rounded-lg'>Add</button>
       
     

    </form>
    </div>
  )
}

export default InputForm
