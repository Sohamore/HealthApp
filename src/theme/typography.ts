import { TextStyle } from 'react-native';
import { Colors } from './colors';

export interface Typography {
  heading: TextStyle;
  subheading: TextStyle;
  body: TextStyle;
  bodySmall: TextStyle;
  button: TextStyle;
}

export const typography: Typography = {
  heading: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    fontWeight: '700',
    color: Colors.textDark,
    lineHeight: 34,
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textDark,
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textDark,
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.textDark,
    lineHeight: 20,
  },
  button: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
};
