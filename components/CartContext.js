import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import axios from 'axios';
import {useBaseUrl} from './BaseUrlContext';
import {showMessage} from 'react-native-flash-message';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({children}) => {
  const {baseUrl} = useBaseUrl();

  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState([]);
  const [activeCartUuid, setActiveCartUuid] = useState('');

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);

   const fetchCartData = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      console.log('AsyncStorage token:', token);

      const response = await axios.get(`${baseUrl}/api/cart/getcarts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = response.data;

      // console.log(responseData);

      setCartData(responseData.activeCartItems);
      setActiveCartUuid(responseData.activeCart.uuid);
      setLoading(false);

      // Calculate subtotal, total, and discount price
      const subtotal = responseData.activeCartItems.reduce(
        (total, item) => total + parseFloat(item.sub_total),
        0,
      );
      const discountPrice = responseData.activeCartItems.reduce(
        (total, item) => total + parseFloat(item.discount_amount),
        0,
      );
      const total = subtotal - discountPrice;
      setSubtotal(subtotal);
      setTotal(total);
      setDiscountPrice(discountPrice);
    } catch (error) {
      console.error('Error fetching cart data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
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

  const calculateTotalPrice = () => {
    if (!cartData || cartData.length === 0) {
      return 0;
    }
    return cartData.reduce(
      (total, item) => total + item.final_price * item.qty,
      0,
    );
  };

  // coupon code = TST10560
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const handleApplyCoupon = async () => {
    try {
      if (subtotal < 500) {
        setCouponApplied(false);
        showMessage({
          message: 'Minimum subtotal: 500',
          type: 'warning',
        });

        return;
      }

      const response = await axios.post(
        `${baseUrl}/api/carts/${activeCartUuid}/coupons`,
        {
          coupon: couponCode,
        },
      );
      showMessage({
        message: 'Coupon applied successfully',
        type: 'success',
      });
      setCouponApplied(true);
    } catch (error) {
      if (error.response) {
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      showMessage({
        message: 'Failed to apply coupon',
        type: 'danger',
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        loading,
        cartData,
        activeCartUuid,
        handleRemoveItem,
        setCartData,
        fetchCartData,
        handleApplyCoupon,
        couponCode,
        setCouponCode,
        couponApplied,
        calculateTotalPrice,
        subtotal,
        discountPrice,
        total,
        fetchCartData,
      }}>
      {children}
    </CartContext.Provider>
  );
};
