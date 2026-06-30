import React, { useContext } from 'react'
import { Productdatacontext } from '../context/ProductContext';
import { useParams } from 'react-router-dom';

const Productsdets = () => {
let dat =  useContext(Productdatacontext)
const idx= useParams()
console.log(idx.id);
const product = dat.find(
  (elem) => String(elem.id) === idx.id
);
console.log(product);
 if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} />
    </div>
  )
}

export default Productsdets
