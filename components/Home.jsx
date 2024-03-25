import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import React, {useState} from 'react';
import Slider from '@react-native-community/slider';
import HomeDatas from './HomeDatas';
import Drawer from './Drawer';
import Profile from './Profile';

import Footer from './Footer';

const Home = ({navigation}) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const menuAnimation = new Animated.Value(0);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  Animated.timing(menuAnimation, {
    toValue: isMenuVisible ? 0 : 1,
    duration: 300,
    useNativeDriver: false,
  }).start();

  const menuTranslateX = menuAnimation.interpolate({
    inputRange: [-1, 0],
    outputRange: [500, 0],
  });

  //Profile Drawer

  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const profileAnimation = new Animated.Value(0);

  const profileToggleMenu = () => {
    setProfileMenuVisible(!profileMenuVisible);
  };
  Animated.timing(profileAnimation, {
    toValue: profileMenuVisible ? 0 : 1,
    duration: 300,
    useNativeDriver: false,
  }).start();

  const profileTranslatex = profileAnimation.interpolate({
    inputRange: [-1, 0],
    outputRange: [500, 0],
  });

  //Filter
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

  // Search
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = query => {
    if (query.trim() === '') {
      setSuggestions([]);
    } else {
      const matchingProducts = product.filter(item =>
        item.sku.toLowerCase().includes(query.toLowerCase()),
      );
      setSuggestions(matchingProducts);
    }
  };

  const selectSuggestion = suggestion => {
    if (suggestion) {
      setSearchQuery(suggestion.sku);
      setSuggestions([]);
      setSelectedProduct(suggestion);
    } else {
      setSearchQuery('');
      setSuggestions([]);
      setSelectedProduct(null);
    }
  };

  return (
    <View style={{backgroundColor: '#F7F7F7'}}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          height: 60,
          //   backgroundColor: 'gray',
        }}>
        <View
          style={{
            width: '20%',
            height: '90%',
            // backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={toggleMenu}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 5,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{width: '70%', height: '70%', tintColor: '#FF375F'}}
                source={require('../Assets/Normal-IMG/drowwer.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '60%',
            height: '100%',
            // backgroundColor: 'yellow',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{width: 200, height: 40}}
              source={require('../Assets/Logo/logo.png')}
            />
            {/* <Image style={{width:180,height:50}} source={require('../Assets/Logo/newLogo.png')}/> */}

            {/* 
          <Text style={{fontSize: 22, fontWeight: 'bold', color: 'black'}}>
            Home
          </Text> */}
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: '20%',
            height: '100%',
          }}
          onPress={profileToggleMenu}>
          <View
            style={{
              width: '100%',
              height: '100%',
              // backgroundColor: 'red',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'white',
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{width: 25, height: 25}}
                source={require('../Assets/Normal-IMG/profile.png')}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        style={{
          position: 'absolute',
          left: menuTranslateX,
          top: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          zIndex: 5,
          elevation: 5,
        }}>
        <Drawer navigation={navigation} toggleMenu={toggleMenu} />
      </Animated.ScrollView>

      {/* Prifle Drawer */}
      <Animated.ScrollView
        style={{
          position: 'absolute',
          right: profileTranslatex,
          top: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          zIndex: 5,
          elevation: 5,
        }}>
        <Profile
          navigation={navigation}
          profileToggleMenu={profileToggleMenu}
        />
      </Animated.ScrollView>

      <ScrollView>
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
              <ScrollView>
                {suggestions.map(suggestion => (
                  <TouchableOpacity
                    style={{width: '100%'}}
                    key={suggestion.id}
                    onPress={() => selectSuggestion(suggestion)}>
                    <View style={{padding: 10}}>
                      <Text>{suggestion.title}</Text>
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
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
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
            </View>
          </View>
        )}

        <ScrollView
          horizontal
          pagingEnabled
          decelerationRate="fast"
          snapToInterval={560}
          style={{width: '100%', height: 190}}>
          <View
            style={{
              marginTop: 20,
              width: 360,
              height: 150,
              // backgroundColor: 'yellow',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                alignItems: 'flex-end',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                height: '95%',
              }}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  borderRadius: 4,
                }}
                source={require('../Assets/add-Banner/banner-one.png')}
              />

              <View
                style={{
                  alignItems: 'flex-start',
                  width: '50%',
                  height: 40,
                  // backgroundColor: 'red',
                  position: 'absolute',
                  marginLeft: '5%',
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
                  <View
                    style={{
                      borderRadius: 2,
                      width: 80,
                      height: 27,
                      backgroundColor: 'black',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: 'white',
                        textAlign: 'center',
                      }}>
                      Shop Now
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
              width: 360,
              height: 150,
              // backgroundColor: 'yellow',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                alignItems: 'flex-end',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%',
                height: '95%',
              }}>
              <Image
                style={{
                  borderRadius: 4,
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                }}
                source={require('../Assets/add-Banner/banner-two.png')}
              />
              <View
                style={{
                  alignItems: 'flex-start',
                  width: '50%',
                  height: 40,
                  // backgroundColor: 'red',
                  position: 'absolute',
                  marginLeft: '5%',
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
                  <View
                    style={{
                      borderRadius: 2,
                      width: 80,
                      height: 27,
                      backgroundColor: 'black',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: 'white',
                        textAlign: 'center',
                      }}>
                      Shop Now
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        <ScrollView
          horizontal
          style={{
            width: '100%',
            height: 80,
            //  backgroundColor: 'gray'
          }}>
          <View
            style={{
              width: '100%',
              padding: 10,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: 138,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 8,
                margin: 10,
                height: 50,
                backgroundColor: 'white',
              }}>
              <Image
                style={{
                  width: 40,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                  height: '100%',
                }}
                source={require('../Assets/Kandora/kandora-one.webp')}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  fontWeight: 'bold',
                  margin: 10,
                }}>
                ArabElegance
              </Text>
            </View>
            <View
              style={{
                width: 138,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 8,
                margin: 10,
                height: 50,
                backgroundColor: 'white',
              }}>
              <Image
                style={{
                  width: 40,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                  height: '100%',
                }}
                source={require('../Assets/Kandora/kandora-two.jpg')}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  fontWeight: 'bold',
                  margin: 10,
                }}>
                MajesticThreads
              </Text>
            </View>
            <View
              style={{
                width: 138,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 8,
                margin: 10,
                height: 50,
                backgroundColor: 'white',
              }}>
              <Image
                style={{
                  width: 40,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                  height: '100%',
                }}
                source={require('../Assets/Kandora/kandora-three.webp')}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  fontWeight: 'bold',
                  margin: 10,
                }}>
                RoyalAttire
              </Text>
            </View>
            <View
              style={{
                width: 138,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 8,
                margin: 10,
                height: 50,
                backgroundColor: 'white',
              }}>
              <Image
                style={{
                  width: 40,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                  height: '100%',
                }}
                source={require('../Assets/Kandora/kandora-four.jpg')}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  fontWeight: 'bold',
                  margin: 10,
                }}>
                LuxeLooms
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* <View
          style={{
            width: '100%',
            height: 70,
            // backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 17,
          }}>
          <Text style={{fontSize: 18, color: 'black', fontWeight: '600'}}>
            Favourite Orders
          </Text>
        </View> */}

        {/* <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            height: 180,
            //            backgroundColor: 'red',
          }}>
          <View style={styles.card}>
            <Carousel
              style={styles.caro}
              layout={'stack'}
              layoutCardOffset={12}
              data={all_products.slice(10, 20)}
              sliderWidth={200}
              itemWidth={250}
              renderItem={CarouselItem}
              loop={true}
            />
          </View>

          <View style={styles.card}>
            <Carousel
              style={styles.caro}
              layout={'stack'}
              layoutCardOffset={12}
              data={all_products.slice(0, 10)}
              sliderWidth={250}
              itemWidth={250}
              renderItem={CarouselItem}
              loop={true}
            />
          </View>
        </View> */}

        <HomeDatas
          sliderValue={sliderValue}
          selectedProduct={selectedProduct}
        />

        <Footer />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  card: {
    width: '45',
    height: 150,
    borderRadius: 10,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselItem: {
    width: 130,
    height: 130,
    borderRadius: 15,
    backgroundColor: '#f2f2f2',

    marginLeft: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  carouselImage: {
    width: 120,
    height: 120,
  },
});
