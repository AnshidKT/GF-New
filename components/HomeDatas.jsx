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

const HomeDatas = ({sliderValue}) => {
  const {baseUrl} = useBaseUrl();
  const navigation = useNavigation();
  const [product, setProduct] = useState([]);
  const [collectionName, setCollectionName] = useState('');

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
        setProduct(responseData.collections[0].products);
        setCollectionName(responseData.collections[0].name);
      } else {
        console.error('Response is not JSON');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
          {collectionName}
        </Text>

        <TouchableOpacity onPress={handleViewAllToShop}>
          <Text style={{fontSize: 14, color: '#0099ff'}}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={{marginBottom: 20, width: '100%'}}>
        <FlatList
          style={{padding: 10}}
          data={product}
          numColumns={2}
          keyExtractor={item => item.productId.toString()}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => handleProductDetails(item)}
                style={{
                  width: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                key={item.productId}>
                <View
                  style={{
                    width: 150,
                    margin: 10,
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
                      uri: `${baseUrl}${item.listingImage}`,
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
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 15,
                        fontWeight: '600',
                      }}>
                      QR : {parseFloat(item.price).toFixed(2)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default HomeDatas;

const styles = StyleSheet.create({});
