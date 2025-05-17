export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  error: '#E41212',
  success: '#00CB3D',
  gray: {
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  blue: {
    50: '#F0F4FF',
    100: '#D9E8FF',
    200: '#92CFFF',
    300: '#64BBFF',
    400: '#41ABFF',
    500: '#269CFF',
    600: '#2D8DFF',
    700: '#2F7AF3',
    800: '#3068E0',
    900: '#0054D1',
  },
} as const

export const fontSize = {
  xxs: '0.75rem', // 12
  xs: '0.8125rem', // 13
  sm: '0.875rem', // 14
  md: '1rem', // 16
  lg: '1.125rem', // 18
  xl: '1.25rem', // 20
  '2xl': '1.75rem', // 28
  '3xl': '2.125rem', // 34
  '4xl': '2.5rem', // 40
} as const

export const zIndex = {
  deepdive: '-99999',
  default: '1',
  tooltip: '6000',
  docked: '4',
  dropdown: '7000',
  modal: '9000',
  overlay: '8000',
  spinner: '9050',
  sticky: '100',
  snackbar: '10000',
} as const
