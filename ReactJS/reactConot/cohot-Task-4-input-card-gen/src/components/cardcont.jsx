import React, { useState } from 'react'
import Button from './button';
import Profile from './profile';
import Card from './card';
import Input from './input';

const cardcont = () => {
   
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
    <div className='min-h-screen w-full'>
      <div className="">
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
      </div>
          <div className='min-h-screen w-full px-16 py-16 bg-amber-300 rounded-4xl flex flex-wrap gap-4'>

        {list.map((elem, index) => (
  <Card
                      key={index}
            name={elem.Name}
            descrp={elem.decription}
            followers={elem.Follower}
            posts={elem.Posts}
            network={elem.Network}
  />
))}
       
    </div>
    </div>

  )
}

export default cardcont