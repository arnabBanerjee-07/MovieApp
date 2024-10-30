import React, {useState} from 'react';
import {View, useWindowDimensions, Image, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import EyeIcon from 'react-native-vector-icons/FontAwesome';
import LockIcon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTS, SIZE} from '../../Utilis/Constants';
import { useThemes } from '../../Utilis/ThemeProvider';
const CustomTextInput = ({
  value,
  onChangeText,
  placeholder,
  icon,
  keyboardType,
  secureTextEntry,
  showPasswordIcon,
  showChangePasswordIcon,
  onShowPasswordPress,
  editable,
  autoCapitalize
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const themes = useTheme();
  const { theme } = useThemes();
  return (
    <View style={{width: '90%', alignSelf: 'center', marginBottom:20}}>
      <TextInput
        style={{
          marginTop: 5,
          
        //   textColor: 'black',
          backgroundColor: theme.colors.backgroundColor_dark,
          elevation: 2,

        //   borderColor: isFocused ? theme.colors.buttonColor : theme.colors.white,
        //   borderWidth: isFocused ? 0.75 : 0.5,
        //   maxHeight: 55,
        //   justifyContent: 'center',
        //   fontSize: SIZE.small,
        }}
        theme={{
            colors: {
                 onSurfaceVariant: theme.colors.backgroundColor_light
            }
        }}
        mode="outlined"
        label={!isFocused & value === ''? null : placeholder}
        textColor={theme.colors.buttonColor}
        editable={editable}
        value={value}
        autoCapitalize={autoCapitalize ? autoCapitalize : 'sentences'}
        onChangeText={onChangeText}
        placeholder={isFocused  ? null : placeholder}
        selectionColor="rgba(0,0,0,0.25)"
        cursorColor="#000"
        contentStyle={{
          fontFamily: FONTS.r_regular,
          fontSize: SIZE.regular,
          left: -10,
          color: theme.colors.buttonColor,
          top:-2
        }}
        placeholderTextColor={theme.colors.backgroundColor_light}
        
        underlineColor="transparent"
         outlineColor={theme.colors.backgroundColor_light}
         activeOutlineColor={theme.colors.buttonColor}
        activeUnderlineColor="transparent"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        left={
          <TextInput.Icon
            icon={() => (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                //   top: -5,
                }}>
                {showPasswordIcon ? (
                  <View style={{marginRight: 3}}>
                    <LockIcon
                      name={secureTextEntry ? 'lock' : 'lock-open'}
                      size={23}
                      color={theme.colors.buttonColor}
                      onPress={onShowPasswordPress}
                    />
                  </View>
                ) : showChangePasswordIcon ? (
                  <View style={{marginRight: 3}}>
                    <EyeIcon
                      name={secureTextEntry ? 'eye' : 'eye-off'}
                      size={20}
                      color={theme.colors.buttonColor}
                      onPress={onShowPasswordPress}
                    />
                  </View>
                ) : (
                  icon
                )}
              </View>
            )}
          />
        }
        right={
          <TextInput.Icon
            icon={() => (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',                
                //   top: -5,
                }}>
                {showChangePasswordIcon ? (
                  <View style={{marginRight: 3}}>
                    <EyeIcon
                      name={secureTextEntry ? 'eye' : 'eye-slash'}
                      size={20}
                      color={theme.colors.white}
                      onPress={onShowPasswordPress}
                    />
                  </View>
                ) : null}
              </View>
            )}
          />
        }
      />
      {
        !isFocused && value === '' && (
            <Text style={{marginLeft:15, marginTop:2, fontFamily:FONTS.regular, fontSize: SIZE.small, color: theme.colors.backgroundColor_light}}>Inactive</Text>
        )
      }
    </View>
  );
};

export default CustomTextInput;