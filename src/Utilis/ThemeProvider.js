import React, { createContext, useState, useContext } from 'react';
import { COLORS } from './Constants';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const toggleTheme = () => setIsDarkTheme((prev)=>!prev);
  const theme = {
    colors: isDarkTheme ? COLORS.dark : COLORS.light,
    mode: isDarkTheme ? 'dark' : 'light',
  };


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemes = () => useContext(ThemeContext);
