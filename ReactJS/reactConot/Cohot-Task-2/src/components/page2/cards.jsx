import React from 'react'
import Card from './card';

const cards = () => {
  return (
    <div className="w-full h-1/2 px-4 py-8 flex items-center gap-16 justify-center mt-15" >
        <Card src='https://i.pinimg.com/1200x/ee/44/b9/ee44b968448f81ce599cfe4242423f8c.jpg'/>
          <Card src='https://i.pinimg.com/1200x/90/2a/ed/902aed6bcd4862acf419812fca59c57c.jpg'/>
            <Card src='https://i.pinimg.com/1200x/50/f0/5e/50f05eda4fc47fd8cbe017d7aa36fb79.jpg'/>
    </div>
  )
}

export default cards