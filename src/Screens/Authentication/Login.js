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
import { useTranslation } from 'react-i18next';
const Login = ({navigation}) => {
  const {theme} = useThemes()
  const { t }  = useTranslation()
  const [password, setPassword] = useState('');
  const [mail, setMail] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const doValidation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      toast.error(t('validEmail'));
    } else if (mail.trim() === '') {
      toast.error(t('emailEmpty'));
    } else if (password === '') {
      toast.error(t('passwordEmpty'));
    } else if (password.length < 8) {
      toast.error('passwordLength');
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
      toast.error(t('invalidCredentials'));
    }
  };
  return (
    <AuthLayout headerText={t('login')}>
      <CustomTextInput
        value={mail}
        onChangeText={text => setMail(text)}
        placeholder={t("email")}
        icon={<EmailIcon name="mail" size={20} color={theme.colors.buttonColor} />}
        secureTextEntry={false}
        autoCapitalize="none" 
      />
      <CustomTextInput
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder={t("password")}
        secureTextEntry={showPassword}
        showPasswordIcon
        showChangePasswordIcon
        onShowPasswordPress={() => setShowPassword(!showPassword)}
        autoCapitalize="none" 
      />
      <MainButton top={5} bottom={5} press={doValidation} title={t('login')} />
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
          {t("noAccount")}
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
            {t('signUp')}
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
