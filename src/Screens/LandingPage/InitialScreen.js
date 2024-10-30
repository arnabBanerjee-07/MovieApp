import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import mmkv from '../../Components/mmkv';

import BasicLayout from '../../Components/Wrapper/BasicLayout';
import {assetsImages} from '../../Utilis/ImagesPath';
import {COLORS, HEIGHT, WIDTH} from '../../Utilis/Constants';
import {
  MainButton,
  TransparentButton,
} from '../../Components/CustomButtons/buttons';
import route from '../../Components/route';
import { ThemeProvider, useThemes } from '../../Utilis/ThemeProvider';
import i18n from '../../Utilis/i18n';
import { useTranslation } from 'react-i18next';

const InitialScreen = props => {
  const { theme } = useThemes();
  const {t} = useTranslation()
  const navigateToLogin = () => {
    props.navigation.navigate(route.Login);
  };
  const navigateToSignup = () => {
    props.navigation.navigate(route.Signup);
  };
  return (
    <BasicLayout>
      <ImageBackground
        source={assetsImages.bannerImage1}
        style={styles.imgStyle}
        resizeMode="stretch">
        <View
          style={[styles.box, { backgroundColor: theme.colors.transparentBackground,}]}
          >
          <MainButton
            top={5}
            bottom={5}
            press={navigateToLogin}
            title={t('login')}
          />
          <TransparentButton
            top={10}
            bottom={5}
            press={navigateToSignup}
            title={t('signUp')}
          />
        </View>
      </ImageBackground>
    </BasicLayout>
  );
};

export default InitialScreen;

const styles = StyleSheet.create({
  box: {
    paddingVertical: 30,
    width: '100%',
   
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imgStyle: {
    height: "100%",
    width: "100%",
    justifyContent: 'flex-end',
    // alignItems: 'center',
  }
});
