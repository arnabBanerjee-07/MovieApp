import {
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {SIZE, FONTS, HEIGHT} from '../../Utilis/Constants';
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
import {assetsImages} from '../../Utilis/Image';
import {useThemes} from '../../Utilis/ThemeProvider';

const AuthLayout = ({children, loading, headerText}) => {
  const {theme} = useThemes();
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: theme.colors.backgroundColor_dark}}>
      <StatusBar
        backgroundColor={theme.colors.black}
        barStyle={theme.mode === 'light' ? 'dark-content' : 'light-content'}
      />
      <ScrollView
        contentContainerStyle={styles.containerStyle}
        keyboardShouldPersistTaps="always">
        <Text
          style={[
            styles.textStyle,
            {
              color: theme.colors.backgroundColor_light,
              fontFamily: FONTS.bold,
              fontSize: SIZE.heading,
            }
          ]}>
          {headerText}
        </Text>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  containerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 20,
  },
});
