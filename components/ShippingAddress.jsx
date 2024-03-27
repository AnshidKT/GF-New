import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useBaseUrl} from './BaseUrlContext';
import SelectDropdown from 'react-native-select-dropdown';
import {useCart} from './CartContext';
import {useFocusEffect} from '@react-navigation/native';
const ShippingAddress = () => {
  const {baseUrl} = useBaseUrl();
  const {activeCartUuid} = useCart();

  console.log('shipping address activeuuid :', activeCartUuid);

  const navigation = useNavigation();
  const route = useRoute();

  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);

  const handleSelectedShippingMethod = index => {
    setSelectedShippingMethod(index);
  };

  const [countryOptions, setCountryOptions] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [shippingData, setShippingData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/shippingaddress`);
        const data = await response.json();
        setShippingData(data);
        // console.log(data);
        const countries =
          data?.data?.map(item => ({code: item.code, name: item.name})) || [];
        setCountryOptions(countries);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (shippingData && country) {
      const countryData = shippingData.data.find(
        countryItem => countryItem.code === country,
      );
      if (countryData) {
        const provinces = countryData.provinces.map(province => ({
          code: province.code,
          name: province.name,
        }));
        setProvinceOptions(provinces);
      }
    }
  }, [shippingData, country]);

  const handleCountrySelect = (selectedItem, index) => {
    const selectedCountryCode = countryOptions[index].code;
    setCountry(selectedCountryCode);
    // console.log('Selected Country Code:', selectedCountryCode);
  };

  const handleProvinceSelect = (selectedItem, index) => {
    const selectedProvinceCode = provinceOptions[index].code;
    setProvince(selectedProvinceCode);
  };

  const [shippingMethods, setShippingMethods] = useState([]);
  const fetchShippingMethods = async () => {
    try {
      if (!country || !province) {
        return;
      }

      console.log(
        'Fetching shipping methods for country:',
        country,
        'and province:',
        province,
      );

      const response = await fetch(
        `${baseUrl}/api/shippingMethods/${activeCartUuid}?country=${country}&province=${province}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch shipping methods');
      }

      const responseData = await response.json();
      const methods = responseData?.data?.methods || [];
      setShippingMethods(methods);
    } catch (error) {
      console.error('Error fetching shipping methods:', error);
    }
  };

  useEffect(() => {
    fetchShippingMethods();
  }, [country, province]);

  useFocusEffect(
    useCallback(() => {
      fetchShippingMethods();
    }, [country, province]),
  );

  const addAddress = async () => {
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
    if (selectedShippingMethod === null) {
      Alert.alert('Info', 'Please select a shipping method');
      return;
    }
  
    try {
      const selectedMethod = shippingMethods[selectedShippingMethod];
      if (!selectedMethod) {
        console.error('Selected shipping method not found');
        return;
      }
  
      const methodCode = selectedMethod.code;
  
      console.log('shipping method code : ', methodCode);
  
      // First, make the address API call
      const addressResponse = await fetch(
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
  
      if (!addressResponse.ok) {
        throw new Error('Failed to add address');
      }
  
      console.log('Address added successfully');
  
      // If the address API call is successful, then proceed with the shipping method API call
      const shippingMethodResponse = await fetch(
        `${baseUrl}/api/carts/${activeCartUuid}/shippingMethods`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            method_code: methodCode,
          }),
        },
      );
  
      if (!shippingMethodResponse.ok) {
        throw new Error('Failed to post shipping method');
      } else {
        console.log(
          'Shipping method posted successfully:',
          shippingMethodResponse,
        );
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
        { cancelable: false },
      );
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
              defaultButtonText="Your country"
              data={countryOptions.map(country => country.name)}
              onSelect={handleCountrySelect}
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
              defaultButtonText="Province"
              data={provinceOptions.map(province => province.name)}
              onSelect={handleProvinceSelect}
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

          {shippingMethods.map((method, index) => (
            <View
              key={index}
              style={{
                width: '93%',
                height: 60,
                backgroundColor: 'white',
                elevation: 3,
                borderColor: 'gray',
                borderRadius: 8,
                justifyContent: 'center',
                padding: 8,
                margin: 10,
              }}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => handleSelectedShippingMethod(index)}>
                <View
                  style={{
                    width: 25,
                    height: 25,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 2,
                  }}>
                  {selectedShippingMethod === index && (
                    <Image
                      style={{width: 50, height: 50}}
                      source={require('../Assets/Normal-IMG/payment-tick.png')}
                    />
                  )}
                </View>

                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    margin: 5,
                    fontWeight: '600',
                  }}>
                  {method.name}
                </Text>
                <Text
                  style={{
                    color: 'green',
                    fontSize: 16,
                    margin: 5,
                    fontWeight: '600',
                  }}>
                  {method.cost}
                </Text>
              </TouchableOpacity>
            </View>
          ))}

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

export default ShippingAddress;

const styles = StyleSheet.create({});
