import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
  } from 'react-native';
  import React from 'react';
  import { FONTS, HEIGHT, SIZE} from '../../Utilis/Constants';
  import {BarIndicator} from 'react-native-indicators';
import {  useThemes } from '../../Utilis/ThemeProvider';
  const MainButton = props => {
    const {fontScale} = useWindowDimensions();
    const { theme } = useThemes();
    
    return (
      <TouchableOpacity
        style={{
          borderRadius: 5,
          elevation: 10,
          backgroundColor: theme.colors.buttonColor,
          width: '90%',
          height: 50,
          alignSelf: 'center',
          marginTop: props.top,
          marginBottom: props.bottom,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 10,
        }}
        onPress={() => props.press()}>
        
          <Text
            style={{
              color: theme.colors.textPrimary_light,
              fontSize: SIZE.medium,
              fontFamily: FONTS.bold,
              // paddingTop: 3,
              textAlign: 'center',
              paddingVertical: 9,
            //   textTransform: 'uppercase',
            }}>
            {props.title}
          </Text>
        
      </TouchableOpacity>
    );
  };
  const TransparentButton = props => {
    const {fontScale} = useWindowDimensions();
    const { theme } = useThemes();
    return (
      <TouchableOpacity
        style={{
          borderRadius: 5,
          borderColor: theme.colors.buttonColor,
          borderWidth: 2,
          width: '90%',
          height: 50,
          alignSelf: 'center',
          marginTop: props.top,
          marginBottom: props.bottom,
          alignItems: 'center',
          justifyContent: 'center',
        //   elevation: 0.2,
          backgroundColor:'transparent'
        }}
        onPress={() => props.press()}>
       
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
          
            <Text
              style={{
                color: theme.colors.buttonColor,
                fontSize: SIZE.medium,
                fontFamily: FONTS.bold,
                // paddingTop: 3,
                textAlign: 'center',
                paddingVertical: 9,
                // textTransform: 'uppercase',
              }}>
              {props.title}
            </Text>
          </View>
        
      </TouchableOpacity>
    );
  };

  export {MainButton, TransparentButton};
