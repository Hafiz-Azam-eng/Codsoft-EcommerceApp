import React from 'react';
import { useCart } from './cartContext';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { TiHome } from "react-icons/ti";

import Header from './Header';

function Cart() {

  

  const { cart, removeFromCart, updateCartItem } = useCart();
  console.log("cart", cart);

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
    // console.log(itemId);
  };

  const handleUpdate = (itemId, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity > 0) {
      updateCartItem(itemId, newQuantity);
    }
  };

  const makePayment = async () => {
    const stripe = await loadStripe('pk_test_51PTJlY09CkmCoFiagK3k1G8lW7Lx1ebpul10qvUAEYvbPWrN1D2WXB3HSRLuGCg1oT3uD9xonaM3CB9dXdtgn1aw002E6U5CYm');

    const body = {
      products: cart
    }

    const headers = {
      "Content-Type": "application/json"
    }

    const response = await fetch("http://localhost:5000/api/create-checkout-session", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)


    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id
    })

    if (result.error) {
      console.log(result.error);
    }


  }

  return (
    <>
    {/* <Header/> */}
    <div className="flex flex-col h-screen items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-[#e94863] mt-8">Shopping Cart</h2>


      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="flex flex-col items-center w-4/5 bg-white mb-8">
          <div className='flex items-center justify-between w-4/5 font-bold p-6'>

           <h2>Description</h2>
           <h2>Quantity</h2>
           <h2>Remove</h2>
           <h2>Price</h2>
          </div>

          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between w-4/5 border-t p-4">
              
               
              <div className='flex items-center gap-4 max-w-48'>
                <img className="w-20 h-20" src={`http://localhost:5000/${item.imageUrl}`} alt={item.name} />
                <h3 className="font-bold">{item.name}</h3>
              </div>
             
              <div className="">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(event) => handleUpdate(item._id, event)}
                  className="w-12 text-center border border-gray-300 rounded"
                  />
              </div>
              <button
                onClick={() => handleRemove(item._id)}
                className="bg-white text-black px-4 py-4 border"
                >
                x
              </button>
              <div className="font-bold">
                
                <p>${item.price}</p>
              </div>
            </div>
          ))}
          <div className='flex flex-col justify-end items-end w-4/5 gap-2'>

          <div className="total font-bold text-lg border px-4 py-4">
            Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}
          </div>
          <div className="total font-bold text-lg p-2">
            <Link to="/checkOut">
              <button className='bg-[#e94863] px-4 py-2 text-white' onClick={makePayment}>CheckOut</button>
            </Link>


            <Link to="/">
              <button className='bg-[#e94863] px-2 py-2 text-white ml-0.5'>
              <TiHome className=''/>
              </button>
            </Link>
          </div>
          </div>
        </div>
      )}
    </div>
      </>

  );
}

export default Cart;
