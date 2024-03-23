// import React, { createContext, useState, useContext } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import {useBaseUrl}  from './BaseUrlContext';

// const LoginContext = createContext();

// export const LoginProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const {baseUrl} = useBaseUrl();

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post(`${baseUrl}/customer/login`, { email, password });
//       const { token, customer_name } = response.data.data;
//       await AsyncStorage.setItem('authToken', token);
//       await AsyncStorage.setItem('customerName', customer_name);
//       setUser({ email, name: customer_name });
//       return true;
//     } catch (error) {
//       console.error('Login failed:', error);
//       return false;
//     }
//   };

//   const logout = async () => {
//     try {
//       await AsyncStorage.removeItem('authToken');
//       await AsyncStorage.removeItem('customerName');
//       setUser(null);
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <LoginContext.Provider value={{ user, login, logout }}>
//       {children}
//     </LoginContext.Provider>
//   );
// };

// export const useLogin = () => useContext(LoginContext);
