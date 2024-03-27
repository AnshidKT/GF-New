// import React, {useEffect} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import {useBaseUrl} from './BaseUrlContext';

// const AuthCheckScreen = ({navigation}) => {
//   const {baseUrl} = useBaseUrl();

//   useEffect(() => {
//     const autoLogin = async () => {
//       try {
//         const email = await AsyncStorage.getItem('email');
//         const password = await AsyncStorage.getItem('password');

//         if (!email || !password) {
//           console.log('No stored credentials found, navigating to SignIn page');
//           navigation.navigate('SignIn');
//           return;
//         }

//         console.log(' auto-login with email:', email);

//         const response = await axios.post(`${baseUrl}/customer/login`, {
//           email,
//           password,
//         });

//         console.log('Login API response:', response);

//         console.log('Login successful!');
//         const token = response.data.data.token;
//         AsyncStorage.setItem('AuthToken', token);

//         const customerName = response.data.data.customer_name;
//         AsyncStorage.setItem('CustomerName', customerName);
//         console.log('tokentokentoken:', token);

//         navigation.navigate('Index');
//       } catch (error) {
//         navigation.navigate('SignIn');
//         console.error('Error while automatically logging in:', error);
//       }
//     };

//     autoLogin();
//   }, []);

//   return null;
// };

// export default AuthCheckScreen;
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AuthCheckScreen = () => {
  return (
    <View>
      <Text>AuthCheckScreen</Text>
    </View>
  )
}

export default AuthCheckScreen

const styles = StyleSheet.create({})