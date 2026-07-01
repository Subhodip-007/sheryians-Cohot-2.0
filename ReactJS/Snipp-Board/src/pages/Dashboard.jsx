import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import BackGroundCont from '../components/BackGroundCont';
import SnippetContainer from '../components/SnippetContainer';
import SnippetForm from '../components/SnippetForm';

const Dashboard = () => {
    const [ViewForm, setViewForm] = useState(false)
    const clickForm = () => {
       if(ViewForm==true){
        setViewForm(false)
       }else{
        setViewForm(true)
       }
       console.log(ViewForm);
       
    }
    return (
        <div className='h-screen w-full bg-zinc-800 relative'>
            <Navbar clickFormbtn={clickForm} />
            <BackGroundCont />
            <SnippetContainer />
           {ViewForm ? <SnippetForm clickFormbtn={clickForm} /> : null}
            
        </div>
    )
}

export default Dashboard
