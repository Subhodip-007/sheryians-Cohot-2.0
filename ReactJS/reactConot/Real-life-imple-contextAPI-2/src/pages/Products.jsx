import React, { useContext } from 'react'
import { Productdatacontext } from '../context/ProductContext';
import { Link } from 'react-router-dom';

const Products = () => {
 const data = useContext(Productdatacontext)
 let renderdata='';
 if(data.lenght >0){
  renderdata=  <div className='min-h-screen w-full bg-zinc-800 flex flex-wrap gap-4 p-4'>
      {data.map((elem) => (
        <Link
          key={elem.id}
          to={`/products/${elem.id}`}
          className='product block w-[300px] p-6 text-center bg-amber-50 rounded-2xl'
        >
          <img
            className='h-[200px] w-full object-cover rounded-lg'
            src={elem.image}
            alt={elem.title}
          />
          <h2 className='mt-4 font-semibold'>{elem.title}</h2>
        </Link>
      ))}
    </div>
 }
 return (
  {renderdata}
  );
}

export default Products
