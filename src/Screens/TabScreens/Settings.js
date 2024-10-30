import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import TabScreenLayout from '../../Components/Wrapper/TabScreenLayout';
import {FONTS, SIZE} from '../../Utilis/Constants';
import {useThemes} from '../../Utilis/ThemeProvider';
import {assetsImages} from '../../Utilis/ImagesPath';
import SettingsOption from '../../Components/SettingScreen/SettingOptions';
import mmkv from '../../Components/mmkv';
import i18n from '../../Utilis/i18n';
import { useTranslation } from 'react-i18next';

const Settings = ({navigation}) => {
  const {theme, toggleTheme} = useThemes();
  const { t } = useTranslation();
  const [selected, setSelected] = useState('');
  const [selectedLan, setSelectedLan] = useState('en');
  const handleLogout = () => {
    mmkv.remove('loggedInUser');
    mmkv.remove('favorites')
    navigation.replace('Login');
  };

  const changeLanguage = (lang) => {
    setSelectedLan(lang);
    i18n.changeLanguage(lang);
    mmkv.store('language', lang)
  };
  return (
    <TabScreenLayout headerText={t('Settings')}>
      <View style={{width: '90%', alignSelf: 'center', marginTop: 15}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              height: 90,
              width: 90,
              backgroundColor: '#aaa',
              elevation: 5,
              borderRadius: 90,
              overflow: 'hidden',
            }}>
            <Image
              source={assetsImages.prifileImg}
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 90,
                resizeMode: 'cover',
              }}
            />
          </TouchableOpacity>
          <View style={{marginLeft: 15}}>
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                fontSize: SIZE.large,
                color: theme.colors.backgroundColor_light,
              }}>
              Worlder
            </Text>
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: SIZE.regular,
                color: theme.colors.backgroundColor_light,
                marginTop: 2,
              }}>
              worlder@wolonote.com
            </Text>
          </View>
        </View>
        <View style={{marginTop: 15, marginLeft: 10}}>
          <SettingsOption
            icon={assetsImages.accountIcon}
            title={t('Account')}
            isSelected={selected === 'Account'}
            onPress={() => setSelected('Account')}
            theme={theme}
          />

          <SettingsOption
            icon={assetsImages.playIcon}
            title={t("Appearance")}
            isSelected={selected === 'Appearance'}
            onPress={() => setSelected('Appearance')}
            theme={theme}>
            {/* Additional Options for Appearance */}
            <View style={styles.subOptionContainer}>
              <View style={styles.themeContainer}>
                <View style={styles.themeToggleContainer}>
                  <Image
                    source={assetsImages.themeIcon}
                    style={[styles.subImgStyle,{
                      
                      tintColor: theme.colors.blueText,
                    }]}
                  />
                  <Text
                    style={[
                      styles.subOptionText,
                      {
                        fontFamily: FONTS.medium,
                        fontSize: SIZE.regular,
                        color: theme.colors.blueText,
                      },
                    ]}>
                    {t('Theme')}
                  </Text>
                </View>
                <View style={styles.themeToggleContainer}>
                  <TouchableOpacity
                    style={[
                      styles.themeButton,
                      {
                        backgroundColor: '#fff',
                        opacity: theme.mode === 'light' ? 1 : 0.7,
                      },
                    ]}
                    onPress={() =>
                      theme.mode === 'light' ? null : toggleTheme()
                    }>
                    <Text
                      style={[
                        styles.themeButtonText,
                        {fontFamily: FONTS.medium, fontSize: SIZE.regular},
                      ]}>
                      {t('Light')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.themeButton,
                      {
                        
                        borderColor: '#fff',
                        backgroundColor: '#000',
                        opacity: theme.mode === 'dark' ? 1 : 0.5,
                      },
                    ]}
                    onPress={() =>
                      theme.mode === 'dark' ? null : toggleTheme()
                    }>
                    <Text
                      style={[
                        styles.themeButtonText,
                        {
                          fontFamily: FONTS.medium,
                          fontSize: SIZE.regular,
                          color: '#fff',
                        },
                      ]}>
                      {t('Dark')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Language Toggle */}
              <View style={styles.languageContainer}>
                <View style={styles.themeToggleContainer}>
                  <Image
                    source={assetsImages.languageIcon}
                    style={[styles.subImgStyle,{
                      
                      tintColor: theme.colors.blueText,
                    }]}
                  />
                  <Text
                    style={[
                      styles.subOptionText,
                      {
                        fontFamily: FONTS.medium,
                        fontSize: SIZE.regular,
                        color: theme.colors.blueText,
                      },
                    ]}>
                    {t('Language')}
                  </Text>
                </View>
                <View style={{marginRight: 5, alignItems: 'center'}}>
                  <TouchableOpacity
                    style={{
                      opacity: selectedLan === 'en' ? 1 : 0.7,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() => changeLanguage('en')}>
                    {selectedLan === 'en' && (
                      <View
                        style={[
                          styles.radioDot,
                          {backgroundColor: theme.colors.buttonColor},
                        ]}
                      />
                    )}
                    <Text
                      style={[
                        styles.languageText,
                        {
                          fontFamily: FONTS.medium,
                          fontSize: SIZE.medium,
                          color:
                            selectedLan === 'en'
                              ? theme.colors.buttonColor
                              : theme.colors.backgroundColor_light,
                        },
                      ]}>
                      English(en)
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      opacity: selectedLan === 'es' ? 1 : 0.5,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 5,
                    }}
                    onPress={() => changeLanguage('es')}>
                    {selectedLan === 'es' && (
                      <View
                        style={[
                          styles.radioDot,
                          {backgroundColor: theme.colors.buttonColor},
                        ]}
                      />
                    )}
                    <Text
                      style={[
                        styles.languageText,
                        {
                          fontFamily: FONTS.medium,
                          fontSize: SIZE.medium,
                          color:
                            selectedLan === 'es'
                              ? theme.colors.buttonColor
                              : theme.colors.backgroundColor_light,
                        },
                      ]}>
                      Spanish(es)
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SettingsOption>

          <SettingsOption
            icon={assetsImages.helpIcon}
            title={t("Help")}
            isSelected={selected === 'Help'}
            onPress={() => setSelected('Help')}
            theme={theme}
          />

          <SettingsOption
            icon={assetsImages.logoutIcon}
            title={t("Logout")}
            isSelected={false} // Logout doesn't need selection, functionality will do at last
            onPress={() => handleLogout()}
            theme={theme}
          />
        </View>
      </View>
    </TabScreenLayout>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginLeft: 10,
  },
  subOptionContainer: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  themeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  themeToggleContainer: {
    flexDirection: 'row',
  },
  themeButton: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  themeButtonText: {
    color: '#000',
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageToggleContainer: {
    flexDirection: 'column',
  },
  languageText: {
    marginLeft: 5,
  },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 10,
    // marginRight: 5,
  },
  subOptionText: {
    marginLeft: 8,
  },
  subImgStyle: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  }
});
