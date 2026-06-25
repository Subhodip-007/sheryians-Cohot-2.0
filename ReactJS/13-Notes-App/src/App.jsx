import React, { useState } from 'react'
import Card from './components/card';

const App = () => {
  const localdata=JSON.parse(localStorage.getItem('all-users')) || []
    const colors = [
  {
    card: "#FEF3C7", // light amber
    header: "#F59E0B", // rich amber
  },
  {
    card: "#DBEAFE", // light blue
    header: "#2563EB", // rich blue
  },
  {
    card: "#DCFCE7", // light green
    header: "#16A34A", // rich green
  },
  {
    card: "#FCE7F3", // light pink
    header: "#DB2777", // rich pink
  },
  {
    card: "#EDE9FE", // light purple
    header: "#7C3AED", // rich purple
  },
];
const deletion = (idx) => {
  let newallnotes = [...allnotes];

  newallnotes.splice(idx, 1);

  setAllnotes(newallnotes);
   localStorage.setItem(
    'all-users',
    JSON.stringify(newallnotes)
   )
};
  const [allnotes, setAllnotes] = useState(localdata)
    
  const submitHandler=(e)=>{
    if (!value.trim() || !valtext.trim()) return;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
        e.preventDefault()
         let valobj={
          heading:value,
          description:valtext,
          colorset:randomColor
        }
        let updatedallnotes=[...allnotes,valobj];
        
        setAllnotes(updatedallnotes)
        localStorage.setItem('all-users',JSON.stringify(updatedallnotes))
          
          setValtext('')
          setValue('')
      }
      const setValInp=(e)=>{
        setValue(e.target.value)
      }
      const setValtxt=(e)=>{
        setValtext(e.target.value)
      }
// two way binding 
const [value, setValue] = useState('');
const [valtext, setValtext] = useState('')
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center font-mono p-4 gap-10">

      <form 
      onSubmit={submitHandler}
        className=" h-fit
    flex flex-col
    bg-amber-50
    w-full
    sm:w-[90%]
    md:w-[70%]
    lg:w-1/2
    p-4
    gap-4
    rounded-xl
    mx-auto
  "
      >
        <input
        onChange={setValInp}
          value={value}
          type="text"
          placeholder="Enter your title"
          className="border-b p-2 text-gray-500 outline-none"
        />

        <textarea
        onChange={setValtxt}
          value={valtext}
          placeholder="Enter your notes text"
          className="max-h-[100px] maxw-[280px] border-b p-2 text-gray-500 outline-none resize-none"
        ></textarea>

        <button
        type="submit"
        className=" active:scale-75 duration-300 px-4 py-2 bg-gray-500 rounded-2xl w-fit self-end text-amber-50">
          ADD
        </button>
      </form>
    <div className='w-full p-4 flex flex-wrap gap-4 '>
      {allnotes.map((elem,idx)=>(
        <Card idx={idx} key={idx} data={elem} deletion={deletion}/>
      ))}
       
      
    </div>
    </div>
   
  )
}

export default App
