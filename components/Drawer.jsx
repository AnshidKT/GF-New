import {
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';

const Drawer = ({navigation, drawerRef, toggleMenu}) => {
  const [isShopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [isPagesDropdownOpen, setPagesDropdownOpen] = useState(false);

  const toggleShopDropdown = () => {
    setShopDropdownOpen(!isShopDropdownOpen);
  };

  const togglePagesDropdown = () => {
    setPagesDropdownOpen(!isPagesDropdownOpen);
  };

  const shopDropdownData = [
    {id: 2, label: 'Product', link: 'Shop'},
    {id: 3, label: 'Shop Category', link: 'Shop'},
  ];
  const pagesDropdownData = [
    {id: 1, label: 'Cart', link: 'Cart'},
    {id: 2, label: 'Order', link: 'Shop'},
    {id: 3, label: 'Login', link: 'SignIn'},
    {id: 4, label: 'Register', link: 'SignUp'},
    // Add more options as needed
  ];

  return (
    <View style={{backgroundColor: '#f2f2f2'}}>
      <View
        style={{
          width: '100%',
          height: 80,
          //   backgroundColor: 'red',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Text
          style={{fontWeight: 'bold', color: '#ff9933', fontStyle: 'italic'}}>
          New{' '}
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: '#ff9933',
              fontStyle: 'italic',
            }}>
            Golden
          </Text>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: '#ff9933',
              fontStyle: 'italic',
            }}>
            {' '}
            Feather
          </Text>
        </Text>

        {/* <TouchableOpacity onPress={() => drawerRef.current.closeDrawer()}> */}
        <TouchableOpacity onPress={toggleMenu}>
          {/* //closedrwer */}
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
      </View>

      <View
        style={{
          width: '100%',
          height: 60,
          //   backgroundColor: 'yellow',
          justifyContent: 'center',
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <TouchableOpacity onPress={toggleMenu}>
          <Text style={{color: 'black', fontSize: 17}}>Home</Text>
        </TouchableOpacity>
      </View>

      <View>
        {/* Shop Dropdown */}
        <TouchableOpacity onPress={toggleShopDropdown}>
          <View
            style={{
              width: '100%',
              height: 60,
              justifyContent: 'space-between',
              paddingLeft: 20,
              paddingRight: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontSize: 17}}>Shop</Text>

            {isShopDropdownOpen ? (
              <Image
                style={{tintColor: '#FF375F'}}
                source={require('../Assets/Normal-IMG/minus.png')}
              />
            ) : (
              <Image
                style={{tintColor: '#FF375F'}}
                source={require('../Assets/Normal-IMG/plus.png')}
              />
            )}
          </View>
        </TouchableOpacity>

        {isShopDropdownOpen && (
          <FlatList
            data={shopDropdownData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  switch (item.link) {
                    case 'Shop':
                      navigation.navigate('Shop');
                      break;
                    case 'ProductDetails':
                      navigation.navigate('Shop');
                      break;
                    default:
                      break;
                  }
                }}>
                <View style={{paddingLeft: 20, paddingTop: 10}}>
                  <Text style={{color: 'black', fontSize: 13}}>
                    {item.label}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}

        {/* Pages Dropdown */}
        <TouchableOpacity onPress={togglePagesDropdown}>
          <View
            style={{
              width: '100%',
              height: 60,
              justifyContent: 'space-between',
              paddingLeft: 20,
              paddingRight: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontSize: 17}}>Pages</Text>

            {isPagesDropdownOpen ? (
              <Image
                style={{tintColor: '#FF375F'}}
                source={require('../Assets/Normal-IMG/minus.png')}
              />
            ) : (
              <Image
                style={{tintColor: '#FF375F'}}
                source={require('../Assets/Normal-IMG/plus.png')}
              />
            )}
          </View>
        </TouchableOpacity>

        {isPagesDropdownOpen && (
          <FlatList
            data={pagesDropdownData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  switch (item.link) {
                    case 'Cart':
                      navigation.navigate('Cart');
                      break;
                    case 'Shop':
                      navigation.navigate('Shop');
                      break;
                    case 'SignIn':
                      navigation.navigate('SignIn');
                      break;
                    case 'SignUp':
                      navigation.navigate('SignUp');
                      break;
                    default:
                      break;
                  }
                }}>
                <View style={{paddingLeft: 20, paddingTop: 10}}>
                  <Text style={{color: 'black', fontSize: 13}}>
                    {item.label}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <View
        style={{width: '100%', height: 400, paddingLeft: 20, paddingTop: 40}}>
        <Text style={{fontSize: 14, color: 'black', fontStyle: 'italic'}}>
          Address: Clothes and fabric wholesaler in Doha, Qatar
        </Text>
        <Text style={{fontSize: 14, color: 'black', fontStyle: 'italic'}}>
          Call Us: +974 5551 1897
        </Text>
        <Text style={{fontSize: 14, color: 'black', fontStyle: 'italic'}}>
          Email: goldenfeather@mail.com
        </Text>
      </View>
    </View>
  );
};

export default Drawer;

const styles = StyleSheet.create({});
