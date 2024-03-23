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
const BillingAddress = () => {
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
  const [selectedCountry, setSelectedCountry] = useState('');



  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/shippingaddress`);
      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }
      const data = await response.json();
      const countryData = data.data.map(country => ({
        value: country.code,
        label: country.name
      }));
      setCountry(countryData);
      console.log(country);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };















  const addAddress = async () => {
    if (
      !selectedCountry ||
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
              address_1: houseNo + ', ' + province,
              city: street,
              country: selectedCountry,
              postal_code: postalCode,
              full_name: name,
              telephone: mobileNo,
              postcode: postalCode,
            },
            type: 'billing',
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to add address');
      }
      Alert.alert(
        'Success',
        'Billing Address added successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Payment'),
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
          <TouchableOpacity onPress={() => navigation.navigate('ShippingAddress')}>
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
            Billing Address
          </Text>

          <View
            style={{
              width: 40,
            }}></View>
        </View>

        <View style={{padding: 10}}>
          {/* <TextInput
          placeholder="Country"
          value={country}
          onChangeText={text => setCountry(text)}
          placeholderTextColor={'black'}
          style={{
            padding: 10,
            borderColor: '#D0D0D0',
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        /> */}

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
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Province</Text>
            <TextInput
              value={province}
              onChangeText={text => setProvince(text)}
              placeholder="Province"
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

          <View>
          <SelectDropdown
            data={country}
            onSelect={(selectedItem, index) => {
              setSelectedCountry(selectedItem.value);
              console.log('Selected country:', selectedItem.value);
            }}
              defaultButtonText="Select Your Country"
              defaultButtonTextStyle={{fontSize: 15}}
              buttonTextAfterSelection={(selectedItem, index) => (
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'left',
                    fontSize: 15,
                    width: '100%',
                  }}>
                  {selectedItem.label}
                </Text>
              )}
              rowTextForSelection={(item, index) => item.label}
              dropdownIconPosition="right"
              dropdownStyle={{borderRadius: 5}}
              rowTextStyle={{paddingVertical: 12}}
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
              Continue to Payment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default BillingAddress;

const styles = StyleSheet.create({});
