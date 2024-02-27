import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Footer = () => {
  return (
    <View style={{backgroundColor: '#e6e6e6'}}>
      <View
        style={{
          backgroundColor: '#e6e6e6',

          height: 150,
          width: '100%',
          // justifyContent: 'center',
        }}>
        <View style={{marginLeft: 20}}>
          <Text style={{color: '#75787d', fontSize: 45, fontWeight: '700'}}>
            Live
          </Text>
          <Text style={{color: '#75787d', fontSize: 45, fontWeight: '700'}}>
            it up!
          </Text>
        </View>
      </View>
      <View style={{width: '100%', height: 50}}></View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({});







// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React, {useEffect, useState} from 'react';

// import {TextInput} from 'react-native';

// import {FlatList} from 'react-native';
// import {ScrollView} from 'react-native';
// import {Image} from 'react-native';
// import Dots from 'react-native-dots-pagination';
// const Demo = ({navigation}) => {
//   const [token, setToken] = useState('');
//   const [cartItemIds, setCartItemIds] = useState([]);
//   const [cartItemUid, setCartItemUid] = useState([]);

//   // useEffect(() => {
//   //   const fetchToken = async () => {
//   //     try {
//   //       const response = await fetch('http://192.168.1.39:3000/api/auth/token');
//   //       if (response.ok) {
//   //         const data = await response.json();
//   //         setToken(decodeURIComponent(data.token));
//   //       } else {
//   //         console.error(
//   //           'Failed to fetch token:',
//   //           response.status,
//   //           response.statusText,
//   //         );
//   //       }
//   //     } catch (error) {
//   //       console.error('Error occurred while fetching token:', error);
//   //     }
//   //   };
//   //   fetchToken();
//   // }, []);

//   // const handleToAdmin = async () => {
//   //   const userItem = {
//   //     sku: 'Al Shomoukh',
//   //     qty: '1',
//   //   };

//   //   try {
//   //     const response = await fetch(
//   //       'http://192.168.1.39:3000/api/cart/02010c86-bccd-41df-acfe-d800277feb72/items',
//   //       // 'http://192.168.1.39:3000/api/cart/mine/items',
//   //       {
//   //         method: 'POST',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //           // Authorization: `Bearer ${token}`,
//   //         },
//   //         body: JSON.stringify(userItem),
//   //       },
//   //     );

//   //     if (response.ok) {
//   //       const data = await response.json();
//   //       console.log('Item added successfully to cart:', data);
//   //     } else {
//   //       console.error(
//   //         'Failed to add item to cart:',
//   //         response.status,
//   //         response.statusText,
//   //       );
//   //     }
//   //   } catch (error) {
//   //     console.error('Error occurred while adding item to cart:', error);
//   //   }
//   // };

//   // const handleDelete = async (id, itemId) => {
//   //   try {
//   //     const response = await fetch(
//   //       `http://192.168.1.39:3000/api/cart/02010c86-bccd-41df-acfe-d800277feb72/items/ecd43e45-4bec-4a99-bb0c-06a540a61ee5`,
//   //       {
//   //         method: 'DELETE',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //           // Authorization: `Bearer ${token}`,
//   //         },
//   //       },
//   //     );

//   //     if (response.ok) {
//   //       console.log('Item deleted successfully from cart');
//   //     } else {
//   //       console.error(
//   //         'Failed to delete item from cart:',
//   //         response.status,
//   //         response.statusText,
//   //       );
//   //     }
//   //   } catch (error) {
//   //     console.error('Error occurred while deleting item from cart:', error);
//   //   }
//   // };

//   const [product, setProduct] = useState([]);

//   const fetchProductItems = async () => {
//     try {
//       const response = await fetch(
//         'http://192.168.1.39:3000/api/products/allproducts',
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         },
//       );

//       if (!response.ok) {
//         console.error('Failed to fetch product items:', response.statusText);
//         return;
//       }

//       const contentType = response.headers.get('content-type');
//       if (contentType && contentType.indexOf('application/json') !== -1) {
//         const responseData = await response.json();
//         // console.log('Response from server:', responseData)
//         setProduct(responseData);
//       } else {
//         console.error('Response is not JSON');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
//   useEffect(() => {
//     fetchProductItems();
//     // fetchCategoryItems();
//   }, []);

//   const handleToAdmin = async item => {
//     const userItem = {
//       sku: item.sku,
//       qty: '1',
//     };

//     try {
//       const response = await fetch(
//         'http://192.168.1.39:3000/api/cart/02010c86-bccd-41df-acfe-d800277feb72/items',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',

//           },
//           body: JSON.stringify(userItem),
//         },
//       );

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Item added successfully to cart:', data);
//       } else {
//         console.error(
//           'Failed to add item to cart:',
//           response.status,
//           response.statusText,
//         );
//       }
//     } catch (error) {
//       console.error('Error occurred while adding item to cart:', error);
//     }
//   };

//   // const handleDelete = async uuid => {
//   //   try {
//   //     const response = await fetch(
//   //       `http://192.168.1.39:3000/api/cart/02010c86-bccd-41df-acfe-d800277feb72/items/${uuid}`,
//   //       {
//   //         method: 'DELETE',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //           // Authorization: `Bearer ${token}`,
//   //         },
//   //       },
//   //     );

//   //     console.log('====================================');
//   //     console.log('uuid : ', uuid);
//   //     console.log('====================================');

//   //     if (response.ok) {
//   //       console.log('Item deleted successfully from cart');
//   //     } else {
//   //       console.error(
//   //         'Failed to delete item from cart:',
//   //         response.status,
//   //         response.statusText,
//   //       );
//   //     }
//   //   } catch (error) {
//   //     console.error('Error occurred while deleting item from cart:', error);
//   //   }
//   // };

//   // const [email, setEmail] = useState('');

//   // const handleSubmitResetPssword = async () => {
//   //   try {
//   //     const response = await fetch(
//   //       'http://192.168.1.39:3000/api/customers/reset-password',
//   //       {
//   //         method: 'POST',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //           // Authorization: `Bearer ${token}`,
//   //         },
//   //         body: JSON.stringify({email}),
//   //       },
//   //     );
//   //     if (response.ok) {
//   //       const responseData = await response.json();
//   //       console.log('Response from server:', responseData);
//   //       setEmail(responseData.newPassword);
//   //     } else {
//   //       console.error('Error:', response.status, response.statusText);
//   //     }
//   //   } catch (error) {
//   //     // Handle network errors or other exceptions here
//   //     console.error('Error:', error);
//   //   }
//   // };

//   // const [categoryItems, setCategoryItems] = useState([]);

//   // const fetchCategoryItems = async () => {
//   //   try {
//   //     const response = await fetch(
//   //       'http://192.168.1.39:3000/category/6257c707-6da3-47c6-babc-ccd033d63c03',
//   //       {
//   //         method: 'GET',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //         },
//   //       },
//   //     );

//   //     if (!response.ok) {
//   //       throw new Error('Failed to fetch category items');
//   //     }

//   //     const responseData = await response.json();
//   //     console.log('Response from server:', responseData);
//   //     setCategoryItems(responseData.products.items);
//   //   } catch (error) {
//   //     console.error('Error:', error);
//   //   }
//   // };

//   return (
//     <View
//       style={{
//         alignItems: 'center',
//         justifyContent: 'center',
//         flex: 1,
//         backgroundColor: 'lightblue',
//         padding: 10,
//       }}>
//       <TouchableOpacity onPress={handleToAdmin}>
//         <View
//           style={{
//             alignItems: 'center',
//             justifyContent: 'center',
//             width: 100,
//             height: 100,
//             backgroundColor: 'white',
//             // margin: 30,
//           }}>
//           <Text style={{color: 'black'}}>Add to Cart</Text>
//         </View>
//       </TouchableOpacity>

//       {/* <TouchableOpacity onPress={handleDelete}>
//         <View
//           style={{
//             alignItems: 'center',
//             justifyContent: 'center',
//             width: 80,
//             height: 40,
//             backgroundColor: 'darkred',
//             marginVertical: 15,
//           }}>
//           <Text style={{color: 'white', fontWeight: '700'}}>Delete</Text>
//         </View>
//       </TouchableOpacity> */}
//       {/*
//       <View style={{padding: 10}}>
//         <TextInput
//           value={email}
//           placeholder="Enter new password"
//           onChangeText={setEmail}
//           style={{
//             backgroundColor: 'white',
//             padding: 10,
//             height: 40,
//             width: 200,
//           }}
//         />
//         <TouchableOpacity
//           onPress={handleSubmitResetPssword}
//           style={{
//             backgroundColor: 'darkblue',
//             width: 90,
//             height: 30,
//             margin: 10,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <Text style={{color: 'white'}}>Submit</Text>
//         </TouchableOpacity>
//       </View> */}

//       <View style={{flex: 1, marginTop: 8, backgroundColor: 'white'}}>
//         <FlatList
//           style={{padding: 10}}
//           data={product.collections}
//           numColumns={3}
//           keyExtractor={item => item.uuid} // Update keyExtractor to use uuid
//           renderItem={({item}) => {
//             // console.log('Item:', item);
//             return (
//               <TouchableOpacity
//                 style={{margin: 10}}
//                 onPress={() => handleToAdmin(item)}
//                 key={item.productId}>
//                 <View
//                   style={{
//                     width: 100,
//                     height: 40,
//                     backgroundColor: 'lightblue',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}>
//                   <Text>{item.sku}</Text>
//                 </View>
//                 {/* <TouchableOpacity
//                     onPress={() => handleDelete(item.uuid)}>
//                     <Image
//                       style={{width: 25, marginLeft: 40, height: 25}}
//                       source={require('../Assets/Normal-IMG/delete.png')}
//                     />
//                   </TouchableOpacity>  */}
//               </TouchableOpacity>
//             );
//           }}
//         />
//       </View>

//       <TouchableOpacity
//         style={{width: 100, height: 40, backgroundColor: 'gray'}}
//         onPress={() => navigation.navigate('Demoo')}>
//         <Text>Demoo</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Demo;

// const styles = StyleSheet.create({});