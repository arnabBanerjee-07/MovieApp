import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import AppContainer from './src/Navigation/Index';
import { toast, Toasts } from '@backpackapp-io/react-native-toast';
import { ThemeProvider, useThemes } from './src/Utilis/ThemeProvider';
import "./src/Utilis/i18n"
const App = () => {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <MainApp />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

// Use useThemes here, inside a child component of ThemeProvider
const MainApp = () => {
  const { theme } = useThemes();

  return (
    <>
    <ThemeProvider>
      <AppContainer />
      <Toasts 
      overrideDarkMode={theme.mode === 'dark'}
       />
       </ThemeProvider>
    </>
  );
};

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor:'#fff'
//   },
// })
