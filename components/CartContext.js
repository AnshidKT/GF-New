import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserType} from './UserContext';
import axios from 'axios';
import FlashMessage, {showMessage} from 'react-native-flash-message';
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
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = item => {
    dispatch({type: ADD_TO_CART, payload: item});
  };

  const [cartItems, setCartItems] = useState([]);

  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };
  const calculateCouponDiscount = () => {
    if (appliedCoupon === 'GOLDENFEATHER') {
      return calculateTotalAmount() * 0.1;
    }
    return 0;
  };

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const handleApplyCoupon = () => {
    if (couponCode === 'GOLDENFEATHER') {
      setAppliedCoupon(couponCode);
      showCouponSuccess();
    } else {
      showCouponFailed();
      setAppliedCoupon('');
    }
  };

  const showCouponSuccess = () => {
    showMessage({
      message: 'Coupon Added',
      type: 'success',
    });
  };
  const showCouponFailed = () => {
    showMessage({
      message: 'Invalid coupon code',
      type: 'warning',
    });
  };

  const [selectedAddress, setSelectedAddress] = useState('');
  const [userDetails, setUserDetails] = useState({name: '', email: ''});

  return (
    <CartContext.Provider
      value={{
        cart: state,
        userDetails,
        setUserDetails,
        addToCart,

        calculateTotalAmount,
        calculateCouponDiscount,
        showMessage,
        handleApplyCoupon,
        couponCode,
        setCouponCode,
        cartItems,
        setCartItems,
        selectedAddress,
        setSelectedAddress,
      }}>
      {children}
    </CartContext.Provider>
  );
};
