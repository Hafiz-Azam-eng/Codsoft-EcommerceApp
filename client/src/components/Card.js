import React from 'react';
import img from '../const/images/468.jpg'
import { useCart } from './cartContext';
import { GrAdd } from "react-icons/gr";


const Card = ({ product }) => {
  const { addToCart } = useCart();
  console.log(product);
  return (
    <div className="max-w-56 max-h-72 min-w-48 rounded overflow-hidden shadow-lg m-4">
      <img className="max-w-48 max-h-48 p-4" src={`http://localhost:5000/${product.imageUrl}`} alt={product.name} />

      <div className="px-2 py-2">
        <div className="font-bold text-lg">{product.name}</div>
        <p className="text-gray-700 text-base">
          {/* {product.description} */}
        </p>
      </div>
      <div className="px-2 pt-2 pb-2 flex justify-between items-center">
        <span className="text-lg font-bold text-[#e94863]">${product.price}</span>
        <button className="text-[#e94863] font-bold" onClick={() => addToCart({ ...product, quantity: 1 })}>
          <GrAdd />
        </button>
      </div>
    </div>
  );
}

export default Card;
