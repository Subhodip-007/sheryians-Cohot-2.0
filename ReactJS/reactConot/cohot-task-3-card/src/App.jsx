import React from 'react'
import Cardcont from './components/cardcont';
const users = [
  {
    profile: "https://i.pinimg.com/736x/3d/fc/b8/3dfcb8a435aa62d46095d97f14fc6382.jpg",
    coverimg: "https://i.pinimg.com/1200x/9d/20/ed/9d20ed70246d7b07b63e2ca2b140f586.jpg",
    name: "Subhodip",
    descrp: "I am a DevOps + Backend Developer",
    followers: "7.08k",
    posts: "504",
    network: "219+"
  },
  {
    profile: "https://randomuser.me/api/portraits/men/11.jpg",
    coverimg: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    name: "Rahul",
    descrp: "Frontend React Developer",
    followers: "5.2k",
    posts: "312",
    network: "180+"
  },
  {
    profile: "https://randomuser.me/api/portraits/women/12.jpg",
    coverimg: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    name: "Ananya",
    descrp: "UI/UX Designer",
    followers: "8.4k",
    posts: "678",
    network: "450+"
  },
  {
    profile: "https://randomuser.me/api/portraits/men/13.jpg",
    coverimg: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    name: "Arjun",
    descrp: "Full Stack JavaScript Developer",
    followers: "6.1k",
    posts: "420",
    network: "300+"
  },
  {
    profile: "https://randomuser.me/api/portraits/women/14.jpg",
    coverimg: "https://images.unsplash.com/photo-1516321497487-e288fb19713f",
    name: "Priya",
    descrp: "Data Scientist & AI Enthusiast",
    followers: "9.7k",
    posts: "890",
    network: "520+"
  },
  {
    profile: "https://randomuser.me/api/portraits/men/15.jpg",
    coverimg: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    name: "Sourav",
    descrp: "Cloud Engineer",
    followers: "4.9k",
    posts: "275",
    network: "165+"
  },
  {
    profile: "https://randomuser.me/api/portraits/women/16.jpg",
    coverimg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    name: "Sneha",
    descrp: "Backend Developer with Node.js",
    followers: "3.8k",
    posts: "210",
    network: "140+"
  },
  {
    profile: "https://randomuser.me/api/portraits/men/17.jpg",
    coverimg: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    name: "Ritwik",
    descrp: "Cybersecurity Researcher",
    followers: "10.2k",
    posts: "940",
    network: "610+"
  },
  {
    profile: "https://randomuser.me/api/portraits/women/18.jpg",
    coverimg: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    name: "Moumita",
    descrp: "Mobile App Developer",
    followers: "7.5k",
    posts: "530",
    network: "280+"
  },
  {
    profile: "https://randomuser.me/api/portraits/men/19.jpg",
    coverimg: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    name: "Amit",
    descrp: "Machine Learning Engineer",
    followers: "12.1k",
    posts: "1100",
    network: "720+"
  }
];
const App = () => {
  
  return (
    <div className='h-screen w-full bg-amber-50 px-8 py-8 '>

      <Cardcont data={users}/>
    </div>
  )
}

export default App