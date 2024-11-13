import React, { createContext, useState, useEffect } from 'react';

// Create a new context
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // Initialize cart state from local storage or as an empty array
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Update local storage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to add item to the cart
  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  // Function to remove item from the cart
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Function to calculates the total price of items in the cart
  const total = () => {
    return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };
  
  

   // Simplified auth info
   const CartInfo = { 
    cartItems, 
    addToCart,
    removeFromCart,
    total };

  return (
    <CartContext.Provider value={CartInfo}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
