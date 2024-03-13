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
          <Text
            style={{
              color: '#75787d',
              fontWeight: '600',
              letterSpacing: 2,
              fontSize: 35,
            }}>
            with passion!
          </Text>
          {/* <Text style={{color: '#75787d', fontSize: 45, fontWeight: '700'}}>
            it up!
          </Text> */}
        </View>
      </View>
      <View style={{width: '100%', height: 50}}></View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({});
