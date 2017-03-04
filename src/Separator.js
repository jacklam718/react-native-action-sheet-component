import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 1,
    // backgroundColor: '#E3E2E5',
    backgroundColor: '#EDEDED',
  },
});

export default function Separator() {
  return <View style={styles.separator} />;
}
