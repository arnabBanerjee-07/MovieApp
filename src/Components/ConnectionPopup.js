import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  Modal,
  StatusBar,
  Animated,
  useWindowDimensions,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {COLORS, HEIGHT, WIDTH, FONTS, SIZE} from '../Utilis/Constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
const NoInternetPopup = () => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity of 0
  const {fontScale} = useWindowDimensions();
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Icon
        name="wifi-off"
        color="#aaa"
        size={100}
        style={{alignSelf: 'center', marginTop: '35%'}}
      />
      <Text
        style={{
          color: '#fff',
          fontSize: SIZE.large,
          textAlign: 'center',
          marginTop: 20,
          fontFamily: FONTS.black,
        }}>
        This App needs an active Internet Connection ...
      </Text>
      <Text
        style={{
          color: '#fff',
          fontSize: SIZE.medium,
          textAlign: 'center',
          marginTop: 20,
          fontFamily: FONTS.semiBoldHeader,
        }}>
        Please connect to the internet
      </Text>
      <Animated.Text
        style={{
          marginLeft: 10,
          color: 'gold',
          fontSize: SIZE.medium,
          textAlign: 'center',
          // marginTop: "30%",
          fontFamily: FONTS.light,
          opacity: fadeAnim,
          position: 'absolute',
          bottom: 50,
          alignSelf: 'center',
        }}>
        trying to reconnect...
      </Animated.Text>
    </View>
  );
};

const Popup = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const handleConnectivityChange = state => {
      setIsConnected(state.isConnected);
    };

    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleConnectivityChange = state => {
      setIsConnected(state.isConnected);
    };

    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    !isConnected && (
      <View>
        <Modal visible={!isConnected} transparent>
          <StatusBar
            backgroundColor={'rgba(0,0,0,1)'}
            barStyle="light-content"
          />
          <NoInternetPopup />
          {/* <ConnectingAnimation /> */}
        </Modal>
      </View>
    )
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};


export default Popup;