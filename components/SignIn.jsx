import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {useBaseUrl} from './BaseUrlContext';
import {useCart} from './CartContext';
const SignIn = ({navigation}) => {
  const {baseUrl} = useBaseUrl();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = isLogin => {
    if (email.trim() === '' || password.trim() === '') {
      setShowError(true);
      return;
    }

    setShowError(false);
    setLoading(true);

    const user = {
      email: email,
      password: password,
    };

    const apiEndpoint = isLogin ? 'login' : 'signup';

    axios
      .post(`${baseUrl}/customer/login`, user)
      .then(response => {
        console.log('Login response:', response);
        const token = response.data.data.token;
        console.log('Received token:', token);
        AsyncStorage.setItem('authToken', token).then(response => {
          console.log('Login response:', response); // Log the entire response
          const responseData = response.data; // Get the data object directly
          const token = responseData.token; // Access the token directly
          console.log('Received token:', token); // Log the token received
          if (token) {
            AsyncStorage.setItem('authToken', token)
              .then(() => console.log('Token stored successfully'))
              .catch(error => console.error('Error storing token:', error));
          } else {
            console.error('Token not found in response');
          }
        });
        navigation.navigate('Index');
      })
      .catch(error => {
        Alert.alert(
          'Authentication Error',
          isLogin ? 'Invalid email or password' : 'Sign-up failed',
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View>
      <View style={{width: '100%', height: '100%', backgroundColor: '#e6e6e6'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            height: 70,
            // backgroundColor: 'red',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              marginLeft: 10,
              width: 40,
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
            }}></View>

          <Text style={{fontSize: 22, color: 'black', fontWeight: '600'}}>
            Sign In
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate('Index')}>
            <View
              style={{
                marginRight: 10,
                width: 50,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                backgroundColor: '#ffffff',
              }}>
              <Text style={{color: 'black'}}>Skip</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: '100%',
            height: 500,
            // backgroundColor: 'yellow',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: 50,
          }}>
          <View
            style={{
              // backgroundColor: 'black',
              width: '100%',
              height: 150,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View
              style={{
                width: '80%',
                height: 70,
                //  backgroundColor:'red',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  elevation: 1,
                  borderRadius: 9,
                  width: '100%',
                  height: 50,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Image
                  style={{width: 22, height: 22, marginLeft: 10}}
                  source={require('../Assets/Normal-IMG/email.png')}
                />
                <TextInput
                  value={email}
                  onChangeText={text => setEmail(text)}
                  placeholder="Email"
                  placeholderTextColor="gray"
                  style={{
                    width: '90%',
                    height: '100%',
                    paddingLeft: 20,
                  }}></TextInput>
              </View>
              <View style={{width: '65%'}}>
                {showError && email.trim() === '' && (
                  <Text style={{color: 'red'}}>Please enter your email</Text>
                )}
              </View>
            </View>

            <View
              style={{
                width: '80%',
                height: 70,
                //  backgroundColor:'red',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  elevation: 1,
                  borderRadius: 9,
                  width: '100%',
                  height: 50,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  {showPassword ? (
                    <Image
                      style={{width: 22, height: 22, marginLeft: 10}}
                      source={require('../Assets/Normal-IMG/open-eye.png')}
                    />
                  ) : (
                    <Image
                      style={{width: 22, height: 22, marginLeft: 10}}
                      source={require('../Assets/Normal-IMG/hide-eye.png')}
                    />
                  )}
                </TouchableOpacity>
                <TextInput
                  value={password}
                  onChangeText={text => setPassword(text)}
                  placeholder="Password"
                  placeholderTextColor="gray"
                  secureTextEntry={!showPassword}
                  style={{
                    width: '90%',
                    height: '100%',
                    paddingLeft: 20,
                  }}
                />
              </View>
              <View style={{width: '65%'}}>
                {showError && password.trim() === '' && (
                  <Text style={{color: 'red'}}>Enter your password</Text>
                )}
              </View>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              height: 50,
              // backgroundColor: 'red',
            }}>
            <Text style={{color: 'gray', marginRight: 90}}>Remember Me</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={{color: 'gray'}}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              width: '80%',
              height: 50,
            }}
            // onPress={handleSignIn}
            onPress={handleLogin}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: 50,
                backgroundColor: '#0066ff',
                borderRadius: 10,
              }}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
                Sign In
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: 80,
              // backgroundColor: 'white',
            }}>
            <View
              style={{
                borderWidth: 0.3,
                borderColor: 'gray',
                width: '35%',
              }}></View>
            <Text style={{color: 'black', padding: 10}}>Or</Text>
            <View
              style={{
                borderWidth: 0.3,
                borderColor: 'gray',
                width: '35%',
              }}></View>
          </View>

          <View
            style={{
              width: '100%',
              height: 100,
              // backgroundColor: 'red',
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <Image
              style={{borderRadius: 20, marginTop: 3, width: 35, height: 35}}
              source={require('../Assets/Normal-IMG/google.png')}
            />
            <Image
              style={{width: 40, height: 40, margin: 20, marginTop: 0}}
              source={require('../Assets/Normal-IMG/facebook.png')}
            />
            <Image
              style={{width: 40, height: 40}}
              source={require('../Assets/Normal-IMG/instagram.png')}
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'gray',
          }}>
          <Text style={{color: 'black'}}>Dont't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{color: '#004d99', fontWeight: 'bold'}}>
              {' '}
              Create new one
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
