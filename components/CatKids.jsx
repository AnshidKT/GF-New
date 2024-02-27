import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native';
import {TextInput} from 'react-native';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import Footer from './Footer';
import axios from 'axios';
import {useBaseUrl} from './BaseUrlContext';
import {BarIndicator} from 'react-native-indicators';

const Cart = ({navigation}) => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {baseUrl} = useBaseUrl();
  const cartUserId = '17c31860-7de6-4dab-954f-d9c8a5fa2504';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/cart/getcarts?uuid=${cartUserId}`,
        );
        const {cart_items} = response.data;
        setCartData(cart_items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const calculateTotalPrice = () => {
    return cartData.reduce(
      (total, item) => total + item.final_price * item.qty,
      0,
    );
  };

  const handleRemoveItem = async (cartId, cartItemId) => {
    try {
      await axios.delete(`${baseUrl}/api/cart/${cartId}/items/${cartItemId}`);
      const updatedCartData = cartData.filter(
        item => item.cart_item_id !== cartItemId,
      );
      setCartData(updatedCartData);
      showMessage({
        message: 'Item removed from cart',
        type: 'success',
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);

      console.log('Failed to remove item from cart');
    }
  };

  return (
    <View style={{backgroundColor: '#F7F7F7', width: '100%', height: '100%'}}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <BarIndicator color="#007AFF" />
        </View>
      ) : (
        <>
          <FlashMessage position="top" />
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
              Cart
            </Text>
            <View style={{width: 40}}></View>
          </View>
          <ScrollView style={{paddingTop: 10}}>
            {cartData.length > 0 ? (
              cartData.map(item => (
                <View
                  key={item.cart_item_id}
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    borderTopEndRadius: 10,
                    borderTopLeftRadius: 10,
                    height: 80,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.3,
                    borderBottomColor: 'gray',
                    marginTop: 10,
                    marginLeft: '5%',
                  }}>
                  <View
                    style={{
                      width: '20%',
                      height: '90%',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={{uri: baseUrl + item.thumbnail}}
                      style={{width: '90%', height: '90%', borderRadius: 10}}
                    />
                  </View>
                  <View
                    style={{
                      width: 'auto',
                      height: '80%',
                      flexDirection: 'column',
                      justifyContent: 'space-evenly',
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        marginLeft: 9,
                        fontWeight: '500',
                        color: 'black',
                      }}>
                      {item.product_name}
                    </Text>
                    <Text style={{marginLeft: 9, fontSize: 11, color: 'black'}}>
                      Size: {JSON.parse(item.variant_options)[1].option_text}
                    </Text>
                    <Text style={{fontSize: 12, marginLeft: 10}}>
                      Qty : {item.qty}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '24%',
                      height: '80%',
                      marginLeft: -20,
                      alignItems: 'center',
                      justifyContent: 'space-around',
                    }}>
                    <Text style={{color: '#00b33c', fontWeight: 'bold'}}>
                      QR {item.final_price * item.qty}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderLeftColor: '#bfbfbf',
                      borderLeftWidth: 0.2,
                      width: '20%',
                      height: '80%',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        handleRemoveItem(item.cart_id, item.cart_item_id)
                      }>
                      <Image
                        style={{tintColor: '#ff3333'}}
                        source={require('../Assets/Normal-IMG/delete.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View
                style={{
                  width: '100%',
                  height: 700,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{marginTop: '-30%', width: 200, height: 200}}
                  source={require('../Assets/Normal-IMG/empty-cart.png')}
                />
                <Text style={{fontSize: 30, color: 'black'}}>
                  Cart Is Empty
                </Text>
              </View>
            )}
            <View
              style={{
                alignItems: 'center',
                width: '100%',
                height: 150,
                // backgroundColor: 'red',
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <View
                style={{
                  width: '90%',
                  height: '80%',
                  backgroundColor: 'white',
                  alignContent: 'flex-start',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  borderRadius: 8,
                }}>
                <Text style={{marginLeft: '5%'}}>Apply coupons</Text>

                <View
                  style={{
                    borderTopWidth: 0.3,
                    borderTopColor: '#e3e3e3',
                    alignItems: 'center',
                    width: '100%',
                    height: '50%',
                    // backgroundColor: 'yellow',
                    justifyContent: 'space-evenly',
                    flexDirection: 'row',
                  }}>
                  <TextInput
                    // onChangeText={text => setCouponCode(text)}
                    // value={couponCode}
                    placeholder="Apply your coupons here..."
                    style={{
                      borderWidth: 0.2,
                      borderRadius: 1,
                      paddingLeft: 8,
                      width: '70%',
                      height: '75%',
                      backgroundColor: 'white',
                      borderColor: '#ababab',
                    }}
                  />
                  <TouchableOpacity
                    // onPress={handleApplyCoupon}
                    style={{
                      width: 70,
                      height: '65%',
                      backgroundColor: '#007AFF',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: 'white', textAlign: 'center'}}>
                        Apply
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View
              style={{
                alignItems: 'center',
                width: '100%',
                height: 280,
                // backgroundColor: 'red',
                justifyContent: 'flex-start',
                flexDirection: 'column',
              }}>
              <View
                style={{
                  width: '90%',
                  height: '100%',
                  backgroundColor: 'white',
                  // justifyContent:'space-around',
                  flexDirection: 'column',

                  borderRadius: 8,
                }}>
                <View
                  style={{
                    width: '100%',
                    height: 40,
                    // backgroundColor: 'yellow',
                    justifyContent: 'center',
                    borderBottomWidth: 0.3,
                    borderBlockColor: '#e3e3e3',
                  }}>
                  <Text style={{marginLeft: '5%'}}>Checkout</Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 40,
                    //  backgroundColor: 'green',
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.3,
                    borderBlockColor: '#e3e3e3',
                    paddingRight: 13,
                    paddingLeft: 13,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text style={{fontSize: 15, color: 'black'}}>
                    Your cart subtotal :
                  </Text>
                  <Text
                    style={{fontSize: 15, color: 'green', fontWeight: '400'}}>
                    {' '}
                    {calculateTotalPrice()}
                    {/* {calculateTotalAmount()} */}
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 40,
                    //  backgroundColor: 'green',
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.3,
                    borderBlockColor: '#e3e3e3',
                    paddingRight: 13,
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingLeft: 13,
                  }}>
                  <Text style={{fontSize: 15, color: 'black'}}>
                    Discount coupons :{' '}
                  </Text>
                  <Text
                    style={{fontSize: 15, color: 'green', fontWeight: '400'}}>
                    {/* {calculateCouponDiscount()} */}
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 40,
                    //  backgroundColor: 'green',
                    paddingRight: 13,
                    paddingLeft: 13,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderBottomWidth: 0.3,
                    borderBlockColor: '#e3e3e3',
                  }}>
                  <Text style={{fontSize: 15, color: 'black'}}>
                    Shipping Charge :
                  </Text>
                  <Text
                    style={{fontSize: 15, color: 'green', fontWeight: '400'}}>
                    Free
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    height: 40,
                    //  backgroundColor: 'green',
                    marginTop: 10,
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.3,
                    borderBlockColor: '#e3e3e3',
                    paddingRight: 13,
                    paddingLeft: 16,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{fontSize: 18, fontWeight: '600', color: 'black'}}>
                    Total :
                  </Text>
                  <Text
                    style={{fontSize: 20, color: 'green', fontWeight: '600'}}>
                    {/* QR {calculateTotalAmount() - calculateCouponDiscount()} */}
                  </Text>
                </View>

                <View
                  style={{
                    width: '100%',
                    height: 40,
                    // backgroundColor: 'red',
                    marginTop: '3%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Address')}>
                    {/* <TouchableOpacity onPress={onPressOpenRBSheet}> */}
                    <View
                      style={{
                        width: 120,
                        height: 40,
                        borderRadius: 4,
                        backgroundColor: '#007AFF',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: 'white', fontSize: 15}}>
                        Check Out
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View
              style={{
                height: 160,
                backgroundColor: 'red',
                marginTop: '10%',
              }}>
              <Footer />
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({});
