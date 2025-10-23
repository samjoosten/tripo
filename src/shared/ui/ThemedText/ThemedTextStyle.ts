import { StyleSheet } from 'react-native';

import { cv, sv } from 'shared/lib/theme';

export const styles = StyleSheet.create({
  title: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: sv('text.xl'),
  },
  header: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: sv('text.xl'),
  },
  subtitle: {
    fontFamily: 'Gilroy-Regular',
    fontSize: sv('text.lg'),
  },
  body: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: sv('text.m'),
  },
  secondary: {
    fontFamily: 'Gilroy-Regular',
    fontSize: sv('text.sm'),
  },
  button: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: sv('text.m'),
    color: cv('white'),
  },
});
