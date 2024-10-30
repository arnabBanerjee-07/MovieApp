import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import route from '../Components/route';
import Home from '../Screens/MovieList/Home';
import { FONTS, SIZE} from '../Utilis/Constants';
import {Image, Text} from 'react-native';
import {assetsImages} from '../Utilis/ImagesPath';
import SearchScreen from '../Screens/TabScreens/SearchScreen';
import Favorite from '../Screens/TabScreens/Favorite';
import Settings from '../Screens/TabScreens/Settings';
import { useThemes } from '../Utilis/ThemeProvider';

const Tab = createBottomTabNavigator();

const MyBottomTabs = () => {
    const {theme} = useThemes()
    const tabBarIcon =
  name =>
  ({focused, color, size}) =>
    (
      <Image
        source={name}
        style={{
          width: 25,
          height: 25,
          resizeMode: 'cover',
          top:5,
          tintColor: focused ? theme.colors.activeTabbar : theme.colors.inactiveTabbar,
        }}
      />
    );
    const tabLabel = name => ({focused}) => (
        <Text
          style={{
            color: focused ? theme.colors.activeTabbar : theme.colors.inactiveTabbar,
            fontSize: SIZE.small,
            fontFamily: FONTS.medium,
            paddingBottom:5
          }}
        >
          {name}
        </Text>
      );
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: false,
        // tabBarActiveTintColor: theme.colors.backgroundColor_dark,
        // tabBarInactiveTintColor: theme.colors.backgroundColor_dark,
        
        tabBarStyle: {

            width:"100%",
            alignSelf:'center',
          height: 60,
 
          backgroundColor: theme.colors.backgroundColor_dark
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: tabBarIcon(assetsImages.homeIcon),
          tabBarLabel: tabLabel('Home'),
        }}
        name={route.Home}
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: tabBarIcon(assetsImages.searchIcon),
          tabBarLabel: tabLabel('Search'),
        }}
        name={route.SearchScreen}
        component={SearchScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: tabBarIcon(assetsImages.favIcon),
          tabBarLabel: tabLabel('Favorites'),
        }}
        name={route.Favorites}
        component={Favorite}
      />
      <Tab.Screen
        options={{
          tabBarIcon: tabBarIcon(assetsImages.settingIcon),
          tabBarLabel: tabLabel('Settings'),
        }}
        name={'Settings'}
        component={Settings}
      />
    </Tab.Navigator>
  );
};

export default MyBottomTabs;
