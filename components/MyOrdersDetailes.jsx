// import {
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   Image,
//   View,
//   ScrollView,
// } from 'react-native';
// import React from 'react';

// const MyOrdersDetailes = ({navigation, route}) => {
//   const {orderDetails} = route.params;

//   return (
//     <View>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.navigate('MyOrders')}>
//           <View style={styles.backButton}>
//             <Image
//               style={styles.backIcon}
//               source={require('../Assets/Normal-IMG/left-arrow.png')}
//             />
//           </View>
//         </TouchableOpacity>

//         <Text style={styles.headerText}>Orders Details</Text>

//         <View style={styles.placeholder}></View>
//       </View>

//       <ScrollView>
//         <View style={{paddingRight: 20, paddingLeft: 20, marginTop: 30}}>
//           <View
//             style={{
//               width: '100%',
//               height: 150,
//               backgroundColor: 'white',
//               padding: 10,
//               flexDirection: 'row',
//               borderRadius: 8,
//             }}>
//             <View
//               style={{
//                 width: '35%',
//                 height: '100%',
//                 // backgroundColor: 'red',
//                 padding: 10,
//               }}>
//               <Text style={{fontSize: 16}}>Addresses:</Text>
//             </View>

//             <View
//               style={{
//                 width: '65%',
//                 height: '100%',
//                 // backgroundColor: 'yellow',
//                 padding: 10,
//               }}>
//               {orderDetails.address.map((addressItem, addressIndex) => (
//                 <View key={addressIndex}>
//                   <Text style={{fontSize: 18, fontWeight: '500'}}>
//                     {addressItem.name}
//                   </Text>
//                   <Text style={{fontSize: 15}}>{addressItem.mobileNo}</Text>
//                   <Text style={{fontSize: 15}}>
//                     {addressItem.houseNo} , {addressItem.landmark}
//                   </Text>
//                   <Text style={{fontSize: 15}}>{addressItem.street}</Text>

//                   <Text style={{fontSize: 15}}>{addressItem.postalCode}</Text>
//                 </View>
//               ))}
//             </View>
//           </View>
//         </View>

//         <View
//           style={{
//             width: '100%',
//             height: 'auto',
//             // backgroundColor: 'red',
//             paddingRight: 20,
//             paddingLeft: 20,
//           }}>
//           <View
//             style={{
//               width: '100%',
//               height: 'auto',
//               backgroundColor: 'white',
//               padding: 10,
//               borderBottomLeftRadius: 8,
//               borderBottomRightRadius: 8,
//             }}>
//             <View
//               style={{
//                 width: '100%',
//                 paddingLeft: 10,
//                 height: 30,
//                 // backgroundColor: 'yellow',
//               }}>
//               <Text style={{fontSize: 16}}>Order Items</Text>
//             </View>

//             {orderDetails.cartItems.map((cartItem, cartIndex) => (
//               <View
//                 style={{
//                   // backgroundColor: 'red',
//                   paddingLeft: 10,
//                   paddingRight: 10,
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   height: 60,
//                   marginTop: 8,
//                   flexDirection: 'row',
//                   borderRadius: 2,
//                   borderWidth: 0.1,
//                   borderColor: 'gray',
//                 }}
//                 key={cartIndex}>
//                 <Image
//                   style={{width: '20%', height: '80%'}}
//                   source={cartItem.image}
//                 />

//                 <Text>{cartItem.title}</Text>
//                 <Text>{cartItem.size}</Text>
//                 <Text>Qty {cartItem.quantity}</Text>
//                 <Text>QR {cartItem.price}</Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         <View style={{height: 100}}></View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   headerContainer: {
//     width: '100%',
//     height: 60,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     paddingLeft: 20,
//     paddingRight: 20,
//   },
//   backButton: {
//     width: 40,
//     borderRadius: 6,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 40,
//     backgroundColor: '#ffffff',
//   },
//   backIcon: {
//     width: 20,
//     height: 20,
//   },
//   headerText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   placeholder: {
//     width: 40,
//   },
// });

// export default MyOrdersDetailes;
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MyOrdersDetailes = () => {
  return (
    <View>
      <Text>MyOrdersDetailes</Text>
    </View>
  )
}

export default MyOrdersDetailes

const styles = StyleSheet.create({})