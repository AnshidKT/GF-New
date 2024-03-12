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

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState([]);
  const [activeCartUuid, setActiveCartUuid] = useState('');

  const {baseUrl} = useBaseUrl();

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

  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = async () => {
    try {
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

  // coupon code = TST10560

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
      }}>
      {children}
    </CartContext.Provider>
  );
};
