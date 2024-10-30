import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import mmkv from '../Components/mmkv';
import route from '../Components/route';
import Login from '../Screens/Authentication/Login';
import Signup from '../Screens/Authentication/Signup';
import InitialScreen from '../Screens/LandingPage/InitialScreen';
import Home from '../Screens/MovieList/Home';
import Details from '../Screens/MovieList/Details';
import SearchScreen from '../Screens/TabScreens/SearchScreen';
import Favorite from '../Screens/TabScreens/Favorite';
import Settings from '../Screens/TabScreens/Settings';
import MyBottomTabs from './BottomNav';

const Stack = createStackNavigator();

const Index = () => {
  const [initialRoute, setInitialRoute] = useState(null);
  useEffect(() => {
    const loggedInUser = mmkv.get('loggedInUser');
    console.log(loggedInUser);
    setInitialRoute(loggedInUser ? route.Bottomtab : route.Initial);
  }, []);
  if (!initialRoute) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={initialRoute}>
        <Stack.Screen name={route.Initial} component={InitialScreen} />
        <Stack.Screen
          name={route.Login}
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={route.Signup}
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={route.Details}
          component={Details}
          options={{headerShown: false}}
        />
        <Stack.Screen name={route.SearchScreen} component={SearchScreen} />
        <Stack.Screen
          name={route.Bottomtab}
          component={MyBottomTabs}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Index;
