import {
  FlatList,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useBaseUrl} from './BaseUrlContext';
import {useNavigation} from '@react-navigation/native';
import {useCart} from './CartContext';

const HomeDatas = ({sliderValue}) => {
  const {baseUrl} = useBaseUrl();
  const {currency, fetchCartData} = useCart();
  const navigation = useNavigation();
  const [collections, setCollections] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const fetchProductItems = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/products/allcollection`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Failed to fetch product items:', response.statusText);
        return;
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const responseData = await response.json();
        setCollections(responseData.collections);
      } else {
        console.error('Response is not JSON');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [currency]);

  useEffect(() => {
    fetchProductItems();
  }, []);

  useEffect(() => {
    fetchProductItems();
  }, []);

  const handleProductDetails = item => {
    navigation.navigate('ProductDetails', {product: item});
  };

  const handleViewAllToShop = () => {
    navigation.navigate('Shop');
  };

  return (
    <View>
      <View style={{marginBottom: 20, width: '100%'}}>
        <FlatList
          numColumns={1}
          data={collections}
          renderItem={({item: collection}) => (
            <View>
              <View
                style={{
                  width: '100%',
                  height: 60,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  paddingLeft: 30,
                  paddingRight: 30,
                }}>
                <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
                  {collection.name}
                </Text>

                <TouchableOpacity onPress={handleViewAllToShop}>
                  <Text style={{fontSize: 14, color: '#0099ff'}}>View All</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                style={{padding: 10}}
                data={collection.products}
                renderItem={({item: product}) => (
                  <TouchableOpacity
                    onPress={() => handleProductDetails(product)}
                    style={{
                      flex: 1,
                      margin: 5,
                      alignItems: 'center',
                    }}
                    key={product.productId}>
                    <View
                      style={{
                        width: 150,
                        height: 190,
                        backgroundColor: '#ffffff',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 8,
                        elevation: 2,
                      }}>
                      <Image
                        style={{width: 130, height: 90}}
                        source={{
                          uri: `${baseUrl}${product.listingImage}`,
                        }}
                        onError={error =>
                          console.error('Image loading error:', error)
                        }
                      />

                      <View
                        style={{
                          width: '90%',
                          height: 70,
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'space-evenly',
                        }}>
                        <View
                          style={{
                            width: '90%',
                            height: 18,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: -3,
                          }}>
                          <Image
                            style={{width: 13, margin: 2, height: 13}}
                            source={require('../Assets/Normal-IMG/star.png')}
                          />
                          <Image
                            style={{width: 13, margin: 2, height: 13}}
                            source={require('../Assets/Normal-IMG/star.png')}
                          />
                          <Image
                            style={{width: 13, margin: 2, height: 13}}
                            source={require('../Assets/Normal-IMG/star.png')}
                          />
                          <Image
                            style={{width: 13, margin: 2, height: 13}}
                            source={require('../Assets/Normal-IMG/star.png')}
                          />
                          <Image
                            style={{width: 13, margin: 2, height: 13}}
                            source={require('../Assets/Normal-IMG/star.png')}
                          />
                        </View>

                        <Text
                          style={{
                            color: 'black',
                            fontSize: 14,
                            fontWeight: '600',
                          }}>
                          {product.name}
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 15,
                            fontWeight: '600',
                          }}>
                          {currency} : {parseFloat(product.price).toFixed(1)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={product => product.productId.toString()}
                numColumns={2}
              />
            </View>
          )}
          keyExtractor={collection => collection.collectionId.toString()}
        />
      </View>
    </View>
  );
};

export default HomeDatas;

const styles = StyleSheet.create({});
