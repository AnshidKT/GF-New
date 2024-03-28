import React, {useCallback, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {CartProvider} from './components/CartContext';
import Intro from './components/Intro';
import Index from './components/Index';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ProductDetails from './components/ProductDetails';
import BillingAddress from './components/BillingAddress';
import ShippingAddress from './components/ShippingAddress';
import Payment from './components/Payment';
import Favourite from './components/Favourite';
import MyOrders from './components/MyOrders';
import MyOrdersDetailes from './components/MyOrdersDetailes';
import ForgotPassword from './components/ForgotPassword';
import Demo from './components/Demo';
import Demoo from './components/Demoo';
import DemoHome from './components/DemoHome';
import MyOrdersHistory from './components/MyOrdersHistory';
import {UserContext} from './components/UserContext';
import {BaseUrlProvider} from './components/BaseUrlContext';

const Stack = createNativeStackNavigator();

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        const password = await AsyncStorage.getItem('password');

        if (!email || !password) {
          console.log('No stored credentials found, navigating to SignIn page');
          setLoading(false);
          return;
        }

        console.log(' auto-login with email:', email);

        const response = await axios.post(
          `http://192.168.1.40:3000/customer/login`,
          {
            email,
            password,
          },
        );

      //  console.log('Login API response:', response);

        console.log('Login successful!');
        const token = response.data.data.token;
        AsyncStorage.setItem('AutoLogin    :  ', token);

        const customerName = response.data.data.customer_name;
        AsyncStorage.setItem('CustomerName', customerName);
     //   console.log('tokentokentoken:', token);

        setAuthenticated(true);
        setLoading(false);
      } catch (error) {
        console.error('Error while automatically logging in:', error);
        setLoading(false);
      }
    };

    autoLogin();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <UserContext>
        <BaseUrlProvider>
          <CartProvider>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              {authenticated ? (
                <>
                  <Stack.Screen name="Index" component={Index} />
                  <Stack.Screen
                    name="ProductDetails"
                    component={ProductDetails}
                  />
                  <Stack.Screen
                    name="ShippingAddress"
                    component={ShippingAddress}
                  />
                  <Stack.Screen
                    name="BillingAddress"
                    component={BillingAddress}
                  />
                  <Stack.Screen name="Payment" component={Payment} />
                  <Stack.Screen name="Favourite" component={Favourite} />
                  <Stack.Screen name="MyOrders" component={MyOrders} />
                  <Stack.Screen
                    name="MyOrdersHistory"
                    component={MyOrdersHistory}
                  />
                  <Stack.Screen name="Demo" component={Demo} />
                  <Stack.Screen name="Demoo" component={Demoo} />
                  <Stack.Screen name="DemoHome" component={DemoHome} />
                  <Stack.Screen
                    name="MyOrdersDetailes"
                    component={MyOrdersDetailes}
                  />
                  <Stack.Screen name="SignUp" component={SignUp} />
                  <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                  />
                  <Stack.Screen name="SignIn" component={SignIn} />
                </>
              ) : (
                <>
                  <Stack.Screen name="SignIn" component={SignIn} />
                </>
              )}
            </Stack.Navigator>
          </CartProvider>
        </BaseUrlProvider>
      </UserContext>
    </NavigationContainer>
  );
};

export default App;
