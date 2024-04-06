import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useBaseUrl} from './BaseUrlContext';
import Carousel from 'react-native-snap-carousel';

const Demo = ({navigation}) => {
  const {baseUrl} = useBaseUrl();
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/advertisements/allAds`);
        const data = await response.json();
        setAdvertisements(data.advertisements);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({item}) => (
    <View >
    <View
      style={{
        marginTop: 20,
        width: 360,
        height: 150,
        // backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: '90%',
          height: '95%',
          // backgroundColor:'red',
          elevation: 1,
          borderRadius: 8,
        }}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            borderRadius: 4,
            // elevation: 3,
          }}
          source={{
            uri: `${baseUrl}${item.banner}`,
          }}
        />
      </View>

      <View
        style={{
          alignItems: 'flex-start',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '80%',
          height: '80%',
          // backgroundColor: 'red',
          position: 'absolute',
          marginLeft: '5%',
        }}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: '600',
            color: 'red',
            fontStyle: 'italic',
          }}>
          {item.heading}
        </Text>
        <Text
          style={{
            fontSize: 15,
            marginTop: 8,
            marginBottom: 12,
            fontWeight: '500',
            color: 'black',
            fontStyle: 'italic',
          }}>
          {item.subHeading}
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
          <View
            style={{
              borderRadius: 2,
              width: 80,
              height: 27,
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 10,
                color: 'white',
                textAlign: 'center',
              }}>
              Shop Now
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={advertisements}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width * 0.8}
        autoplay
        autoplayInterval={100}
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
 
});

export default Demo;
