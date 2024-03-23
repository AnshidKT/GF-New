import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useBaseUrl} from './BaseUrlContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {useNavigation} from '@react-navigation/native';
import { ScrollView } from 'react-native';

const MyOrders = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const {baseUrl} = useBaseUrl();
  const {navigate} = useNavigation();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken');
      console.log(token);
      if (!token) {
        setLoading(false);
        Alert.alert('Authentication Error', 'Token not found');
        return;
      }

      const response = await axios.get(`${baseUrl}/api/orderhistory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const formattedOrders = response.data.orders.map(order => ({
        ...order,
        createdAt: new Date(order.createdAt).toLocaleString(),
        updatedAt: new Date(order.updatedAt).toLocaleString(),
      }));

      setOrders(formattedOrders);
      console.log(formattedOrders);
    } catch (error) {
      console.log('Error', 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleOrderItemClick = order => {
    navigate('MyOrdersHistory', {orderDetails: order});
  };

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{color: '#FFF'}}
        />
      </View>
    );
  }

  return (
    <View>
           <View
        style={{
          width: '100%',
          height: 60,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Index')}>
          <View
            style={{
              width: 40,
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              backgroundColor: '#ffffff',
            }}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../Assets/Normal-IMG/left-arrow.png')}
            />
          </View>
        </TouchableOpacity>

        <Text style={{fontSize: 22, fontWeight: 'bold', color: 'black'}}>
          My Orders
        </Text>

        <View style={{width: 40}}></View>
      </View>
      <ScrollView >

      <View style={{padding: 10,marginBottom:'20%'}}>
        {orders.map(order => (
          <TouchableOpacity
            key={order.orderId}
            onPress={() => handleOrderItemClick(order.orderId)}>
            <View
              style={{
                width: '100%',
                height: 'auto',
                backgroundColor: 'white',
                marginBottom: 10,
                marginTop: 10,
                borderRadius: 10,
              }}>
              <Text style={styles.orderTitle}>
                Order Number: {order.orderNumber}
              </Text>
              <Text>Customer Name: {order.customerFullName}</Text>
              <Text>Payment Method: {order.paymentMethodName}</Text>
              <Text>Payment Status: {order.paymentStatus}</Text>
              <Text>Shipment Status: {order.shipmentStatus}</Text>
              <Text>Created At: {order.createdAt}</Text>
              <Text>Updated At: {order.updatedAt}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    
      </ScrollView>
   
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({});
