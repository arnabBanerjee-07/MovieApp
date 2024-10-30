import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useThemes } from '../../Utilis/ThemeProvider';
import {FONTS, SIZE} from '../../Utilis/Constants';
const SettingsOption = ({ icon, title, isSelected, onPress, children, theme }) =>{
    
    return(
  <View style={styles.optionContainer}>
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <Image
        source={icon}
        style={[
          styles.icon,
          { tintColor: isSelected ? theme.colors.buttonColor : theme.colors.backgroundColor_light },
        ]}
      />
      <Text
        style={[
          styles.text, 
          {fontFamily: FONTS.semiBold,
            fontSize: SIZE.medium, color: isSelected ? theme.colors.buttonColor : theme.colors.backgroundColor_light },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>

    {isSelected && children}
  </View>
);
}

const styles = StyleSheet.create({
  optionContainer: {
    marginTop: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  text: {
              
    marginLeft: 15,
  },
});

export default SettingsOption;
