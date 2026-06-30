import React, { createContext,useEffect, useState  } from 'react'
import axios from 'axios';
import { GetData } from '../api/productAPI';
 export const Productdatacontext = createContext()
const ProductContext = (props) => {

    const [allProductdata, setallProductdata] = useState([])
   async function setdata(){
        const data= await GetData()
        setallProductdata(data)
    }
//   const GetFirstData = async (idx) => {
//     const response = await axios.get(`https://fakestoreapi.com/products/${idx}`);
//     console.log(response.data);

//   }
  useEffect(function () {
    setdata()
  }, [])
  return (
    <div>
        <Productdatacontext.Provider value={allProductdata}>
            {props.children}
        </Productdatacontext.Provider>
      
    </div>
  )
}

export default ProductContext
