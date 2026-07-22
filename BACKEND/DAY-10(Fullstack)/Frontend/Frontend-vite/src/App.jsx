import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react'

const App = () => {
  const [data, setdata] = useState([])
 async function getData(){
    const response = await axios.get("http://localhost:3000/api/home/task/fetch")
    console.log(response);
    setdata(response.data.fetcheddata)
    
  }
  function submitHandle(e){
    e.preventDefault();
    let {title,desc} = e.target.elements;
    axios.post("http://localhost:3000/api/home/task/create",{
      Title : title.value,
      Description : desc.value
    })
    .then((res)=>{
      console.log(res.data);
       getData()
    })
      title.value = "";
  desc.value = "";
 
  }
  function deleteHandle(Id){
    axios.delete('http://localhost:3000/api/home/task/delete/' + Id)
    .then((res)=>{
      console.log(res.data);
      getData()
    })
    console.log(Id);
    
  }
//   async function submitHandle(e) {
//   e.preventDefault();

//   const { title, desc } = e.target.elements;

//   try {
//     const res = await axios.post(
//       "http://localhost:3000/api/home",
//       {
//         Title: title.value,
//         Description: desc.value,
//       }
//     );

//     console.log(res.data);

//     getData();

//     e.target.reset();
//   } catch (err) {
//     console.log(err);
//   }
// }
// {data: {…}, status: 200, statusText: 'OK', headers: AxiosHeaders$1, config: {…}, …}
// config
// : 
// {transitional: {…}, adapter: Array(3), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
// data
// : 
// fetcheddata
// : 
// Array(7)
// 0
// : 
// {_id: '6a526686dcf13a1aabfc4503', Title: 'Title 125', Description: ' test descp-1', __v: 0}
// 1
// : 
// {_id: '6a528f95fe6115c9a90b935f', Title: 'Title 25', Description: ' test descp-1', __v: 0}
// 2
// : 
// {_id: '6a528f9afe6115c9a90b9360', Title: 'Title 5', Description: ' test descp-1', __v: 0}
// 3
// : 
// {_id: '6a528fa2fe6115c9a90b9361', Title: 'Title 109', Description: ' test descp-1', __v: 0}
// 4
// : 
// {_id: '6a528fa7fe6115c9a90b9362', Title: 'Title 1004', Description: ' test descp-1', __v: 0}
// 5
// : 
// {_id: '6a52995c5357c03db465bcc5', Title: 'Title 2023', Description: 'SUBHODIP', __v: 0}
// 6
// : 
// {_id: '6a5508cd8132fae61dc44acd', Title: 'task-69', Description: 'created through frontend', __v: 0}
// length
// : 
// 7
// [[Prototype]]
// : 
// Array(0)
// message
// : 
// "data successful fetched"
// [[Prototype]]
// : 
// Object
// headers
// : 
// AxiosHeaders$1 {content-length: '707', content-type: 'application/json; charset=utf-8'}
// request
// : 
// XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
// status
// : 
// 200
// statusText
// : 
// "OK"
// [[Prototype]]
// : 
// Object

  useEffect(()=>{
    getData();
  },[])
  return (
    <div className="h-screen w-full bg-zinc-800 p-8 ">
      <form action="" onSubmit={submitHandle} className="note-create-form">
        <input name="title" type="text" className='px-4 py-2 rounded-2xl bg-amber-200 text-b' placeholder="enter Task-Title" />
        <input name="desc" type="text" className='px-4 py-2 rounded-2xl bg-amber-200 text-b' placeholder=" enter description..." />
        <button className='px-4 py-2 rounded-2xl bg-amber-500 text-b'>Create Note</button>
      </form>
      <div className="h-full w-full bg-amber-400 rounded-3xl p-4 flex gap-1 flex-wrap">
     { data.map((elem,idx)=>{
      return(
           <div key={idx} className=' h-60 w-40 rounded-2xl bg-amber-800 font-mono p-2'>
          <h1 className="p-2 rounded-2xl bg-amber-500">{elem.Title}</h1>
          <p className="whitespace-pre-wrap break-words">{elem.Description}
          </p>
            <button onClick={()=>{deleteHandle(elem._id)}} className='px-4 py-2 rounded-2xl bg-red-800'>Delete</button>
        </div>
      )
     })}
      </div>
    </div>
  )
}

export default App 
