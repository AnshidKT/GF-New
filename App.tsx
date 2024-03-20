import React, {useEffect} from 'react';
import Intro from './components/Intro';
import Index from './components/Index';
import SignIn from './components/SignIn';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import SignUp from './components/SignUp';
import ProductDetails from './components/ProductDetails';
import {CartProvider} from './components/CartContext';
import Address from './components/ShippingAddress';
import {UserContext} from './components/UserContext';
import AddAddress from './components/BillingAddress';
import Payment from './components/Payment';
import Favourite from './components/Favourite';
import MyOrders from './components/MyOrders';
import MyOrdersDetailes from './components/MyOrdersDetailes';
import AuthCheckScreen from './components/AuthCheckScreen';
import Demo from './components/Demo';
import Demoo from './components/Demoo';
import {BaseUrlProvider} from './components/BaseUrlContext';
import ForgotPassword from './components/ForgotPassword';
import DemoHome from './components/DemoHome';
import BillingAddress from './components/BillingAddress';
import ShippingAddress from './components/ShippingAddress';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <UserContext>
        <BaseUrlProvider>
          <CartProvider>
            <Stack.Navigator
              screenOptions={{headerShown: false}}
              initialRouteName="SignIn">
              <Stack.Screen name="AuthCheck" component={AuthCheckScreen} />
              <Stack.Screen name="Intro" component={Intro} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="Index" component={Index} />
              <Stack.Screen
                name="ShippingAddress"
                component={ShippingAddress}
              />
              <Stack.Screen name="BillingAddress" component={BillingAddress} />
              <Stack.Screen name="ProductDetails" component={ProductDetails} />
              <Stack.Screen name="Payment" component={Payment} />
              <Stack.Screen name="Favourite" component={Favourite} />
              <Stack.Screen name="MyOrders" component={MyOrders} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="Demo" component={Demo} />
              <Stack.Screen name="Demoo" component={Demoo} />
              <Stack.Screen name="DemoHome" component={DemoHome} />

              <Stack.Screen
                name="MyOrdersDetailes"
                component={MyOrdersDetailes}
              />
            </Stack.Navigator>
          </CartProvider>
        </BaseUrlProvider>
      </UserContext>
    </NavigationContainer>
  );
};

export default App;
