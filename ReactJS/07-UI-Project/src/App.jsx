import React from 'react'
import Page1 from './components/page1/page1';
import Page2 from './components/page2/Page2';
const data = [
  {
    img: "https://i.pinimg.com/736x/7e/88/1d/7e881d16755ac721d5287ccc4605a37c.jpg",
    intro: "Welcome to our platform. Discover amazing features.",
    tag: "Technology"
  },
  {
    img: "https://i.pinimg.com/1200x/3b/35/b1/3b35b1c46d4d2da76518e1fdae8c0d7d.jpg",
    intro: "Learn new skills and grow your career.",
    tag: "Education"
  },
  {
    img: "https://i.pinimg.com/1200x/7c/06/80/7c0680652035f09e9b1da8e32685d092.jpg",
    intro: "Explore beautiful destinations around the world.",
    tag: "Travel"
  },
    {
    img: "https://i.pinimg.com/1200x/7b/eb/8e/7beb8e04b931495e46089433d20ae78c.jpg",
    intro: "Learn new skills and grow your career.",
    tag: "Education"
  },
  {
    img: "https://i.pinimg.com/736x/0d/4b/96/0d4b9651e840d6ed4cf866db5f4ebc32.jpg",
    intro: "Explore beautiful destinations around the world.",
    tag: "Travel"
  },
  {
    img: "https://i.pinimg.com/1200x/b6/ed/01/b6ed01a125f6221382cac470581ef247.jpg",
    intro: "Stay updated with the latest trends and news.",
    tag: "News"
  },
  {
    img: "https://i.pinimg.com/1200x/6b/53/ec/6b53ec3f2831e46b0f769ab0c6cd8f09.jpg",
    intro: "Build healthy habits for a better lifestyle.",
    tag: "Health"
  },
  {
    img: "https://example.com/image6.jpg",
    intro: "Master modern web development techniques.",
    tag: "Programming"
  },
  {
    img: "https://example.com/image7.jpg",
    intro: "Get inspired by creative designs and ideas.",
    tag: "Design"
  },
  {
    img: "https://example.com/image8.jpg",
    intro: "Manage your finances and achieve your goals.",
    tag: "Finance"
  }
];
const App = () => {
  return (
    <div >
      <Page1 user={data}/>
    
    </div>
  )
}

export default App
// all data will stey in app 
// child-child props drilling
