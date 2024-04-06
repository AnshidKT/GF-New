import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import {useBaseUrl} from './BaseUrlContext';
import {ScrollView} from 'react-native';
import {useCart} from './CartContext';

const Payment = ({navigation, route}) => {
  const {total, discountPrice, subtotal, currency, activeCartUuid} = useCart();

  const [loading, setLoading] = useState(false);
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paypalInputVisible, setPaypalInputVisible] = useState(false);
  const {baseUrl} = useBaseUrl();

  // const {name, email} = route.params;
  // console.log(name, email);

  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/api/paymentMethods`)
      .then(response => response.json())
      .then(data => {
        setPaymentMethods(data.data.methods);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching payment methods: ', error);
        setLoading(false);
      });
  }, []);

  const handleConfirmOrder = async () => {
    if (selectedPaymentIndex === undefined) {
      Alert.alert('Please select a payment method');
      return;
    }
    // Proceed with order confirmation
  };

  const handleSelectedPayment = index => {
    if (selectedPaymentIndex === index) {
      setSelectedPaymentIndex(undefined);
      setPaypalInputVisible(false);
    } else {
      setSelectedPaymentIndex(index);
      const selectedMethod = paymentMethods[index];
      console.log('Selected payment method:', selectedMethod);

      if (selectedMethod.code === 'paypal') {
        setPaypalInputVisible(true);
      } else {
        setPaypalInputVisible(false);
      }

      const postData = {
        method_code: selectedMethod.code,
        method_name: selectedMethod.name,
      };

      fetch(`${baseUrl}/api/carts/${activeCartUuid}/paymentMethods`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to post payment method');
          }
          console.log('Payment method posted successfully');
          console.log('Name:', selectedMethod.name);
          console.log('Code:', selectedMethod.code);
        })
        .catch(error => {
          console.error('Error posting payment method: ', error);
        });
    }
  };

  const placeOrder = async () => {
    if (selectedPaymentIndex === undefined) {
      Alert.alert('info', 'Please select a payment method');
      return;
    }

    try {
      const postData = {
        cart_id: activeCartUuid,
      };

      const response = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const responseData = await response.json();
      // console.log('Order placed successfully:', responseData);
      Alert.alert(
        'Ordered',
        'Order placed successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('MyOrders'),
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.error('Error placing order:', error.message);
      //  Alert.alert('Error', 'Failed to place order. Please try again.');
    }
  };

  return (
    <View>
      {loading ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
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
            <TouchableOpacity
              onPress={() => navigation.navigate('BillingAddress')}>
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
              Payment
            </Text>

            <View style={{width: 40}}></View>
          </View>

          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              height: 240,
            }}>
            <View
              style={{
                width: '90%',
                flexDirection: 'column',
                height: '90%',
                backgroundColor: 'white',
                borderTopEndRadius: 8,
                borderTopStartRadius: 8,
                paddingTop: 8,
              }}>
              <Text
                style={{
                  marginLeft: 9,
                  fontSize: 19,
                  color: 'black',
                  fontWeight: '600',
                }}>
                Order Details
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  paddingRight: 10,
                  paddingLeft: 10,
                }}>
                <Text style={{margin: 5, fontSize: 16}}>Net Total :</Text>

                <Text
                  style={{
                    margin: 5,
                    fontSize: 18,
                    fontWeight: '500',
                    color: 'green',
                  }}>
                  {currency} {subtotal}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  paddingRight: 10,
                  paddingLeft: 10,
                }}>
                <Text style={{margin: 5, fontSize: 16}}>Discount Coupon :</Text>

                <Text
                  style={{
                    margin: 5,
                    fontSize: 18,
                    fontWeight: '500',
                    color: 'green',
                  }}>
                  {currency} {discountPrice}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  paddingRight: 10,
                  paddingLeft: 10,
                }}>
                <Text style={{margin: 5, fontSize: 16}}>Grand Total :</Text>

                <Text
                  style={{
                    margin: 5,
                    fontSize: 18,
                    fontWeight: '500',
                    color: 'green',
                  }}>
                  {currency} {total}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              height: 'auto',
              alignItems: 'center',
              justifyContent: 'flex-start',
              // marginTop: 10,
              // backgroundColor:'red'
            }}>
            <View
              style={{
                width: '90%',
                height: 400,
                backgroundColor: 'white',
                marginTop: '-3.5%',
                borderBottomEndRadius: 8,
                borderBottomLeftRadius: 8,
                paddingTop: 8,
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}>
              <Text
                style={{
                  marginLeft: 9,
                  fontSize: 19,
                  color: 'black',
                  fontWeight: '600',
                }}>
                Payment Method
              </Text>
              <View
                style={{
                  width: '100%',
                  height: 'auto',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  // backgroundColor:'yellow'
                }}>
                {paymentMethods.map((method, index) => (
                  <View
                    key={index}
                    style={{
                      width: '93%',
                      height: 60,
                      backgroundColor: 'white',
                      elevation: 3,
                      borderColor: 'gray',
                      borderRadius: 8,
                      justifyContent: 'center',
                      padding: 8,
                      margin: 10,
                    }}>
                    <TouchableOpacity
                      style={{flexDirection: 'row'}}
                      onPress={() => handleSelectedPayment(index)}>
                      <View
                        style={{
                          width: 25,
                          height: 25,
                          backgroundColor: 'white',
                          borderRadius: 20,
                          borderWidth: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: 2,
                        }}>
                        {selectedPaymentIndex === index && (
                          <Image
                            style={{width: 50, height: 50}}
                            source={require('../Assets/Normal-IMG/payment-tick.png')}
                          />
                        )}
                      </View>
                      <Image
                        style={{
                          width: 100,
                          height: 30,
                          objectFit: 'fill',
                          marginLeft: 10,
                        }}
                        source={
                          index === 0
                            ? require('../Assets/Normal-IMG/cashondelivery.png')
                            : index === 1
                            ? require('../Assets/Normal-IMG/paypal.png')
                            : require('../Assets/Normal-IMG/visa.png')
                        }
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              {paypalInputVisible && (
                <View
                  style={{
                    width: '100%',
                    backgroundColor: 'white',
                    height: 'auto',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TextInput
                    style={{
                      width: '93%',
                      borderWidth: 2,
                      borderRadius: 4,
                      borderColor: 'lightgray',
                      padding: 20,
                    }}
                    placeholder="You will be redirected to PayPal"
                    readOnly
                  />
                </View>
              )}
            </View>
          </View>

          <View
            style={{
              width: '100%',
              height: '10%',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={placeOrder}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '90%',
                borderRadius: 8,
                height: 60,
                marginBottom: 10,
                backgroundColor: '#030303',
              }}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Payment;
