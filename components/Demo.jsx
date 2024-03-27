import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import {useCart} from './CartContext';

const ProductDetails = ({navigation}) => {
  const {activeCartUuid} = useCart();
  console.log(activeCartUuid, ':activeCartUuidactiveCartUuid');

  const route = useRoute();
  const {product} = route.params;
  console.log('producttttt  : ', product);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleSizeSelection = size => {
    setSelectedSize(size);
    setSelectedColor(null); 
  };

  const handleColorSelection = color => {
    setSelectedColor(color);
  };

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
          demooo
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
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, color: 'black'}}>Size</Text>
          <View
            style={{
              width: '80%',
              height: '90%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
              <TouchableOpacity
                key={size}
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    selectedSize === size ? '#64D2FF99' : 'white',
                  marginRight: 10,
                  borderWidth: 0.2,
                  borderColor: '#a6a6a6',
                }}
                onPress={() => handleSizeSelection(size)}>
                <Text style={{color: 'black', fontSize: 18}}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {selectedSize && (
          <View
            style={{
              width: '80%',
              height: 'auto',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 5,
              // backgroundColor: 'red',
            }}>
            {product.variants
              .filter(variant => variant.size === selectedSize)
              .map(variant => (
                <TouchableOpacity
                  key={variant.variantId}
                  style={{
                    width: 50,
                    height: 40,
                    borderRadius: 8,
                    backgroundColor: variant.color.toLowerCase(), // Convert to lowercase
                    borderWidth: 0.3,
                    borderColor: 'black',
                  }}
                  onPress={() => handleColorSelection(variant.color)}>
                  {selectedColor === variant.color && (
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#64D2FF99',
                      }}>
                      <Text style={{color: 'black'}}>{variant.color}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});
