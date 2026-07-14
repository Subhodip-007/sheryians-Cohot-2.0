import React, { useEffect, useState } from 'react'
import BackGround from "../components/backGround";
import Overlay from "../components/overlay";
import Loading from "../components/loading";
import InputForm from '../components/InputForm';
import getdata from '../apis/fetchdata';

const mainPage = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
 const [fetchedData, setFetchedData] = useState([]);

async function fetchData() {
  const data = await getdata();
  setFetchedData(data);
}

useEffect(() => {
  fetchData();
}, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // show loader for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='h-screen w-full relative bg-zinc-800 selection:text-amber-500'>
<button
  onClick={() => setShow(!show)}
  className="p-3 bg-zinc-700 rounded-2xl absolute top-5 left-[95%] z-95 "
>
  <svg
    className={`transition-transform duration-300 ${
      show ? "rotate-45" : "rotate-0"
    }`}
    width="24"
    height="24"
    viewBox="0 0 100 100"
  >
    <line
      x1="25"
      y1="50"
      x2="75"
      y2="50"
      stroke="white"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <line
      x1="50"
      y1="25"
      x2="50"
      y2="75"
      stroke="white"
      strokeWidth="8"
      strokeLinecap="round"
    />
  </svg>
</button>

      {loading && <Loading />}

      <BackGround />
      <Overlay fetchedData={fetchedData} fetchData={fetchData}   />

{show && (
  <InputForm fetchData={fetchData} 
   setShow={setShow}
  />
)}
    </div>
  );
};

export default mainPage
