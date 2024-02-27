import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';

const SignUp = ({navigation}) => {
  const [isTicked, setTicked] = useState(false);

  const handleViewClick = () => {
    setTicked(!isTicked);
  };

  ////////////////BACKEND/////////////////////

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  const handleRegister = () => {
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    let isValid = true;

    if (!name) {
      setNameError('Please enter your username');
      isValid = false;
    }
    if (!email || !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }
    if (!password || !passwordRegex.test(password)) {
      setPasswordError('8 characters, 1 letter, 1 digit required.');
      isValid = false;
    }
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    }
    if (!isTicked) {
      Alert.alert(
        'Terms Acceptance',
        'Please accept the terms of service and privacy policy.',
      );
      isValid = false;
    }
    if (!isValid) {
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Password and Confirm Password do not match');
      return;
    }

    const userData = {
      email: email,
      password: password,
      full_name: name,
    };

    axios
      .post('http://192.168.1.39:3000/api/customers', userData)
      .then(response => {
        console.log(response);
        Alert.alert(
          'Registration Successful',
          'You have registered successfully',
        );

        setName('');
        setEmail('');
        setPassword('');
        setTicked(false);
        navigation.navigate('SignIn');
      })
      .catch(error => {
        console.log('Registration Error:', error);
        Alert.alert('Registration Error', 'Please try again');
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
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <View
              style={{
                marginLeft: -130,
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

          <Text style={{fontSize: 22, color: 'black', fontWeight: '600'}}>
            Sign Up
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            height: 310,
            // backgroundColor: 'yellow',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: 40,
          }}>
          <View
            style={{
              width: '80%',
              height: 55,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
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
                source={require('../Assets/Normal-IMG/person.png')}
              />
              <TextInput
                value={name}
                onChangeText={text => setName(text)}
                placeholder="Username"
                placeholderTextColor="gray"
                style={{
                  width: '90%',
                  height: '100%',
                  paddingLeft: 20,
                }}></TextInput>
            </View>
            {nameError ? <Text style={{color: 'red'}}>{nameError}</Text> : null}
          </View>

          <View
            style={{
              width: '80%',
              height: 55,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
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
            {emailError ? (
              <Text style={{color: 'red'}}>{emailError}</Text>
            ) : null}
          </View>

          <View
            style={{
              width: '80%',
              height: 55,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
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
                source={require('../Assets/Normal-IMG/key.png')}
              />
              <TextInput
                value={password}
                onChangeText={text => setPassword(text)}
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry={true}
                style={{
                  width: '90%',
                  height: '100%',
                  paddingLeft: 20,
                }}
              />
            </View>
            {passwordError ? (
              <Text style={{color: 'red'}}>{passwordError}</Text>
            ) : null}
          </View>

          <View
            style={{
              width: '80%',
              height: 55,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
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
                source={require('../Assets/Normal-IMG/key.png')}
              />
              <TextInput
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
                placeholder="Confirm Password"
                placeholderTextColor="gray"
                secureTextEntry={true}
                style={{
                  width: '90%',
                  height: '100%',
                  paddingLeft: 20,
                }}></TextInput>
            </View>
            {confirmPasswordError ? (
              <Text style={{color: 'red'}}>{confirmPasswordError}</Text>
            ) : null}
          </View>
        </View>

        <View
          style={{
            width: '100%',
            height: 37,
            alignItems: 'center',
            justifyContent: 'flex-start',
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              width: '83%',
              height: '100%',
              // backgroundColor: 'white',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableWithoutFeedback onPress={handleViewClick}>
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 2,
                  borderWidth: 0.3,
                }}>
                {isTicked && (
                  <Image
                    style={{width: '100%', borderRadius: 2, height: '100%'}}
                    source={require('../Assets/Normal-IMG/box-tick.png')}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
            <View
              style={{
                width: '92%',
                height: '100%',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                // backgroundColor: 'yellow',
              }}>
              <Text
                style={{
                  color: 'black',
                  marginLeft: 9,

                  fontSize: 12,
                }}>
                By signing up you accepted the{' '}
                <TouchableOpacity>
                  <Text
                    style={{
                      color: '#00a3cc',
                      marginBottom: -3,
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    Terms of service{' '}
                  </Text>
                </TouchableOpacity>
                and
                <TouchableOpacity>
                  <Text
                    style={{
                      color: '#00a3cc',
                      fontSize: 12,
                      marginBottom: -3,
                      fontWeight: 'bold',
                    }}>
                    {''} Privacy Policy
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={handleRegister}>
          <View
            style={{
              width: '100%',
              height: 100,
              // backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '80%',
                height: 50,
                backgroundColor: '#0066ff',
                borderRadius: 10,
              }}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
                Sign Up
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={{
            width: '100%',
            height: '16%',
            // backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{color: 'black'}}>Allready have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={{color: '#004d99', fontWeight: 'bold'}}> Sigh In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});

// const checkLoginStatus = async () => {
//   try {
//     const token = await AsyncStorage.getItem('authToken');

//     if (token) {
//       navigation.navigate('Home');
//     }
//   } catch (err) {
//     console.log('error message ', err);
//   }
// };
