import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import { COLORS, SIZE, FONTS, HEIGHT } from '../../Utilis/Constants';
import { assetsImages } from '../../Utilis/ImagesPath';
import { useThemes } from '../../Utilis/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
const TabScreenLayout = ({ children, loading, headerText, isBack }) => {
  const navigation = useNavigation();
  const { theme } = useThemes();
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.backgroundColor_dark }}>
      <StatusBar
        backgroundColor={theme.colors.black}
        barStyle={theme.mode === 'light' ? 'dark-content' : 'light-content'}
      />
          {loading ? (
          <View
            style={{
              marginTop: HEIGHT * 0.45,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <SkypeIndicator color={COLORS.orange} size={40} />
            <Text
              style={{
                marginTop: 30,
                color: COLORS.price,
                zIndex: 500,
                fontSize: SIZE.large,
                fontFamily: FONTS.regular,
              }}>
              Loading ...
            </Text>
          </View>
        ) : (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.headerContainer}>
          {isBack && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Image source={assetsImages.leftIcon} style={styles.img} />
            </TouchableOpacity>
          )}
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[
              styles.headerStyle,
              {
                color: theme.colors.backgroundColor_light,
                fontFamily: FONTS.bold,
                fontSize: SIZE.heading,
              },
            ]}
          >
            {headerText}
          </Text>
        </View>
        <View style={[styles.textStyle, { backgroundColor: theme.colors.black }]} />
        {children}
      </ScrollView>
)}
    </SafeAreaView>
  );
};

export default TabScreenLayout;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 15,
  },
  headerStyle: {
    maxWidth: '90%', // limit width to remains with bounds
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    zIndex: 1, // ensure header text is clickable
  },
  img: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  textStyle: {
    width: '100%',
    height: 4,
    marginBottom: 10,
    elevation: 20,
  },
});
