import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 0.5,
    backgroundColor: '#C8C7CC',
  },
});

export default function Separator() {
  return <View style={styles.separator} />;
}
