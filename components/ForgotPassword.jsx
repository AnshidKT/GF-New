import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useBaseUrl} from './BaseUrlContext';

const ForgotPassword = ({navigation}) => {
  const {baseUrl} = useBaseUrl();

  const [forgotEmail, setForgotEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/customers/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: forgotEmail,
        }),
      });
      if (response.ok) {
        Alert.alert('Success', 'Password reset email sent successfully');
        console.log('Password reset email sent successfully');
      } else {
        Alert.alert('Error', 'Failed to send password reset email');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to send password reset email');
    }
  };

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#e6e6e6'}}>
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
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
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
          Forgot Password
        </Text>

        <View
          style={{
            width: 40,
          }}></View>
      </View>

      <View
        style={{
          width: '100%',
          height: 500,
          alignItems: 'center',
          justifyContent: 'center',
          //   backgroundColor: 'red',
        }}>
        <View
          style={{
            width: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70%',
            // backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <TextInput
            style={{
              width: '90%',
              borderRadius: 3,
              height: 50,
              marginBottom: 10,
              padding: 10,
              backgroundColor: 'white',
            }}
            placeholder="Enter your email"
            onChangeText={text => setForgotEmail(text)}
            value={forgotEmail}
          />
          <TouchableOpacity
            style={{
              width: '50%',
              height: 50,
              alignItems: 'center',
              marginBottom: -10,
            }}
            onPress={handleForgotPassword}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '80%',
                height: 40,
                backgroundColor: '#0066ff',
                borderRadius: 3,
              }}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
                Send
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
