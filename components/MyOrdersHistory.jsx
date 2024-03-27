import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useBaseUrl} from './BaseUrlContext';
import { useCart } from './CartContext';

const MyOrdersHistory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {orderDetails} = route.params;
  const {baseUrl} = useBaseUrl();
const {currency}=useCart()
  
  const getStatusTintColor = (status, index) => {
    if (status === 'processing' && index <= 1) {
      return 'green';
    } else if (status === 'shipped' && index <= 2) {
      return 'green';
    } else if (status === 'delivered') {
      return 'green';
    } else {
      return 'grey';
    }
  };

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
        <TouchableOpacity onPress={() => navigation.navigate('MyOrders')}>
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
          Orders History
        </Text>

        <View style={{width: 40}}></View>
      </View>

      <View style={{width: '100%', padding: 10, marginTop: 10}}>
        <View
          style={{
            width: '100%',
            height: 'auto',
          }}>
          {orderDetails.items.map(item => (
            <View
              key={item.order_item_id}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                height: 60,
                backgroundColor: 'white',
                borderRadius: 5,
                marginTop: 8,
                paddingLeft: 10,
                paddingRight: 10,
                elevation: 1,
              }}>
              <Image
                style={{width: 50, height: 50}}
                source={{uri: baseUrl + item.thumbnail}}
              />

              <Text>{item.product_name}</Text>
              <Text>{JSON.parse(item.variant_options)[1].option_text}</Text>
              <Text>Qty: {item.qty}</Text>
              <Text> {currency} {parseFloat(item.final_price).toFixed()}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{padding: 10}}>
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingRight: 18,
            paddingLeft: 18,
            backgroundColor: 'white',
            height: 38,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16}}>Sub Total :</Text>
          <Text style={{fontSize: 16, fontWeight: '700'}}>
            {currency} {parseFloat(orderDetails.subTotal).toFixed()}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingRight: 18,
            paddingLeft: 18,
            backgroundColor: 'white',
            height: 38,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16}}>Discount Coupon :</Text>
          <Text style={{fontSize: 16, fontWeight: '700'}}>
            {currency} -{parseFloat(orderDetails.discountAmount).toFixed()}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingRight: 18,
            paddingLeft: 18,
            backgroundColor: 'white',
            height: 38,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16}}>Shipping Tax :</Text>
          <Text style={{fontSize: 16, fontWeight: '700'}}>
            {currency} +{parseFloat(orderDetails.shippingFeeExclTax).toFixed()}
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingRight: 18,
            paddingLeft: 18,
            backgroundColor: 'white',
            height: 38,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16}}>Grand Total :</Text>
          <Text style={{fontSize: 16, color: 'green', fontWeight: '900'}}>
            {currency} {parseFloat(orderDetails.grandTotal).toFixed()}
          </Text>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          padding: 10,
        }}>
        <View
          style={{
            width: '100%',
            height: 40,
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: 10,
            paddingLeft: 10,
          }}>
          <Text style={{fontSize: 16}}>Payment Status :</Text>
          <Text style={{fontSize: 16, fontWeight: '600'}}>
            {orderDetails.paymentStatus}
          </Text>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          padding: 10,
        }}>
        <View
          style={{
            width: '100%',
            height: 40,
            justifyContent: 'center',
            backgroundColor: 'white',
          }}>
          <Text style={{fontSize: 16, marginLeft: 8}}>Shipment Status</Text>
        </View>

        <View
          style={{
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'white',
            paddingTop: 9,
          }}>
          <View style={styles.statusContainer}>
            <View style={styles.statusImagesContainer}>
              <View
                style={[
                  styles.statusImage,
                  {
                    backgroundColor: getStatusTintColor(
                      orderDetails.shipmentStatus,
                      1,
                    ),
                  },
                ]}
              />
              <View
                style={[
                  styles.statusLine,
                  {
                    backgroundColor: getStatusTintColor(
                      orderDetails.shipmentStatus,
                      2,
                    ),
                  },
                ]}
              />
              <View
                style={[
                  styles.statusImage,
                  {
                    backgroundColor: getStatusTintColor(
                      orderDetails.shipmentStatus,
                      2,
                    ),
                  },
                ]}
              />
              <View
                style={[
                  styles.statusLine,
                  {
                    backgroundColor: getStatusTintColor(
                      orderDetails.shipmentStatus,
                      3,
                    ),
                  },
                ]}
              />
              <View
                style={[
                  styles.statusImage,
                  {
                    backgroundColor: getStatusTintColor(
                      orderDetails.shipmentStatus,
                      3,
                    ),
                  },
                ]}
              />
            </View>

            <View style={styles.statusTextContainer}>
              <Text
                style={[
                  styles.statusText,
                  {color: getStatusTintColor(orderDetails.shipmentStatus, 1)},
                ]}>
                Processing
              </Text>
              <Text
                style={[
                  styles.statusText,
                  {color: getStatusTintColor(orderDetails.shipmentStatus, 2)},
                ]}>
                Shipped
              </Text>
              <Text
                style={[
                  styles.statusText,
                  {color: getStatusTintColor(orderDetails.shipmentStatus, 3)},
                ]}>
                Delivered
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyOrdersHistory;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerButton: {
    width: 40,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#ffffff',
  },
  headerIcon: {
    width: 20,
    height: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  orderItemsContainer: {
    width: '100%',
    padding: 10,
    marginTop: 10,
  },
  summaryContainer: {
    padding: 10,
  },
  statusContainer: {
    width: '100%',
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  statusImagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusImage: {
    width: 15,
    height: 15,

    borderRadius: 10,
    marginHorizontal: 10,
  },
  statusLine: {
    flex: 1,
    height: 2,
    backgroundColor: 'grey',
  },
  statusTextContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusText: {
    fontSize: 15,
  },
});
