import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const BookingAmb2 = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BookingAmb3 Page</Text>
      <Text style={styles.text}>This is a basic screen for BookingAmb3.</Text>
       <Button
        mode="contained"
        onPress={() => navigation.navigate('BookingAMB3')}
        style={{ marginTop: 20 }}
      >
        Go to BookingAmb3 
      </Button>
    </View>
  );
};

export default BookingAmb2;

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
