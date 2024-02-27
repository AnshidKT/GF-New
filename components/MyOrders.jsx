// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Image,
//   ScrollView,
// } from 'react-native';
// import React, {useContext, useEffect, useState} from 'react';
// import {UserType} from './UserContext';
// import {BarIndicator} from 'react-native-indicators';

// const MyOrders = ({navigation}) => {
//   const [orderDetails, setOrderDetails] = useState([]);
//   const {userId} = useContext(UserType);
//   const [loading, setLoading] = useState(true);

//   const fetchOrderDetails = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `http://192.168.1.38:3000/orderDetails/${userId}`,
//       );
//       const data = await response.json();

//       if (response.status === 200) {
//         setOrderDetails(data);
//       } else {
//         console.error('Error fetching order details:', response);
//       }
//     } catch (error) {
//       console.error('Error fetching order details:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrderDetails();
//   }, []);
//   return (
//     <View>
//       {loading ? (
//         <View
//           style={{
//             width: '100%',
//             height: '100%',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <BarIndicator color="#007AFF" />
//         </View>
//       ) : (
//         <View>
//           <View style={styles.headerContainer}>
//             <TouchableOpacity onPress={() => navigation.navigate('Index')}>
//               <View style={styles.backButton}>
//                 <Image
//                   style={styles.backIcon}
//                   source={require('../Assets/Normal-IMG/left-arrow.png')}
//                 />
//               </View>
//             </TouchableOpacity>

//             <Text style={styles.headerText}>My Orders</Text>

//             <View style={styles.placeholder}></View>
//           </View>
//           <ScrollView>
//             {orderDetails.length === 0 ? (
//               <View
//                 style={{
//                   width: '100%',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   flexDirection: 'column',
//                   height: 600,
//                   // backgroundColor: 'red',
//                 }}>
//                 <View
//                   style={{
//                     width: '80%',
//                     alignItems: 'center',
//                     justifyContent: 'space-evenly',
//                     flexDirection: 'column',
//                     height: '70%',
//                     // backgroundColor: 'red',
//                   }}>
//                   <View style={{width: '100%', alignItems: 'center'}}>
//                     <Text style={{fontSize: 18, fontWeight: 'bold'}}>
//                       NO ORDERS
//                     </Text>
//                     <Text style={{fontSize: 16}}>
//                       There are no recent orders to show
//                     </Text>
//                   </View>

//                   <Image
//                     style={{width: 240, height: 200}}
//                     source={require('../Assets/Normal-IMG/order-empty.png')}
//                   />
//                   <TouchableOpacity
//                     onPress={() => navigation.navigate('Index')}
//                     style={{
//                       borderWidth: 1,
//                       backgroundColor: 'white',
//                       borderRadius: 5,
//                       padding: 15,
//                       borderColor: '#007AFF',
//                     }}>
//                     <Text
//                       style={{
//                         textAlign: 'center',
//                         fontWeight: '700',
//                         color: '#007AFF',
//                       }}>
//                       START SHOPPING{' '}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             ) : (
//               // Display orders
//               <View style={styles.contentContainer}>
//                 {orderDetails.map((item, index) => (
//                   <TouchableOpacity
//                     onPress={() =>
//                       navigation.navigate('MyOrdersDetailes', {
//                         orderDetails: item,
//                       })
//                     }
//                     key={index}
//                     style={styles.orderContainer}>
//                     <View>
//                       {item.address.map((addressItem, addressIndex) => (
//                         <View key={addressIndex}>
//                           <Text style={{fontSize: 16}}>
//                             Delivery to :{' '}
//                             <Text style={{fontSize: 18, fontWeight: '500'}}>
//                               {addressItem.name}
//                             </Text>
//                           </Text>
//                           <Text>
//                             {'                        '}
//                             {addressItem.street}
//                           </Text>
//                         </View>
//                       ))}
//                     </View>

//                     <Image
//                       style={styles.arrowIcon}
//                       source={require('../Assets/Normal-IMG/right-arrow.png')}
//                     />
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             )}
//           </ScrollView>
//         </View>
//       )}
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
//     paddingRight: 10,
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
//   contentContainer: {
//     padding: 20,
//   },
//   orderContainer: {
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     marginVertical: 10,
//     borderRadius: 5,
//     padding: 10,
//     backgroundColor: '#ffffff',
//     alignItems: 'center',
//   },

//   arrowIcon: {
//     width: 20,
//     tintColor: 'gray',
//     height: 20,
//   },
// });

// export default MyOrders;
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MyOrders = () => {
  return (
    <View>
      <Text>MyOrders</Text>
    </View>
  )
}

export default MyOrders

const styles = StyleSheet.create({})