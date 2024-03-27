import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useBaseUrl} from './BaseUrlContext';
import {BarIndicator} from 'react-native-indicators';
import Slider from '@react-native-community/slider';
import { useCart } from './CartContext';
const Shopping = () => {
  const {currency} = useCart();
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
      // console.log("data : ",data);
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



  //Search 

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = query => {
    if (query.trim() === '') {
      setSuggestions([]);
      if (selectedCategory) {
        const currentCategory = categories.find(
          category => category.categoryId === selectedCategory.categoryId,
        );
        setSelectedCategory(currentCategory);
      }
    } else {
      const matchingProducts =
        selectedCategory && selectedCategory.products
          ? selectedCategory.products.filter(item =>
              item.name.toLowerCase().includes(query.toLowerCase()),
            )
          : [];
      console.log('Matching Products:', matchingProducts);
      const filteredSuggestions = matchingProducts
        .slice(0, 4)
        .map(product => ({id: product.productId, title: product.name}));

      setSuggestions(filteredSuggestions);
      console.log('Suggestions:', filteredSuggestions);
    }
  };

  const selectSuggestion = suggestion => {
    if (suggestion) {
      setSearchQuery(suggestion.title);
      setSuggestions([]);
      setSelectedProduct(suggestion);
      const selectedProductData = selectedCategory.products.filter(
        product => product.sku.toLowerCase() === suggestion.title.toLowerCase(),
      );
      setSelectedCategory(prevState => ({
        ...prevState,
        products: selectedProductData,
      }));
    } else {
      setSearchQuery('');
      setSuggestions([]);
      setSelectedProduct(null);
    }
  };


  //filter

  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  const onValueChange = value => {
    setSliderValue(value);
  };
  const toggleFilterDropdown = () => {
    setFilterDropdownOpen(!filterDropdownOpen);
  };
  const filterDropdownData = [
    {id: 0, label: 'Price'},
    {id: 1, label: '0 to 500'},
    {id: 2, label: '500 to 1500'},
  ];

  const handlePriceFilter = () => {
    let min, max;
    if (sliderValue === 1) {
      min = 0;
      max = 500;
    } else if (sliderValue === 2) {
      min = 500;
      max = 1500;
    } else {
      min = 0;
      max = 0; 
    }
    const filteredProducts = selectedCategory.products.filter(
      product => product.price >= min && (max === 0 || product.price < max),
    );
    setSelectedCategory(prevState => ({
      ...prevState,
      products: filteredProducts,
    }));
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

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: 60,
              // backgroundColor: 'white',
            }}>
            <View
              style={{
                width: '90%',
                height: 50,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                // backgroundColor: 'gray',
              }}>
              <View
                style={{
                  width: '83%',
                  height: '80%',
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 8,
                }}>
                <TextInput
                  style={{
                    width: '88%',
                    height: '100%',
                    // backgroundColor: 'red',
                    paddingLeft: 20,
                    fontSize: 16,
                    borderRadius: 8,
                  }}
                  value={searchQuery}
                  onChangeText={text => {
                    setSearchQuery(text);
                    handleSearch(text);
                  }}
                  placeholder="Search.."
                  placeholderTextColor="gray"
                />

                <TouchableOpacity
                  onPress={() => selectSuggestion(suggestions[0])}>
                  <Image source={require('../Assets/Normal-IMG/search.png')} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={toggleFilterDropdown}>
                <View
                  style={{
                    width: 38,
                    height: 38,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FF375F',
                    borderRadius: 5,
                  }}>
                  <Image
                    style={{tintColor: 'white', width: 30, height: 30}}
                    source={require('../Assets/Normal-IMG/filter.png')}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {suggestions.length > 0 && (
            <View
              style={{
                width: '100%',
                height: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: '90%',
                  height: 'auto',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  borderRadius: 10,
                }}>
                <ScrollView style={{width: '100%'}}>
                  {suggestions.map(suggestion => (
                    <TouchableOpacity
                      style={{width: '100%'}}
                      key={suggestion.id}
                      onPress={() => selectSuggestion(suggestion)}>
                      <View style={{padding: 7}}>
                        <Text style={{color: 'black'}}>{suggestion.title}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          )}
          {filterDropdownOpen && (
            <View
              style={{
                width: '100%',
                height: 90,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '90%',
                  height: '90%',
                  backgroundColor: 'white',
                  borderRadius: 10,
                  elevation: 1,
                }}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                  {filterDropdownData[sliderValue]?.label || ''}
                </Text>
                <Slider
                  style={{width: '80%', height: 25}}
                  minimumValue={0}
                  maximumValue={2}
                  step={1}
                  minimumTrackTintColor="red"
                  maximumTrackTintColor="gray"
                  thumbTintColor="#FF375F"
                  value={sliderValue}
                  onValueChange={onValueChange}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: '#FF375F',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 25,
                    marginBottom: 7,
                    borderRadius:3
                  }}
                  onPress={handlePriceFilter}>
                  <Text style={{color:'white'}}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

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
                            {currency} : {parseFloat(item.price).toFixed(2)}
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
