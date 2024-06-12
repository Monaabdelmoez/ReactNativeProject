import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const WishListContext = createContext();

export const ListProvider = ({ children }) => {
  const [List, setList] = useState([]);


  useEffect(() => {
    loadFromStorage();
  }, []);

  useEffect(() => {
    saveToStorage();
  }, [List]);

  const loadFromStorage = async () => {
    try {
      const storedList = await AsyncStorage.getItem('List');
      if (storedList) {
        setList(JSON.parse(storedList));
      }
    } catch (error) {
      console.error('Failed to load from storage', error);
    }
  };

  const saveToStorage = async () => {
    try {
      await AsyncStorage.setItem('List', JSON.stringify(List));
    } catch (error) {
      console.error('Failed to save to storage', error);
    }
  };

  const addToList= (product) => {
    setList((prevList) => {
      const Product = prevList.find(item => item.id === product.id);
      if (Product) {
        return prevList.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevList, { ...product, quantity: 1 }];
    });
  };

  const removeFromList = (productId) => {
    setList((prevList) => {
      const product = prevList.find(item => item.id === productId);
      if (product.quantity > 1) {
        return prevList.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevList.filter(item => item.id !== productId);
    });
  };
  return (
    <WishListContext.Provider value={{ List, addToList, removeFromList, }}>
      {children}
    </WishListContext.Provider>
  );
};
