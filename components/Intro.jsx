import React, {useEffect, useRef} from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';

const Intro = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => {
      navigation.navigate('SignIn');
    }, 3000);
    return () => clearTimeout(timeout);
  }, [fadeAnim, navigation]);

  return (
    <Animated.View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeAnim,
      }}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../Assets/Logo/newLogo.png')}
        />
        <Text style={styles.trustedText}>Trusted online partner</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'black',
  },
  logo: {
    width: 280,
    height: 70,
  },
  trustedText: {
    color: 'white',
    marginTop: -5,
    letterSpacing: 3,
    marginLeft: '30%',
  },
  buttonContainer: {
    borderColor: '#ff9933',
    borderWidth: 0.5,
    width: 300,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 7,
    marginBottom: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '700',
  },
});

export default Intro;
