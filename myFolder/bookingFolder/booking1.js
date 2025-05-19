// bookingAmb1.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme, Button } from 'react-native-paper';

const BookingAmb1 = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.title}>BookingAmb1 Page</Text>
      <Text style={styles.text}>This is a basic screen for BookingAmb1.</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('BookingAMB2')}
        style={{ marginTop: 20 }}
      >
        Go to BookingAmb2
      </Button>
    </View>
  );
};

export default BookingAmb1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // ❌ Don't use hook values like colors here
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
