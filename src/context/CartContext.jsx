// context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the Cart Context
export const CartContext = createContext(null);

// Custom hook to use CartContext (optional)
export const useCart = () => {
  return useContext(CartContext);
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  // Initialize cart items from localStorage or an empty array
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localCart = localStorage.getItem('cartItems');
      return localCart ? JSON.parse(localCart) : [];
    } catch (e) {
      console.error("Failed to parse cart items from localStorage:", e);
      return []; // Return empty cart on error
    }
  });

  // Effect to save cart items to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart items to localStorage:", e);
    }
  }, [cartItems]);

  // Function to add an item to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // If item already exists, increase its quantity
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If item is new, add it with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    alert(`${product.name} added to cart!`); // Simple feedback for prototype
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        // If quantity is 0 or less, remove the item
        return prevItems.filter((item) => item.id !== productId);
      } else {
        // Otherwise, update the quantity
        return prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        );
      }
    });
  };

  // Function to remove an item completely from the cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

    // Corrected: Make getCartSubtotal a function
  const getCartSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calculate total number of items in the cart
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate total price of items in the cart
  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // The value that will be supplied to any components consuming this context
  const cartContextValue = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    getTotalItems,
    getSubtotal,
    getCartSubtotal,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};