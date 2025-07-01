import { StyleSheet } from 'react-native';

import { cv, sv } from 'shared/lib/theme';

export const styles = StyleSheet.create({
  title: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: sv('text.xl'),
    color: cv('gray.900')
  },
  header: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: sv('text.xl'),
    color: cv('gray.900')
  },
  subtitle: {
    fontFamily: 'Gilroy-Regular',
    fontSize: sv('text.lg'),
    color: cv('gray.800')
  },
  body: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: sv('text.m'),
    color: cv('gray.900')
  },
  secondary: {
    fontFamily: 'Gilroy-Regular',
    fontSize: sv('text.sm'),
    color: cv('gray.400')
  },
  button: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: sv('text.m'),
    color: cv('white')
  }
});