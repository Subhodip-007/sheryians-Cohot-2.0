import React from 'react'
import Card from './components/card';
const jobs = [
  {
    src: "https://i.pinimg.com/736x/1f/39/a3/1f39a3d17bcfdfc3003fedd5263229c8.jpg",
    postName: "Google",
    jobRole: "Software Engineer",
    contractRole: "FullTime",
    ranking: "L3",
  },
  {
    src: "https://i.pinimg.com/736x/1f/39/a3/1f39a3d17bcfdfc3003fedd5263229c8.jpg",
    postName: "Microsoft",
    jobRole: "Frontend Developer",
    contractRole: "FullTime",
    ranking: "SDE1",
  },
  {
    src: "https://i.pinimg.com/736x/1f/39/a3/1f39a3d17bcfdfc3003fedd5263229c8.jpg",
    postName: "Meta",
    jobRole: "Backend Engineer",
    contractRole: "FullTime",
    ranking: "E3",
  },
  {
    src: "https://i.pinimg.com/736x/1f/39/a3/1f39a3d17bcfdfc3003fedd5263229c8.jpg",
    postName: "Netflix",
    jobRole: "Platform Engineer",
    contractRole: "FullTime",
    ranking: "L4",
  },
  {
    src: "https://i.pinimg.com/736x/1f/39/a3/1f39a3d17bcfdfc3003fedd5263229c8.jpg",
    postName: "Adobe",
    jobRole: "React Developer",
    contractRole: "Internship",
    ranking: "Intern",
  },
  {
    src: "https://i.pinimg.com/736x/1f/39/a3/1f39a3d17bcfdfc3003fedd5263229c8.jpg",
    postName: "Uber",
    jobRole: "Full Stack Developer",
    contractRole: "FullTime",
    ranking: "SDE2",
  },
  {
    src: "https://i.pinimg.com/736x/1f/39/a3/1f39a3d17bcfdfc3003fedd5263229c8.jpg",
    postName: "Airbnb",
    jobRole: "Frontend Engineer",
    contractRole: "Contract",
    ranking: "L2",
  },
  {
    src: "https://i.pinimg.com/736x/1f/39/a3/1f39a3d17bcfdfc3003fedd5263229c8.jpg",
    postName: "Spotify",
    jobRole: "Data Engineer",
    contractRole: "FullTime",
    ranking: "Associate",
  },
  {
    src: "https://i.pinimg.com/736x/1f/39/a3/1f39a3d17bcfdfc3003fedd5263229c8.jpg",
    postName: "LinkedIn",
    jobRole: "Machine Learning Engineer",
    contractRole: "FullTime",
    ranking: "SDE1",
  },
  {
    src: "https://i.pinimg.com/736x/1f/39/a3/1f39a3d17bcfdfc3003fedd5263229c8.jpg",
    postName: "Salesforce",
    jobRole: "Cloud Engineer",
    contractRole: "Hybrid",
    ranking: "Associate",
  },
];

const App = () => {
  return (
    <div className="container"> 
    <Card src="https://i.pinimg.com/736x/1f/39/a3/1f39a3d17bcfdfc3003fedd5263229c8.jpg" postName="Amazon" jobRole="Backend wd DevOPS" contractRole="FullTime" ranking="SDE1" />
       {jobs.map((elem,idx)=>{
        return <Card key={idx}src={elem.src} postName={elem.postName} jobRole={elem.jobRole} contractRole={elem.contractRole} ranking={elem.ranking}/>
       })}
    </div>
    
  )
}

export default App