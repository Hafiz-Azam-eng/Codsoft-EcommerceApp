import React, { createContext, useContext, useState } from 'react';

// Create a Context for the cart
const cartContext = createContext();

// Custom hook to use the Cart context
export const useCart = () => useContext(cartContext);

// Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
//   console.log("Cart",cart);

  const addToCart = (item) => {
    setCart([...cart, item]);
    // console.log("addToCart",item);
  };

  const removeFromCart = (itemId) => {
    
    setCart(cart.filter(item => item._id !== itemId));
    // console.log(itemId);
  };

  const updateCartItem = (itemId, newQuantity) => {
    setCart(cart.map(item => item._id === itemId ? { ...item, quantity: newQuantity } : item));
  };

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
//   console.log("cartItemCount",cartItemCount);

  return (
    <cartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItem, cartItemCount }}>
      {children}
    </cartContext.Provider>
  );
};
