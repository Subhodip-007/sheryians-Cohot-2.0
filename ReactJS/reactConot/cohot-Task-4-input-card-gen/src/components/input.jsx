import React from 'react'
import { useState } from 'react';


const input = () => {
            let [name, setName] = useState('');
        let [descp, setDescp] = useState('');
        let [Follower, setFollower] = useState('');
        let [Posts, setPosts] = useState('');
        let [Network, setNetwork] = useState('');
         const [list, setlist] = useState([])
    const submitHandler=(e)=>{
        e.preventDefault();
        setName('');
        setDescp('');
        setFollower('');
        setPosts('');
        setNetwork('');
        if (!name.trim()) return; console.log("form submitted by ",name) ;
        let obj={Name:name,decription:descp,Follower:Follower,Posts:Posts,Network:Network};
         const dstrucarr=[...list]; dstrucarr.push(obj); setlist(dstrucarr); console.log(dstrucarr)
    }
  return (
    <div className="flex flex-col gap-4 p-8 items-center justify-center bg-gray-700 rounded-2xl">
             <h1> Enter details</h1>   
      <form onSubmit={submitHandler} action="">
        <div className="flex gap-4  items-center justify-between">  
        <label> Name:</label>
        <input value={name} onChange={(e)=>{setName(e.target.value)
        }} className='p-4 rounded-2xl border bg-amber-50' type="text" placeholder="Enter Name" />
        </div>
        <div className="flex gap-4 items-center justify-between">        
        <label> Description:</label>
        <input value={descp} onChange={(e)=>{setDescp(e.target.value)
        }} className='p-4 rounded-2xl border bg-amber-50' type="text" placeholder="Enter in Detail" />
        </div>
        <div className="flex gap-4 items-center justify-between">        
        <label> Followers:</label>
        <input value={Follower} onChange={(e)=>{setFollower(e.target.value)
        }} className='p-4 rounded-2xl border bg-amber-50' type="text" placeholder="Enter count" />
        </div>
        <div className="flex gap-4 items-center justify-between">        
        <label> posts:</label>
        <input value={Posts} onChange={(e)=>{setPosts(e.target.value)
        }} className='p-4 rounded-2xl border bg-amber-50' type="text" placeholder="Enter count" />
        </div>
        <div className="flex gap-4 items-center justify-between">        
        <label> Network:</label>
        <input value={Network} onChange={(e)=>{setNetwork(e.target.value)
        }} className='p-4 rounded-2xl border bg-amber-50' type="text" placeholder="Enter count" />
        </div>
        <button className='p-4 rounded-2xl border bg-amber-50 w-50' type='submit'>submit</button>
      </form>
    </div>
  )
}

export default input
