// import React, {useContext, useEffect, useState} from 'react';
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   FlatList,
// } from 'react-native';
// import {UserType} from './UserContext';
// import {BarIndicator} from 'react-native-indicators';

// const Favourite = ({navigation}) => {
//   const {userId} = useContext(UserType);
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchFavorites = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `http://192.168.1.38:3000/getFavorites/${userId}`,
//       );
//       const favoritesData = await response.json();
//       setFavorites(favoritesData);
//     } catch (error) {
//       console.error('Error fetching favorites:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFavorites();
//   }, [userId]);

//   const navigateToProductDetails = selectedProduct => {
//     console.log('Product in Favourite:', selectedProduct);
//     navigation.navigate('ProductDetails', {product: selectedProduct});
//   };

//   const renderItem = ({item}) => {
//     if (!item || typeof item.productId === 'undefined') {
//       console.error('Error: Item or productId is undefined', item);
//       return null;
//     }
//     return (
//       <TouchableOpacity
//         onPress={() => navigateToProductDetails(item)}
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           margin: 12,
//         }}>
//         <View
//           style={{
//             width: '100%',
//             height: 150,
//             backgroundColor: 'white',
//             borderRadius: 8,
//             elevation: 1,
//             alignItems: 'center',
//             justifyContent: 'center',
//             flexDirection: 'column',
//           }}>
//           <Image style={{width: '70%', height: 90}} source={item.image} />
//           <View
//             style={{
//               width: '90%',
//               height: 40,
//               flexDirection: 'column',
//               alignItems: 'center',
//               justifyContent: 'space-evenly',
//             }}>
//             <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
//               {item.title}
//             </Text>
//             <Text style={{color: 'black', fontSize: 15, fontWeight: '600'}}>
//               ${item.price}
//             </Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={{backgroundColor: '#F7F7F7', width: '100%', height: '100%'}}>
//       {loading ? (
//         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//           <BarIndicator color="#007AFF" />
//         </View>
//       ) : (
//         <View>
//           <View
//             style={{
//               width: '100%',
//               height: 60,
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               flexDirection: 'row',
//               paddingLeft: 10,
//             }}>
//             <TouchableOpacity onPress={() => navigation.navigate('Index')}>
//               <View
//                 style={{
//                   width: 40,
//                   borderRadius: 6,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   height: 40,
//                   backgroundColor: '#ffffff',
//                 }}>
//                 <Image
//                   style={{width: 20, height: 20}}
//                   source={require('../Assets/Normal-IMG/left-arrow.png')}
//                 />
//               </View>
//             </TouchableOpacity>

//             <Text style={{fontSize: 22, fontWeight: 'bold', color: 'black'}}>
//               My Favourites
//             </Text>

//             <View
//               style={{
//                 width: 40,
//               }}></View>
//           </View>
//           {/* <View style={{height: 300}}></View> */}

//           {favorites.length === 0 ? (
//             <View
//               style={{
//                 width: '100%',
//                 height: 600,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 flexDirection: 'column',
//                 // backgroundColor: 'red',
//               }}>
//               <View style={{width: '70%', height: 90, alignItems: 'center'}}>
//                 <Text style={{fontSize: 18, fontWeight: 'bold'}}>
//                   No favourites yet!
//                 </Text>
//                 <Text
//                   style={{color: 'gray', textAlign: 'center', fontSize: 16}}>
//                   See a dress you like? Save it to favorites!{' '}
//                 </Text>
//               </View>

//               <View
//                 style={{
//                   width: 220,
//                   height: 220,
//                   backgroundColor: '#e6e6e6',
//                   borderRadius: 200,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   margin: 5,
//                 }}>
//                 <Image
//                   style={{tintColor: 'white', width: 130, height: 130}}
//                   source={require('../Assets/Normal-IMG/fav-like.png')}
//                 />
//               </View>

//               <TouchableOpacity
//                 onPress={() => navigation.navigate('Home')}
//                 style={{
//                   width: 160,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   height: 50,
//                   borderWidth: 1,
//                   backgroundColor: 'white',
//                   borderColor: '#007AFF',
//                   marginTop: 30,
//                   borderRadius: 5,
//                 }}>
//                 <Text
//                   style={{
//                     textAlign: 'center',
//                     fontWeight: '700',
//                     color: '#007AFF',
//                   }}>
//                   START EXPLORING
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <FlatList data={favorites} renderItem={renderItem} numColumns={2} />
//           )}
//         </View>
//       )}
//     </View>
//   );
// };

// export default Favourite;

// const styles = StyleSheet.create({});
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Favourite = () => {
  return (
    <View>
      <Text>Favourite</Text>
    </View>
  )
}

export default Favourite

const styles = StyleSheet.create({})