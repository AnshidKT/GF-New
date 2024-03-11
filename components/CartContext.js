// CartContext.js

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BarIndicator} from 'react-native-indicators';
import {useBaseUrl} from './BaseUrlContext';
import {showMessage} from 'react-native-flash-message';

const initialState = {
  items: [],
};

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );

      if (existingItem) {
        console.warn('Item already in the cart!');
        return state;
      }

      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };

    default:
      return state;
  }
};

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState([]);
  const [activeCartUuid, setActiveCartUuid] = useState('');

  const {baseUrl} = useBaseUrl();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/cart/getcarts?sid=LOhkeQiWzWmfqgP3qCD98C9v-pD4Pnrc`,
        );
        const responseData = response.data;
  
        setCartData(responseData.activeCartItems);
        setActiveCartUuid(responseData.activeCart.uuid);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart data:', error);
        setLoading(false);
      }
    };
    fetchCartData();
  }, []);

  useEffect(() => {
    if (activeCartUuid) {
      console.log('activeCartUuid:', activeCartUuid);
    }
  }, [activeCartUuid]);

  const handleRemoveItem = async uuid => {
    try {
      await axios.delete(`${baseUrl}/api/cart/${activeCartUuid}/items/${uuid}`);
      setCartData(cartData.filter(item => item.uuid !== uuid));
      console.log('Item removed successfully');
      showMessage({
        message: 'Item removed ',
        type: 'none',
      });
    } catch (error) {
      console.log('Failed to remove item from cart');
    }
  };

  return (
    <CartContext.Provider
      value={{
        loading,
        cartData,
        activeCartUuid, // Providing activeCartUuid in the context
        handleRemoveItem,
      }}>
      {children}
    </CartContext.Provider>
  );
};
