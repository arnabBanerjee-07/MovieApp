import {Dimensions, useWindowDimensions} from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const fontScale = useWindowDimensions().fontScale;
export const baseURL =
  'https://bit73.mydevfactory.com/abhisek/shelter_pro/wp-json/';
const COLORS = {
  dark: {
  black: '#000000',
  white: '#FFFF',
  textPrimary_dark: '#F3F3F3',
  textPrimary_light: '#121212',
    textSecondary: '#969696',
    buttonColor :'#32A873',
    backgroundColor_dark: '#121212',
    backgroundColor_light: '#F3F3F3',
    blueText: "#95ACFF",
transparentBackground : "rgba(18, 18, 18, 0.8)",
transparentBackground2 : "rgba(243, 243, 243, 0.8)",
inactiveTabbar: '#BBBBBB',
activeTabbar: '#32A873',
blue: '#354270',
  },
  light:{
    black: '#F3F3F3',
  white: '#000',
  textPrimary_light: '#F3F3F3',
  textPrimary_dark: '#121212',
    textSecondary: '#969696',
    buttonColor :'#32A873',
    backgroundColor_light: '#121212',
    backgroundColor_dark: '#F3F3F3',
    blueText: "#354270",
transparentBackground : "rgba(243, 243, 243, 0.8)",
transparentBackground2: "rgba(18, 18, 18, 0.8)",
inactiveTabbar: '#BBBBBB',
activeTabbar: '#32A873',
blue: '#354270',
  },
  secondary: '#5B5B5B',
  secondary2: '#A8A8A8',
  sblack: '#303030',
  orange: '#FF8913',
  price: '#FF6902',
  secondaryButton: '#262C36',
  grey: '#888B8B',
  month: '#809093',
  placeholder: '#BABABA',

  shadeGrey: '#D9D9D9',
  seeAll: '#5B739D',
  blue: '#354270',
  offWhite: '#EEEEFE',
  description: '#717786',

  borderColor: '#9DC0C6',
  blurWhite: '#A6B5C04D',

  semiGrey: '#838383',

  lightGrey: '#838383',

  success: '#228B22',
  unsuccessful: '#CC0000',
  unsuccessful2: '#E62020',
};

const FONTS = {
  black: 'Inter_18pt-Black',
  bold: 'Inter_18pt-Bold',
  semiBold: 'Inter_18pt-SemiBold',
  extraBold: 'Inter_18pt-ExtraBold',
  light: 'Inter_18pt-Light',
  medium: 'Inter_18pt-Medium',
  regular: 'Inter_18pt-Regular',
  thin: 'Inter_18pt-Thin',
  extraLight: 'Inter_18pt-ExtraLight',

  r_bold:'Roboto-Bold',
  r_medium:'Roboto--Medium',
  r_regular:'Roboto-Regular',
  r_light:'Roboto-Light'
};

const SIZE = {
  extraSmall: 12 / fontScale,
  small: 14 / fontScale,
  regular: 15 / fontScale,
  medium: 16 / fontScale,
  large: 18 / fontScale,
  heading: 20 / fontScale,
};

export {COLORS, FONTS, HEIGHT, WIDTH, SIZE};