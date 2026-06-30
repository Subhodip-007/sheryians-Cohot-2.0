import axios from 'axios';
 export const GetData = async () => {
    const response = await axios.get(`https://fakestoreapi.com/products`);
    
    return response.data;
  }
