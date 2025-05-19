// BookingAmb3.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BookingAmb4 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BookingAmb3 Page</Text>
      <Text style={styles.text}>This is a basic screen for BookingAmb3.</Text>
    </View>
  );
};

export default BookingAmb4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});
