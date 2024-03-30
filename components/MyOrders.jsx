import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {useBaseUrl} from './BaseUrlContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {BarIndicator} from 'react-native-indicators';
import {useCart} from './CartContext';
const MyOrders = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const {baseUrl} = useBaseUrl();
  const {navigate} = useNavigation();
  const {currency,fetchCartData} = useCart();



  useEffect(() => {
    fetchCartData();
  }, [currency]);



  // useEffect(() => {
  //   fetchData();
  // }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchData();
  //   }, []),
  // );

  // const fetchData = useCallback(async () => {
  //   try {
  //     console.log('Fetching user data...');
  //     const Logintoken = await AsyncStorage.getItem('LoginToken');
  //     console.log('FLogintoken  :', Logintoken);
  //     const name = await AsyncStorage.getItem('customerName');

  //     setUserData(Logintoken);

  //     if (Logintoken) {
  //       fetchOrders(Logintoken);
  //       console.log(name);
  //     } else {
  //       const AutoLoginToken = await AsyncStorage.getItem('AutoLogin');
  //       if (AutoLoginToken) {
  //         fetchOrders(AutoLoginToken);
  //       } else {
  //         setLoading(false);
  //         setOrders([]);
  //         Alert.alert('Authentication Error', 'Token not found');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //   }
  // }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const Logintoken = await AsyncStorage.getItem('LoginToken');
      const response = await axios.get(`${baseUrl}/api/orderhistory`, {
        headers: {
          Authorization: `Bearer ${Logintoken}`,
        },
      });

console.log("LogintokenMyorders   : ",Logintoken);

      const formattedOrders = response.data.orders.map(order => ({
        ...order,
        createdAt: new Date(order.createdAt).toLocaleString(),
        updatedAt: new Date(order.updatedAt).toLocaleString(),
      }));

      setOrders(formattedOrders);
    } catch (error) {
      console.log('Error', 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };


useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, []),
  );











  const handleOrderItemClick = order => {
    navigate('MyOrdersHistory', {orderDetails: order});
  };
  if (orders.length === 0) {
    return (
      <View style={{flex: 1}}>
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <BarIndicator color="#007AFF" />
          </View>
        ) : (
          <>
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
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 18}}>No orders available.</Text>
            </View>
          </>
        )}
      </View>
    );
  }

  return (
    <View style={{backgroundColor: '#F7F7F7', width: '100%', height: '100%'}}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <BarIndicator color="#007AFF" />
        </View>
      ) : (
        <>
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
          <ScrollView>
            <View style={{padding: 10, marginBottom: '20%'}}>
              {orders.map(order => (
                <TouchableOpacity
                  key={order.orderId}
                  onPress={() => handleOrderItemClick(order)}>
                  <View
                    style={{
                      width: '100%',
                      height: 'auto',
                      backgroundColor: 'white',
                      marginBottom: 10,
                      marginTop: 10,
                      borderRadius: 10,
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 10,
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: 70,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        // backgroundColor: 'red',
                      }}>
                      <Image
                        style={{width: 40, height: 40}}
                        source={require('../Assets/Normal-IMG/tick-cart.png')}
                      />
                      <View
                        style={{
                          width: '70%',
                          height: '100%',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          justifyContent: 'space-around',
                          // backgroundColor: 'gray',
                        }}>
                        <Text style={{color: 'black'}}>
                          Order Id :{' '}
                          <Text style={{color: 'black', fontSize: 15}}>
                            {' '}
                            #{order.orderNumber}
                          </Text>
                        </Text>
                        <Text style={{color: 'black'}}>
                          Name :{' '}
                          <Text style={{color: 'black', fontSize: 15}}>
                            {' '}
                            {order.customerFullName}
                          </Text>
                        </Text>
                        <Text style={{color: 'black'}}>
                          Order On :{' '}
                          <Text style={{color: 'black'}}>
                            {' '}
                            {order.createdAt}
                          </Text>
                        </Text>
                      </View>
                      <Image
                        source={require('../Assets/Normal-IMG/right-arrow.png')}
                      />
                    </View>

                    <View
                      style={{
                        width: '100%',
                        height: 40,
                        backgroundColor: 'white',
                        marginTop: 10,
                        paddingRight: 11,
                        paddingLeft: 11,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'black'}}>Price </Text>
                      <Text style={{fontWeight: '500', color: 'black'}}>
                        {currency} {parseFloat(order.grandTotal).toFixed()}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '95%',
                        borderTopWidth: 0.3,
                        borderTopColor: 'gray',
                      }}></View>
                    <View
                      style={{
                        width: '100%',
                        height: 40,
                        backgroundColor: 'white',

                        paddingRight: 11,
                        paddingLeft: 11,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text style={{color: 'black'}}>Status </Text>
                      <Text style={{color: 'black'}}>
                        {order.shipmentStatus}{' '}
                      </Text>
                    </View>

                    {/* <View>
                  <Text style={{}}>
                    Order Number :{' '}
                    <Text
                      style={{ fontSize: 15, fontWeight: '500'}}>
                      {' '}
                      #{order.orderNumber}
                    </Text>
                  </Text>
                  <Text style={{}}>
                    Customer Name :{' '}
                    <Text
                      style={{ fontSize: 15, fontWeight: '500'}}>
                      {' '}
                      {order.customerFullName}
                    </Text>
                  </Text>
                  <Text style={{}}>
                    Payment Method:{' '}
                    <Text
                      style={{ fontSize: 15, fontWeight: '500'}}>
                      {' '}
                      {order.paymentMethodName}
                    </Text>
                  </Text>
                  <Text style={{}}>
                    Time :{' '}
                    <Text
                      style={{ fontSize: 15, fontWeight: '500'}}>
                      {' '}
                      {order.createdAt}
                    </Text>
                  </Text>
                </View> */}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({});
