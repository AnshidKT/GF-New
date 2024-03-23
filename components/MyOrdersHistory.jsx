import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const MyOrdersHistory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { orderDetails } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: '100%', height: 60, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingLeft: 20, paddingRight: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate('MyOrders')}>
          <View style={{ width: 40, borderRadius: 6, alignItems: 'center', justifyContent: 'center', height: 40, backgroundColor: '#ffffff' }}>
            <Image style={{ width: 20, height: 20 }} source={require('../Assets/Normal-IMG/left-arrow.png')} />
          </View>
        </TouchableOpacity>

        <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black' }}>
          My Orders History
        </Text>

        <View style={{ width: 40 }}></View>
      </View>

      <View style={{ padding: 10 }}>
        <Text>Order Number: {orderDetails.orderNumber}</Text>
        <Text>Customer Name: {orderDetails.customerFullName}</Text>
        <Text>Payment Method: {orderDetails.paymentMethodName}</Text>
        <Text>Payment Status: {orderDetails.paymentStatus}</Text>
        <Text>Shipment Status: {orderDetails.shipmentStatus}</Text>
        <Text>Created At: {orderDetails.createdAt}</Text>
        <Text>Updated At: {orderDetails.updatedAt}</Text>
      </View>
    </View>
  );
};

export default MyOrdersHistory;

const styles = StyleSheet.create({});
