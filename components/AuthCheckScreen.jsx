import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthCheckScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      if (authToken) {
        navigation.navigate('Index');
      } else {
        navigation.navigate('SignIn');
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  };

  return null;
};

export default AuthCheckScreen;
