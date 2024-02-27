import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {UserType} from './UserContext';
import axios from 'axios';

import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import {useCart} from './CartContext';

const Profile = ({drawerRef, profileToggleMenu, navigation}) => {
  const {setUserDetails, userDetails} = useCart();
  const {userId, setUserId} = useContext(UserType);

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.38:3000/api/userDetails/${userId}`,
      );
      const fetchedUserDetails = response.data;

      setUserDetails(fetchedUserDetails);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  // const [imageSource, setImageSource] = useState(
  //   require('../Assets/Normal-IMG/add-person.png'),
  // );

  // const handleViewClick = async () => {
  //   try {
  //     const result = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.images],
  //     });

  //     if (result.uri) {
  //       setImageSource({uri: result.uri});
  //       console.log(imageSource, ': updated'); // Log the updated state
  //     }
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //     } else {
  //       console.error('Error picking document', err);
  //     }
  //   }
  // };

  const getFirstLetter = name => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  return (
    <View style={{backgroundColor: '#F7F7F7', width: '100%'}}>
      <ScrollView>
        <View
          style={{
            width: '100%',
            height: 60,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingLeft: 10,
          }}>
          <TouchableOpacity onPress={profileToggleMenu}>
            {/* <TouchableOpacity onPress={() => drawerRef.current.closeDrawer()}> */}
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
            Profile
          </Text>

          <View
            style={{
              width: 40,
            }}></View>
        </View>

        <View
          style={{
            width: '100%',
            height: 250,
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              width: '90%',
              height: '70%',
              borderRadius: 10,
              flexDirection: 'row',
              backgroundColor: 'white',
            }}>
            <View
              style={{
                width: '50%',
                height: '100%',
                flexDirection: 'column',
                // backgroundColor: 'yellow',
              }}>
              <View
                style={{
                  height: '35%',
                  width: '100%',
                  flexDirection: 'column',
                  // backgroundColor: 'green',
                }}>
                <Image
                  style={{width: '40%', height: '100%'}}
                  source={require('../Assets/Normal-IMG/profile-shape-1.jpg')}
                />
              </View>

              <View
                style={{
                  height: 'auto',
                  width: '100%',
                  flexDirection: 'column',
                  // backgroundColor: 'yellow',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                {/* <TouchableOpacity onPress={handleViewClick}> */}
                <View
                  style={{
                    width: 110,
                    height: 110,
                    backgroundColor: '#f2f2f2',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 100,
                    marginTop: '-22%',
                  }}>
                  {/* <Image
            style={{
              width: '80%',
              objectFit: 'contain',
              borderTopLeftRadius: 45,
              borderBottomLeftRadius: 45,
              borderTopRightRadius: 45,
              height: '80%',
            }}
            source={{
              uri: `https://place-hold.it/80x80/FFFFFF/000000&text=${getFirstLetter(
                userDetails.name
              )}`,
            }}
          /> */}
                  <Text
                    style={{
                      fontSize: 70,
                      fontWeight: '600',
                      color: '#333333',
                      textAlign: 'center',
                    }}>
                    {getFirstLetter(userDetails.name)}
                  </Text>
                </View>
                {/* </TouchableOpacity> */}
              </View>
            </View>

            <View
              style={{
                width: '50%',
                height: '100%',
                // backgroundColor: 'gray',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  width: '90%',
                  height: '40%',
                  // backgroundColor: 'green',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text style={{fontSize: 22, color: 'black'}}>
                  {userDetails.name}
                </Text>
                <Text style={{fontSize: 13, color: 'black'}}>
                  {userDetails.email}
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  height: '40%',
                  // backgroundColor: 'yellow',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}>
                <Image
                  style={{
                    width: '40%',
                    marginRight: '-2%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                  source={require('../Assets/Normal-IMG/profile-shape-2.jpg')}
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            paddingLeft: 20,
            height: 50,
            // backgroundColor: 'gray',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 18, color: 'black'}}>Settings</Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 20,
            height: 70,
            // backgroundColor: 'yellow',
          }}>
          <Image
            style={{margin: 10, width: 25, height: 25}}
            source={require('../Assets/Normal-IMG/profile.png')}
          />
          <Text style={{fontSize: 18, color: 'black'}}>Account Settings</Text>
        </View>

        <TouchableOpacity 
      // onPress={() => navigation.navigate('Favourite')}
        >
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
              height: 70,
              // backgroundColor: 'yellow',
            }}>
            <Image
              style={{margin: 10, width: 25, height: 25, tintColor: 'black'}}
              source={require('../Assets/Normal-IMG/fav-like.png')}
            />
            <Text style={{fontSize: 18, color: 'black'}}>My Favourites</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
        //onPress={() => navigation.navigate('MyOrders')}
        >
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
              height: 70,
              // backgroundColor: 'yellow',
            }}>
            <Image
              style={{margin: 10, width: 30, height: 30}}
              source={require('../Assets/Normal-IMG/my-order.png')}
            />
            <Text style={{fontSize: 18, color: 'black'}}>My Orders</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <View
            style={{
              width: '100%',
              borderTopWidth: 0.5,
              borderTopColor: 'gray',
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
              height: 70,
              // backgroundColor: 'yellow',
            }}>
            <Image
              style={{margin: 10, width: 25, height: 25}}
              source={require('../Assets/Normal-IMG/logout.png')}
            />
            <Text style={{fontSize: 18, color: 'black'}}>Log Out</Text>
          </View>
        </TouchableOpacity>
        <View style={{height: 80}}></View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
