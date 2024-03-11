import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useBaseUrl} from './BaseUrlContext';
import {BarIndicator} from 'react-native-indicators';

const Shopping = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const {baseUrl} = useBaseUrl();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/products/allcategory`);
      const data = await response.json();
      setCategories(data.categories);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryPress = category => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const menCategory = categories.find(category => category.name === 'Men');
    setSelectedCategory(menCategory);
  }, [categories]);

  const navigation = useNavigation();

  const handleProductPress = item => {
    navigation.navigate('ProductDetails', {product: item});
  };

  return (
    <View style={{backgroundColor: '#F7F7F7', height: '100%', width: '100%'}}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <BarIndicator color="#007AFF" />
        </View>
      ) : (
        <>
          <View
            style={{
              width: '100%',
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              elevation: 2,
            }}>
            <View
              style={{
                width: '100%',
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 22, fontWeight: 'bold', color: 'black'}}>
                Shop
              </Text>
            </View>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: 'row',
              }}>
              {categories.map(category => (
                <TouchableOpacity
                  key={category.categoryId}
                  onPress={() => handleCategoryPress(category)}>
                  <Text
                    style={[
                      {
                        fontSize: 18,
                        fontWeight:
                          selectedCategory === category ? '400' : '300',
                        color:
                          selectedCategory === category ? '#FF375F' : '#748c94',
                      },
                    ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <ScrollView>
            <View style={{width: '100%', height: 'auto'}}>
              {selectedCategory && selectedCategory.image && (
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 130,
                  }}>
                  <Image
                    source={{uri: `${baseUrl}${selectedCategory.image}`}}
                    style={{
                      width: '90%',
                      objectFit: 'fill',
                      height: '85%',
                      borderRadius: 5,
                    }}
                  />
                </View>
              )}
              {selectedCategory &&
              selectedCategory.products &&
              selectedCategory.products.length > 0 ? (
                <FlatList
                  numColumns={2}
                  data={selectedCategory.products.filter(
                    product => product.visibility === true,
                  )}
                  keyExtractor={item => item.productId.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={{
                        width: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      key={item.productId}
                      onPress={() => handleProductPress(item)}>
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
                            uri: `${baseUrl}${item.thumbImage}`,
                          }}
                          onError={error =>
                            console.error('Image loading error:', error)
                          }
                        />

                        <View
                          style={{
                            width: '90%',
                            height: 70,
                            // backgroundColor: 'red',
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
                              // backgroundColor: 'black',
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
                  )}
                />
              ) : (
                <View style={{width: '100%', height: '100%'}}>
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 130,
                    }}>
                    <Text style={{fontSize: 20, fontStyle: 'italic'}}>
                      Coming soon...
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Shopping;

const styles = StyleSheet.create({});
