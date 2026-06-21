import React from 'react'
import Button from './button';
import Profile from './profile';
import Card from './card';

const cardcont = (props) => {
    console.log(props.data[0].name);
        
    
  return (
    <div className='min-h-screen w-full px-16 py-16 bg-amber-300 rounded-4xl flex flex-wrap gap-4'>
        {props.data.map((elem, index) => (
  <Card
    key={index}
    profile={elem.profile}
    coverimg={elem.coverimg}
    name={elem.name}
    descrp={elem.descrp}
    followers={elem.followers}
    posts={elem.posts}
    network={elem.network}
  />
))}
       
    </div>
  )
}

export default cardcont