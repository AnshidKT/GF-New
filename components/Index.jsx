import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Cart from './Cart';
import Shop from './Shopping';

const Index = ({navigation}) => {
  const Tab = createBottomTabNavigator();

  const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity
      style={{
        top: -39,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow,
      }}
      onPress={onPress}>
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: '#fff',
          elevation: 1,
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../Assets/Normal-IMG/home.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#FF375F' : '#748c94',
                }}
              />
              <Text style={{color: focused ? '#FF375F' : '#748c94'}}>Home</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../Assets/Normal-IMG/cart.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: focused ? '#FF375F' : '#0099ff',
              }}
            />
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../Assets/Normal-IMG/shop.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#eb3672' : '#748c94',
                }}
              />
              <Text style={{color: focused ? '#eb3672' : '#748c94'}}>Shop</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>





  );
};

export default Index;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
