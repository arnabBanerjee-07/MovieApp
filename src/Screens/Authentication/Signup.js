import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import mmkv from '../../Components/mmkv';
import {
  MainButton,
  TransparentButton,
} from '../../Components/CustomButtons/buttons';
import AuthLayout from '../../Components/Wrapper/AuthLayout';
import CustomTextInput from '../../Components/CustomInput/CustomTextInput';
import {FONTS, SIZE} from '../../Utilis/Constants';
import EmailIcon from 'react-native-vector-icons/Ionicons';
import UserIcon from 'react-native-vector-icons/SimpleLineIcons';
import route from '../../Components/route';
import {toast} from '@backpackapp-io/react-native-toast';
import {assetsImages} from '../../Utilis/ImagesPath';
import {useThemes} from '../../Utilis/ThemeProvider';

const Signup = ({navigation}) => {
  const {theme} = useThemes();
  const [password, setPassword] = useState('');
  const [mail, setMail] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [userName, setUserName] = useState('');

  const doValidation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      toast.error(`Please enter a valid email id`);
    } else if (mail.trim() === '') {
      toast.error(`Email Id can't be empty`);
    } else if (userName.trim() === '') {
      toast.error(`Username can't be empty`);
    } else if (password === '') {
      toast.error(`Password can't be empty`);
    } else if (password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
    } else {
      handleSignup();
    }
  };

  const handleSignup = () => {
    const allUsers = mmkv.get('users') || [];
    if (allUsers.length >= 15) {
      toast.error('Maximum user limit reached');
      return;
    }

    const userExists = allUsers.some(user => user.mail === mail);
    if (userExists) {
      toast.error('User with this email already exists.');
      return;
    }

    const newUser = {mail, userName, password};
    allUsers.push(newUser);
    mmkv.store('users', allUsers);
    mmkv.store('loggedInUser', mail);

    toast.success(
      `Sign-Up successful. ${15 - allUsers.length} slots remaining.`,
    );
    navigation.replace(route.Login);
  };

  const doSignup = () => {
    navigation.navigate(route.Login);
  };

  return (
    <AuthLayout headerText={'Sign Up'}>
      <CustomTextInput
        value={mail}
        onChangeText={text => setMail(text)}
        placeholder="Email"
        icon={
          <EmailIcon name="mail" size={20} color={theme.colors.buttonColor} />
        }
        secureTextEntry={false}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <CustomTextInput
        value={userName}
        onChangeText={text => setUserName(text)}
        placeholder="Username"
        // icon={<UserIcon name="user" size={20} color={theme.colors.buttonColor} />}
        icon={
          <Image
            source={assetsImages.userIcon}
            style={{height: 24, width: 24}}
            resizeMode={'contain'}
          />
        }
        secureTextEntry={false}
      />
      <CustomTextInput
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="Password"
        secureTextEntry={showPassword}
        showPasswordIcon
        showChangePasswordIcon
        autoCapitalize="none"
        onShowPasswordPress={() => setShowPassword(!showPassword)}
      />
      <MainButton
        top={5}
        bottom={5}
        press={doValidation}
        title="Create Account"
      />
      <View style={styles.lastContainer}>
        <Text
          style={{
            color: theme.colors.backgroundColor_light,
            fontSize: SIZE.regular,
            fontFamily: FONTS.medium,
          }}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={doSignup}>
          <Text
            style={[
              styles.left,
              {
                color: theme.colors.blueText,
                fontSize: SIZE.medium,
                fontFamily: FONTS.medium,
              },
            ]}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
};

export default Signup;

const styles = StyleSheet.create({
  lastContainer: {
    marginTop: 15,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    marginLeft: 5,
  },
});
