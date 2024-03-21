import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Image} from 'react-native';
import {TextInput} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useBaseUrl} from './BaseUrlContext';

import SelectDropdown from 'react-native-select-dropdown';
import {useCart} from './CartContext';

const Demoo = () => {
  const {baseUrl} = useBaseUrl();
  const {activeCartUuid} = useCart();

  const navigation = useNavigation();
  const route = useRoute();

  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const addAddress = async () => {
    console.log('Country:', country);
    console.log('Name:', name);
    console.log('Mobile No:', mobileNo);
    console.log('House No:', houseNo);
    console.log('Street:', street);
    console.log('Province:', province);
    console.log('Postal Code:', postalCode);

    if (
      !country ||
      !name ||
      !mobileNo ||
      !houseNo ||
      !street ||
      !province ||
      !postalCode
    ) {
      Alert.alert('Info', 'Please fill in all the fields');
      return;
    }

    try {
      const response = await fetch(
        `${baseUrl}/api/carts/${activeCartUuid}/addresses`,

        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: {
              address_1: houseNo,
              city: street,
              country: country,

              full_name: name,
              telephone: mobileNo,
              province: province,
              postcode: postalCode,
            },
            type: 'shipping',
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to add address');
      }
      Alert.alert(
        'Success',
        'Address added successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('BillingAddress'),
          },
        ],
        {cancelable: false},
      );

      console.log('Address added successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
      console.log('Error', error.message);
    }
  };

  const [countryOptions, setCountryOptions] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/shippingaddress`);
        const data = await response.json();
        const uniqueCountries = [
          ...new Set(data.data.map(item => item.country)),
        ];
        setCountryOptions(uniqueCountries);
        const uniqueProvinces = [
          ...new Set(data.data.map(item => item.province)),
        ];
        setProvinceOptions(uniqueProvinces);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView>
      <View style={{backgroundColor: '#F7F7F7'}}>
        <View
          style={{
            width: '100%',
            height: 60,
            // backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingLeft: 20,
            paddingRight: 20,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Index')}>
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
            Shipping Address
          </Text>

          <View
            style={{
              width: 40,
            }}></View>
        </View>

        <View style={{padding: 10}}>
          <View style={{marginVertical: 10}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
              Full name (First and Last name)
            </Text>
            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              placeholder="Enter your name"
              placeholderTextColor={'black'}
              style={{
                padding: 10,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
            />
          </View>

          <View style={{marginVertical: 10}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
              Mobile number
            </Text>
            <TextInput
              value={mobileNo}
              onChangeText={text => setMobileNo(text)}
              placeholder="Mobile No"
              placeholderTextColor={'black'}
              style={{
                padding: 10,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
            />
          </View>

          <View style={{marginVertical: 10}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Your Address</Text>
            <TextInput
              value={houseNo}
              onChangeText={text => setHouseNo(text)}
              style={{
                padding: 10,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
            />
          </View>

          <View style={{marginVertical: 10}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
              Area,Street,City
            </Text>
            <TextInput
              value={street}
              onChangeText={text => setStreet(text)}
              style={{
                padding: 10,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
            />
          </View>

          <View style={{marginVertical: 10}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Pincode</Text>
            <TextInput
              value={postalCode}
              onChangeText={text => setPostalCode(text)}
              placeholder="Enter Pincode"
              placeholderTextColor={'black'}
              style={{
                padding: 10,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
            />
          </View>

          <View style={{marginVertical: 10}}>
            <SelectDropdown
              defaultButtonText="Province"
              data={provinceOptions}
              onSelect={selectedItem => setProvince(selectedItem)}
              buttonStyle={{
                borderColor: '#D0D0D0',
                backgroundColor: '#f7f7f7',
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
                padding: 10,
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            />
          </View>

          <View style={{marginVertical: 10}}>
            <SelectDropdown
              defaultButtonText="Your country"
              data={countryOptions}
              onSelect={selectedItem => setCountry(selectedItem)}
              buttonStyle={{
                borderColor: '#D0D0D0',
                backgroundColor: '#f7f7f7',
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
                padding: 10,
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            />
          </View>

          <TouchableOpacity
            onPress={addAddress}
            style={{
              padding: 19,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              backgroundColor: '#007AFF',
            }}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Demoo;

const styles = StyleSheet.create({});
