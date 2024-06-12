import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);


  useEffect(() => {
    loadCartFromStorage();
  }, []);

  useEffect(() => {
    saveCartToStorage();
  }, [cart]);

  const loadCartFromStorage = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Failed to load cart from storage', error);
    }
  };

  const saveCartToStorage = async () => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart to storage', error);
    }
  };



  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const product = prevCart.find(item => item.id === productId);
      if (product.quantity > 1) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCart.filter(item => item.id !== productId);
    });
  };

  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) => {
      if (newQuantity < 1) {
        // If newQuantity is less than 1, remove the item from the cart
        return prevCart.filter((item) => item.id !== id);
      } else {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        );
      }
    });
  };
  


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart , updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
