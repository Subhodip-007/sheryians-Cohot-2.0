import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import BackGroundCont from '../components/BackGroundCont';
import SnippetContainer from '../components/SnippetContainer';
import SnippetForm from '../components/SnippetForm';

const Dashboard = () => {
    const [ViewForm, setViewForm] = useState(false)
      const [AllsnippetData, setAllsnippetData ] = useState([])
    const addSnippet=(data)=>{
       
        let dataObj={
            id:Date.now(),
                  title: data.title,
        language: data.language,
        code: data.code,
        favorite: false,
            tags: data.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag !== "")

        }
         
        let UpdatedData=[...AllsnippetData,dataObj]
        console.log(UpdatedData);
        
        setAllsnippetData(UpdatedData);
    }

    const clickForm = () => {
        if (ViewForm == true) {
            setViewForm(false)
        } else {
            setViewForm(true)
        }
        console.log(ViewForm);

    }
    return (
        <div className='h-screen w-full bg-zinc-800 relative'>
            <Navbar clickFormbtn={clickForm} />
            <BackGroundCont />
            <SnippetContainer alldata={AllsnippetData} />
            {ViewForm ? <SnippetForm clickFormbtn={clickForm} addSnippet={addSnippet} /> : null}

        </div>
    )
}

export default Dashboard
