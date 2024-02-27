import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';

import FlashMessage, {
  showMessage,
  hideMessage,
} from 'react-native-flash-message';
import {useBaseUrl} from './BaseUrlContext';

const ProductDetails = ({navigation}) => {
  const {baseUrl} = useBaseUrl();

  const route = useRoute();
  const {product} = route.params;
  console.log('producttttt  : ', product);

  const showAddedToCart = () => {
    showMessage({
      message: 'Added To Cart',
      type: 'success',
    });
  };

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSizeSelection = size => {
    setSelectedSize(size);
  };

  //Add To Cart

  const handleToAdmin = async item => {
    console.log('Selected Size:', selectedSize);

    const userItem = {
      sku: item.sku,
      qty: quantity,
      variant_options: selectedSize,
    };

    try {
      const response = await fetch(
        `${baseUrl}/api/cart/02010c86-bccd-41df-acfe-d800277feb72/items`,
        // /  /  /  /  /  /  /   /   /   / {id} // / / / / / / / / / / /
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userItem),
        },
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Item added successfully to cart:', data);
        showAddedToCart();
      } else {
        console.error(
          'Failed to add item to cart:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error('Error occurred while adding item to cart:', error);
    }
  };

  const renderSizeButton = size => (
    <TouchableOpacity
      key={size}
      style={{
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: selectedSize === size ? '#64D2FF99' : 'white',
        marginRight: 10,
        borderWidth: 0.2,
        borderColor: '#a6a6a6',
      }}
      onPress={() => handleSizeSelection(size)}>
      <Text style={{color: 'black', fontSize: 18}}>{size}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
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
          Product Details
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <View
            style={{
              width: 40,
              backgroundColor: 'white',
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
            }}>
            <Image
              style={{tintColor: '#FF375F', width: 25, height: 25}}
              source={require('../Assets/Normal-IMG/cart.png')}
            />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View
          style={{
            width: '100%',
            height: 240,
            paddingTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '90%',

              height: '100%',
              //   backgroundColor: 'white',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{width: '80%', height: '80%'}}
              source={{
                uri: `${baseUrl}${product.listingImage}`,
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <View
            style={{
              width: '90%',

              height: 'auto',
              //   backgroundColor: 'white',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '100%',
                height: 60,
                // backgroundColor: 'yellow',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontStyle: 'italic',
                  fontWeight: 'bold',
                  color: '#007AFF',
                }}>
                {product.name}
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                height: 60,
                flexDirection: 'row',

                // backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 18, color: 'black'}}>Size</Text>
              <View
                style={{
                  width: '80%',
                  height: '90%',
                  flexDirection: 'row',
                  //   backgroundColor: 'yellow',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                {['S', 'M', 'L', 'XL', 'XXL'].map(size =>
                  renderSizeButton(size),
                )}
              </View>
            </View>

            <View
              style={{
                width: '100%',
                height: 60,
                flexDirection: 'row',

                // backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Text style={{fontSize: 18, color: 'black'}}>QTY</Text>

              <View
                style={{
                  width: '62%',
                  height: '100%',
                  //   backgroundColor: 'yellow',
                  flexDirection: 'row',

                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={handleDecrement}
                  style={{
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 0.2,
                    borderColor: '#a6a6a6',
                    backgroundColor: 'white',
                  }}>
                  <Text style={{color: 'black', fontSize: 30}}>-</Text>
                </TouchableOpacity>

                <View
                  style={{
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 0.2,
                    borderColor: '#a6a6a6',
                    backgroundColor: 'white',
                    margin: 8,
                  }}>
                  <Text style={{color: 'black', fontSize: 18}}>{quantity}</Text>
                </View>

                <TouchableOpacity
                  onPress={handleIncrement}
                  style={{
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 0.2,
                    borderColor: '#a6a6a6',
                    backgroundColor: 'white',
                  }}>
                  <Text style={{color: 'black', fontSize: 18}}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                height: 'auto',
                // backgroundColor: 'red',
                justifyContent: 'flex-start',
              }}>
              <Text style={{fontSize: 15, color: '#000000', letterSpacing: 1}}>
                {product.description.replace(/<\/?[^>]+(>|$)/g, '')}
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                height: 100,
                // backgroundColor: 'yellow',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 28, color: '#007AfF', fontWeight: '600'}}>
                QR: {parseFloat(product.price).toFixed(2)}
              </Text>

              <TouchableOpacity onPress={() => handleToAdmin(product)}>
                <View
                  style={{
                    width: 160,
                    height: 50,
                    backgroundColor: '#007AFF',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    borderRadius: 3,
                  }}>
                  <Image
                    style={{tintColor: 'white', width: 25, height: 25}}
                    source={require('../Assets/Normal-IMG/cart.png')}
                  />
                  <Text
                    style={{fontSize: 18, color: 'white', fontWeight: '600'}}>
                    Add To Cart
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* <View
            style={{
              width: '100%',
              height: 60,
              alignItems: 'center',
            }}>
            <TouchableOpacity
             

              style={{
                width: '100%',
                height: 50,
              }}>
              <View
                style={{
                  width: '100%',
                  height: 50,
                  backgroundColor: '#FF375F',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 3,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    letterSpacing: 2,
                    color: 'white',
                    fontWeight: '500',
                  }}>
                  Buy Now
                </Text>
              </View>
            </TouchableOpacity>
          </View> */}

            <View
              style={{
                width: '100%',
                height: 100,
              }}></View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});
