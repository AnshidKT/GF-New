import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import {useBaseUrl} from './BaseUrlContext';

const DemoHome = () => {
  const [loading, setLoading] = useState(false);
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState();
  const [paymentMethods, setPaymentMethods] = useState([]);

  const {baseUrl} = useBaseUrl();

  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/api/paymentMethods`)
      .then(response => response.json())
      .then(data => {
        setPaymentMethods(data.data.methods);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching payment methods: ', error);
        setLoading(false);
      });
  }, []);

  const handleConfirmOrder = async () => {};

  const handleSelectedPayment = index => {
    setSelectedPaymentIndex(index);
    const selectedMethod = paymentMethods[index];
    console.log('Selected payment method code:', selectedMethod.code);
  };

  return (
    <View>
      {loading ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BarIndicator color="#007AFF" />
        </View>
      ) : (
        <>
          <View
            style={{
              width: '100%',
              height: 60,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingLeft: 20,
              paddingRight: 20,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('AddAddress')}>
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
              Payment
            </Text>

            <View style={{width: 40}}></View>
          </View>

          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              height: 240,
            }}>
            <View
              style={{
                width: '90%',
                flexDirection: 'column',
                height: '90%',
                backgroundColor: 'white',
                borderTopEndRadius: 8,
                borderTopStartRadius: 8,
                paddingTop: 8,
              }}>
              <Text
                style={{
                  marginLeft: 9,
                  fontSize: 19,
                  color: 'black',
                  fontWeight: '600',
                }}>
                Order Details
              </Text>
              <View style={{padding: 10}}>
                <Text style={{color: 'gray', marginBottom: 2}}>
                  Username {'     '}: {'  '}
                </Text>
                <Text style={{color: 'gray'}}>
                  Useremail {'     '}: {'  '}
                </Text>

                <View
                  style={{
                    width: '99%',
                    marginTop: 8,
                    height: '65%',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      width: '30%',
                      height: '100%',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontWeight: '400', color: 'gray'}}>
                      Delivery to {'     '}:{' '}
                    </Text>
                    <Text style={{fontWeight: '400', color: 'gray'}}>
                      Total amount :
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '75%',
                      height: '100%',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      paddingLeft: 6,
                    }}>
                    <Text style={{fontWeight: '400', color: 'gray'}}></Text>
                    <Text style={{fontWeight: '400', color: 'gray'}}></Text>
                    <Text style={{fontWeight: '400', color: 'gray'}}></Text>
                    <Text style={{fontWeight: '400', color: 'gray'}}></Text>

                    <Text
                      style={{
                        fontWeight: '600',
                        fontSize: 15,
                        marginBottom: '-1%',
                        color: 'gray',
                      }}></Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              height: 290,
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginTop: 10,
            }}>
            <View
              style={{
                width: '90%',
                height: '100%',
                backgroundColor: 'white',
                marginTop: '-7%',
                borderBottomEndRadius: 8,
                borderBottomLeftRadius: 8,
                paddingTop: 8,
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{
                  marginLeft: 9,
                  fontSize: 19,
                  color: 'black',
                  fontWeight: '600',
                }}>
                Payment Method
              </Text>
              <View
                style={{
                  width: '100%',
                  height: '87%',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                {paymentMethods.map((method, index) => (
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
                    }}>
                    <TouchableOpacity
                      style={{flexDirection: 'row'}}
                      onPress={() => handleSelectedPayment(index)}>
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
                        {selectedPaymentIndex === index && (
                          <Image
                            style={{width: 50, height: 50}}
                            source={require('../Assets/Normal-IMG/payment-tick.png')}
                          />
                        )}
                      </View>
                      <Image
                        style={{
                          width: 100,
                          height: 30,
                          objectFit: 'fill',
                          marginLeft: 10,
                        }}
                        source={
                          index === 0
                            ? require('../Assets/Normal-IMG/cashondelivery.png')
                            : index === 1
                            ? require('../Assets/Normal-IMG/paypal.png')
                            : require('../Assets/Normal-IMG/visa.png')
                        }
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              height: '10%',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={handleConfirmOrder}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '90%',
                borderRadius: 8,
                height: 60,
                marginBottom: 10,
                backgroundColor: '#007AFF',
              }}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
                Confirm & Ordered
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default DemoHome;
