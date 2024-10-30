import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import mmkv from '../../Components/mmkv';
import {
  MainButton,
  TransparentButton,
} from '../../Components/CustomButtons/buttons';
import AuthLayout from '../../Components/Wrapper/AuthLayout';
import CustomTextInput from '../../Components/CustomInput/CustomTextInput';
import { FONTS, SIZE} from '../../Utilis/Constants';
import EmailIcon from 'react-native-vector-icons/Ionicons';
import route from '../../Components/route';
import {toast} from '@backpackapp-io/react-native-toast';
import { useThemes } from '../../Utilis/ThemeProvider';
const Login = ({navigation}) => {
  const {theme} = useThemes()
  const [password, setPassword] = useState('');
  const [mail, setMail] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const doValidation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      toast.error(`Please enter a valid email id`);
    } else if (mail.trim() === '') {
      toast.error(`Email Id can't be empty`);
    } else if (password === '') {
      toast.error(`Password can't be empty`);
    } else if (password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
    } else {
      handleLogin();
    }
  };

  const doSignup = () => {
    navigation.navigate(route.Signup)
  };

  const handleLogin = () => {
    const allUsers = mmkv.get('users') || [];
    const user = allUsers.find(user => user?.mail === mail && user?.password === password);

    if (user) {
      mmkv.store('loggedInUser', mail);
      navigation.replace(route.Bottomtab);
    } else {
      toast.error('Invalid credentials');
    }
  };
  return (
    <AuthLayout headerText={'Login'}>
      <CustomTextInput
        value={mail}
        onChangeText={text => setMail(text)}
        placeholder="Email"
        icon={<EmailIcon name="mail" size={20} color={theme.colors.buttonColor} />}
        secureTextEntry={false}
        autoCapitalize="none" 
      />
      <CustomTextInput
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="Password"
        secureTextEntry={showPassword}
        showPasswordIcon
        showChangePasswordIcon
        onShowPasswordPress={() => setShowPassword(!showPassword)}
        autoCapitalize="none" 
      />
      <MainButton top={5} bottom={5} press={doValidation} title="Login" />
      <View style={styles.lastContainer}>
        <Text
          style={[
            styles.commom,
            {
              fontFamily: FONTS.medium,
              fontSize: SIZE.regular,
              color: theme.colors.backgroundColor_light,
            },
          ]}>
          Haven’t made an account?
        </Text>
        <TouchableOpacity onPress={doSignup}>
          <Text
            style={[
              styles.commom,
              {
                fontSize: SIZE.medium,
                fontFamily: FONTS.medium,
                marginLeft: 5,
                color: theme.colors.blueText,
              },
            ]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
};

export default Login;

const styles = StyleSheet.create({
  lastContainer: {
    marginTop: 15,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
