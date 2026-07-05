import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import BackGroundCont from '../components/BackGroundCont';
import SnippetContainer from '../components/SnippetContainer';
import SnippetForm from '../components/SnippetForm';
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
const Dashboard = () => {
   
    const [editingSnippet, setEditingSnippet] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [ViewForm, setViewForm] = useState(false)
const [AllsnippetData, setAllsnippetData] = useState(() => {
  const savedSnippets = localStorage.getItem("snippets");

  return savedSnippets ? JSON.parse(savedSnippets) : [];
});
  useEffect(() => {
    localStorage.setItem(
      "snippets",
      JSON.stringify(AllsnippetData)
    );
  }, [AllsnippetData]);
        const filteredSearchData = AllsnippetData.filter((snippet) => {
  return (
    snippet.title.toLowerCase().includes(searchText.toLowerCase()) ||
    snippet.language.toLowerCase().includes(searchText.toLowerCase()) ||
    snippet.code.toLowerCase().includes(searchText.toLowerCase()) ||
    snippet.tags.some((tag) =>
      tag.toLowerCase().includes(searchText.toLowerCase())
    )
  );
});
const editSnippet = (snippet) => {
    setEditingSnippet(snippet);
    setViewForm(true);
};
    const addSnippet=(data)=>{
       
        let dataObj={
            id:Date.now(),
                  title: data.title,
        language: data.language,
        code: data.code,
        favorite: data.favorite,
            tags: data.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag !== "")

        }
         
        let UpdatedData=[...AllsnippetData,dataObj]
        console.log(UpdatedData);
        
        setAllsnippetData(UpdatedData);
    }
//    const deleteSnippet = (idx) => {
//     const updatedData = [...AllsnippetData];
//     updatedData.splice(idx, 1);
//     setAllsnippetData(updatedData);
// };
const deleteSnippet = (id) => {
    setAllsnippetData(prev =>
        prev.filter(snippet => snippet.id !== id)
    );
};


const copySnippet = async (code) => {
  try {
    await navigator.clipboard.writeText(code);
    toast.success("Snippet copied!");
  } catch {
    toast.error("Copy failed!");
  }
};

    const clickForm = () => {
        if (ViewForm == true) {
            setViewForm(false)
        } else {
            setViewForm(true)
        }
        console.log(ViewForm);

    }
    console.log(editingSnippet);
    return (
        <div className='h-screen w-full bg-zinc-800 relative'>
            <Navbar clickFormbtn={clickForm} setSearchText={setSearchText} />
            <BackGroundCont />
            <SnippetContainer alldata={filteredSearchData} deleteSnippet={deleteSnippet} copySnippet={copySnippet}  editSnippet={editSnippet} />
            {ViewForm ? <SnippetForm clickFormbtn={clickForm} addSnippet={addSnippet} editSnippet={editSnippet} />  : null}
            <Toaster
        position="top-right"
        reverseOrder={false}
      />

        </div>
    )
     
}

export default Dashboard
