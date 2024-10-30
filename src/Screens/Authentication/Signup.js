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
import { useTranslation } from 'react-i18next';

const Signup = ({navigation}) => {
  const { t }  = useTranslation()
  const {theme} = useThemes();
  const [password, setPassword] = useState('');
  const [mail, setMail] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [userName, setUserName] = useState('');

  const doValidation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      toast.error(t("validEmail"));
    } else if (mail.trim() === '') {
      toast.error(t("emailEmpty"));
    } else if (userName.trim() === '') {
      toast.error(t("usernameEmpty"));
    } else if (password === '') {
      toast.error(t("passwordEmpty"));
    } else if (password.length < 8) {
      toast.error(t("passwordLength"));
    } else {
      handleSignup();
    }
  };

  const handleSignup = () => {
    const allUsers = mmkv.get('users') || [];
    if (allUsers.length >= 15) {
      toast.error(t("maxUsers"));
      return;
    }

    const userExists = allUsers.some(user => user.mail === mail);
    if (userExists) {
      toast.error(t("userExists"));
      return;
    }

    const newUser = {mail, userName, password};
    allUsers.push(newUser);
    mmkv.store('users', allUsers);
    mmkv.store('loggedInUser', mail);

    toast.success(
      `${t("signUpSuccess")} ${15 - allUsers.length} ${t("slotsRemaining")}`,
    );
    navigation.replace(route.Login);
  };

  const doSignup = () => {
    navigation.navigate(route.Login);
  };

  return (
    <AuthLayout headerText={t('signUp')}>
      <CustomTextInput
        value={mail}
        onChangeText={text => setMail(text)}
        placeholder={t("email")}
        icon={
          <EmailIcon name="mail" size={20} color={theme.colors.buttonColor} />
        }
        secureTextEntry={false}
        autoCapitalize="none"
      />
      <CustomTextInput
        value={userName}
        onChangeText={text => setUserName(text)}
        placeholder={t("username")}
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
        placeholder={t("password")}
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
          {t('alreadyAccount')}
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
            {t('login')}
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
