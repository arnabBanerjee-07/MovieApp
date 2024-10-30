import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState, useCallback} from 'react';
import TabScreenLayout from '../../Components/Wrapper/TabScreenLayout';
import {assetsImages} from '../../Utilis/ImagesPath';
import {useThemes} from '../../Utilis/ThemeProvider';
import {FONTS, HEIGHT, SIZE} from '../../Utilis/Constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EmptyIcon from 'react-native-vector-icons/AntDesign'
import mmkv from '../../Components/mmkv';
import {useFocusEffect} from '@react-navigation/native';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';

const Favorite = ({navigation}) => {
  const {theme} = useThemes();
  const [data, setData] = useState([]);
  const {t} = useTranslation()
  useFocusEffect(
    useCallback(() => {
      const FAV_ITEMS = mmkv.get('favorites');
      setData(FAV_ITEMS);
      console.log('FAV::', FAV_ITEMS);
    }, []),
  );
const removeFavorite = (item) => {
  const updatedData = data.filter((favItem) => favItem.id !== item.id);
  setData(updatedData);
  mmkv.store('favorites', updatedData); // Update storage
};
const handlePress = item => {
  console.log(item);
  navigation.navigate(route.Details,{movieId: item.id, movieName: item.original_title, moviePoster: item.poster_path})
};
const menuOptionsStyles = {
  optionsContainer: {
    backgroundColor: 'rgba(18, 18, 18, 0.8)', // Set the background color to black
    padding: 5,
    borderRadius: 8,
  },
};
  return (
    <MenuProvider>
    <TabScreenLayout headerText={t('Favorites')}>
      <View style={{width: '90%', alignSelf: 'center'}}>
        {data.length == 0 ? (
          <View style={{marginTop: HEIGHT * 0.3,alignItems:'center', justifyContent:'center'}}>
          <EmptyIcon name='meh' style={{marginBottom:8,}} size={50} color="#aaa" />
          <Text
            style={{
              
              color: theme.colors.white,
              fontSize: SIZE.medium,
              fontFamily: FONTS.regular,
              textAlign:'center',
              lineHeight:24
            }}>
            {/* You haven't saved any favorites. Discover movies to fill this space! */}
            {t('NoFavorites')}
          </Text>
              </View>
        ) : (
          data.map((item, i) => (
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }} key={item.id}>
              <View style={{flexDirection: 'row', width: '70%'}}>
                <View
                  style={{
                    height: 150,
                    width: 100,
                    backgroundColor: theme.colors.white,
                    elevation: 50,
                    shadowColor: theme.colors.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
                    }}
                    style={{height: '99%', width: '99%', resizeMode: 'stretch'}}
                  />
                </View>
                <View
                  style={{marginLeft: '3.5%', marginTop: 5, width: '87.5%'}}>
                  <Text
                    style={{
                      fontFamily: FONTS.semiBold,
                      fontSize: SIZE.large,
                      color: theme.colors.backgroundColor_light,
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.medium,
                      marginTop: 8,
                      fontSize: SIZE.medium,
                      color: theme.colors.textSecondary,
                    }}>
                    {item.release_date.substring(0, 4)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}>
                   <Menu>
                  <MenuTrigger>
                    <Icon
                      name="dots-vertical"
                      size={30}
                      color={theme.colors.textPrimary_dark}
                    />
                  </MenuTrigger>
                  <MenuOptions customStyles={menuOptionsStyles} >
                    <MenuOption  onSelect={() => removeFavorite(item)}>
                      <Text style={{ color: theme.colors.buttonColor, fontSize: SIZE.small, fontFamily: FONTS.regular }}>
                        Remove from Favorites
                      </Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
                <TouchableOpacity
                  style={{
                    marginBottom: 12,
                    padding: 5,
                    borderRadius: 8,
                    backgroundColor: '#EAFFE7',
                    borderColor: '#7BBB71',
                    borderWidth: 1,
                  }} onPress={()=>handlePress(item)}>
                  <Text
                    style={{
                      fontFamily: FONTS.medium,
                      fontSize: SIZE.medium,
                      color: '#7BBB71',
                      paddingHorizontal:8
                    }}>
                    Details
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </TabScreenLayout>
    </MenuProvider>
  );

};

export default Favorite;

const styles = StyleSheet.create({
  optionsContainer: {
    backgroundColor: 'black', // Set the background color to black
    padding: 5,
    borderRadius: 8,
  },
});
