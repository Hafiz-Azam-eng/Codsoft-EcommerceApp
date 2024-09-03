import React, { useState, useEffect } from 'react';
import Card from './Card';
import { useCart } from './cartContext';
// import productImage from "../const/images/468.jpg";

const Product = () => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // console.log(products);

  return (
    <div className='flex justify-center mt-6 w-11/12 p-8'>
      <div className='flex flex-wrap justify-center p-8 w-2/3 bg-[#f6fafd]'>
        {products.map(product => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Product;
