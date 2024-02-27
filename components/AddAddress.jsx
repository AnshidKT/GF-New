// import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React, {useCallback, useContext, useEffect, useState} from 'react';
// import {Image} from 'react-native';
// import axios from 'axios';
// import {UserType} from './UserContext';
// import {ScrollView} from 'react-native';
// import {useCart} from './CartContext';
// import {
//   useFocusEffect,
//   useNavigation,
//   useRoute,
// } from '@react-navigation/native';
// import FlashMessage, {
//   showMessage,
//   hideMessage,
// } from 'react-native-flash-message';

// const AddAddress = ({navigation}) => {
 

//   return (
//     <View style={{flex: 1, backgroundColor: '#F7F7F7'}}>
//       <FlashMessage position="top" />
//       <View
//         style={{
//           width: '100%',
//           height: 60,
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           flexDirection: 'row',
//           paddingLeft: 20,
//           paddingRight: 20,
//         }}>
//         <TouchableOpacity onPress={() => navigation.navigate('Index')}>
//           <View
//             style={{
//               width: 40,
//               borderRadius: 6,
//               alignItems: 'center',
//               justifyContent: 'center',
//               height: 40,
//               backgroundColor: '#ffffff',
//             }}>
//             <Image
//               style={{width: 20, height: 20}}
//               source={require('../Assets/Normal-IMG/left-arrow.png')}
//             />
//           </View>
//         </TouchableOpacity>

//         <Text style={{fontSize: 22, fontWeight: 'bold', color: 'black'}}>
//           Your Address
//         </Text>

//         <View
//           style={{
//             width: 40,
//           }}></View>
//       </View>

//       <ScrollView>
//         <View style={{padding: 10}}>
//           <TouchableOpacity onPress={() => navigation.navigate('Address')}>
//             <View
//               style={{
//                 borderRadius: 5,
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 borderColor: '#D0D0D0',
//                 borderWidth: 1,
//                 padding: 14,
//               }}>
//               <Text style={{color: 'black'}}>Add new address</Text>
//               <Image
//                 style={{width: 20, height: 20}}
//                 source={require('../Assets/Normal-IMG/rightarroww.png')}
//               />
//             </View>
//           </TouchableOpacity>

//           <View>
//             {addresses?.map((item, index) => (
//               <View
//                 key={index}
//                 style={{
//                   backgroundColor:
//                     selectedAddress === item ? '#e6f0ff' : '#F7F7F7',
//                   borderWidth: 1,
//                   borderColor: '#D0D0D0',
//                   padding: 10,
//                   gap: 5,
//                   flexDirection: 'column',
//                   marginVertical: 10,
//                   borderRadius: 5,
//                 }}>
//                 <View
//                   style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
//                   <Text
//                     style={{
//                       fontSize: 15,
//                       fontWeight: 'bold',
//                       color: '#181818',
//                     }}>
//                     {item.name}
//                   </Text>
//                   <Image
//                     style={{width: 20, height: 20}}
//                     source={require('../Assets/Normal-IMG/locationred.png')}
//                   />
//                 </View>

//                 <Text style={{fontSize: 15, color: '#181818'}}>
//                   {item.houseNo} {item.landmark}
//                 </Text>
//                 <Text style={{fontSize: 15, color: '#181818'}}>
//                   {item.street}
//                 </Text>
//                 <Text style={{fontSize: 15, color: '#181818'}}>
//                   phone No : {item.mobileNo}
//                 </Text>
//                 <Text style={{fontSize: 15, color: '#181818'}}>
//                   pin code : {item.postalCode}
//                 </Text>

//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     gap: 10,
//                     marginTop: 7,
//                   }}>
//                   <TouchableOpacity
//                     onPress={() =>
//                       navigation.navigate('Address', {
//                         editMode: true,
//                         address: item,
//                       })
//                     }
//                     style={{
//                       backgroundColor: '#FFFFFF',
//                       paddingHorizontal: 12,
//                       paddingVertical: 7,
//                       borderRadius: 5,
//                       borderWidth: 0.9,
//                       borderColor: '#D0D0D0',
//                     }}>
//                     <Text style={{color: 'black'}}>Edit</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={() => removeAddress(item)}
//                     style={{
//                       backgroundColor: '#FFFFFF',
//                       paddingHorizontal: 10,
//                       paddingVertical: 7,
//                       borderRadius: 5,
//                       borderWidth: 0.9,
//                       borderColor: '#D0D0D0',
//                     }}>
//                     <Text style={{color: 'black'}}>Remove</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     onPress={() => {
//                       setSelectedAddress(item);
//                     }}
//                     style={{
//                       backgroundColor:
//                         selectedAddress === item ? '#1a75ff' : 'white',
//                       paddingHorizontal: 10,
//                       paddingVertical: 7,
//                       borderRadius: 5,
//                       borderWidth: 0.9,
//                       borderColor: '#D0D0D0',
//                     }}>
//                     <Text
//                       style={{
//                         color: selectedAddress === item ? 'white' : 'black',
//                       }}>
//                       Set as Default
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             ))}
//           </View>
//         </View>
//       </ScrollView>

//       <View
//         style={{
//           width: '100%',
//           height: 110,
//           alignItems: 'center',
//           justifyContent: 'center',
//           // backgroundColor: 'red',
//         }}>
//         <TouchableOpacity
//           onPress={handlePaymentNavigation}
//           style={{
//             alignItems: 'center',
//             justifyContent: 'center',
//             width: '90%',
//             borderRadius: 8,
//             height: 60,
//             backgroundColor: '#007AFF',
//           }}>
//           <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
//             Continue to payment
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default AddAddress;

// const styles = StyleSheet.create({});
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AddAddress = () => {
  return (
    <View>
      <Text>AddAddress</Text>
    </View>
  )
}

export default AddAddress

const styles = StyleSheet.create({})