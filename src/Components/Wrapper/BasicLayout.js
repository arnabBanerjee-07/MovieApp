import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView,
    ImageBackground,
    SafeAreaView,
  } from 'react-native';
  import React from 'react';
  import {COLORS, SIZE, FONTS, HEIGHT} from '../../Utilis/Constants';
import { useThemes } from '../../Utilis/ThemeProvider';

const BasicLayout = ({children, loading, headerText}) => {
  const {theme} = useThemes()
  console.log(theme.mode)
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.backgroundColor_dark}}>
       <StatusBar backgroundColor={theme.colors.black} barStyle={theme.mode === 'light' ? "dark-content": 'light-content'} />
        <ScrollView
          contentContainerStyle={styles.containerStyle}
          keyboardShouldPersistTaps="always">
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  };

export default BasicLayout

const styles = StyleSheet.create({
  containerStyle: {
    flexGrow: 1,
    paddingBottom:50
  }
})