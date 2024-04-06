import React, {createContext, useState, useContext} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useBaseUrl} from './BaseUrlContext';
import {Alert} from 'react-native';

const LoginContext = createContext();

export const LoginProvider = ({children}) => {
  const {baseUrl} = useBaseUrl();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async navigation => {
    if (email.trim() === '' || password.trim() === '') {
      setShowError(true);
      return;
    }

    setShowError(false);
    setLoading(true);

    const user = {
      email: email,
      password: password,
    };

    try {
        const response = await axios.post(`${baseUrl}/customer/login`, user);
      const token = response.data.data.token;
      await AsyncStorage.setItem('LoginToken', token);
      const customerName = response.data.data.customer_name;
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      await AsyncStorage.setItem('customerName', customerName);
      navigation.navigate('Index');
    } catch (error) {
        console.error('Login error:', error);
        Alert.alert('Authentication Error', 'Invalid email or password');
      } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        togglePasswordVisibility,
        loading,
        showError,
        handleLogin,
      }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
