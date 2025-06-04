import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, useTheme, Divider } from 'react-native-paper';
import * as Location from 'expo-location';
import axios from 'axios';

const reverseGeocode = async (coords) => {
  try {
    const places = await Location.reverseGeocodeAsync(coords);
    if (places.length > 0) {
      const place = places[0];
      return `${place.name || ''}, ${place.street || ''}, ${place.city || ''}`.trim();
    }
  } catch {
    return 'Unknown Location';
  }
};

const getDistanceAndDuration = async (startCoords, endCoords) => {
  const apiKey = 'AIzaSyDE_Mn98wGt9XeCA8GUb02FL8NKuuL4ttU'; // 🔁 Replace this
  const origin = `${startCoords.latitude},${startCoords.longitude}`;
  const destination = `${endCoords.latitude},${endCoords.longitude}`;

  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/distancematrix/json',
      {
        params: {
          origins: origin,
          destinations: destination,
          key: apiKey,
          mode: 'driving',
        },
      }
    );

    const element = response.data.rows[0].elements[0];
    if (element.status === 'OK') {
      return {
        distance: element.distance.text,
        duration: element.duration.text,
      };
    } else {
      return { distance: 'N/A', duration: 'N/A' };
    }
  } catch (error) {
    console.error('Distance Matrix Error:', error);
    return { distance: 'Error', duration: 'Error' };
  }
};

const DetailsScreen = ({ route }) => {
  const { startCoords, endCoords, drivingNumber } = route.params;
  const { colors } = useTheme();

  const [startAddress, setStartAddress] = useState('');
  const [endAddress, setEndAddress] = useState('');
  const [distance, setDistance] = useState('');
  const [eta, setEta] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      setStartAddress(await reverseGeocode(startCoords));
      setEndAddress(await reverseGeocode(endCoords));

      const { distance, duration } = await getDistanceAndDuration(startCoords, endCoords);
      setDistance(distance);
      setEta(duration);
    };
    fetchDetails();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Card style={styles.card}>
        <Card.Title title="Route Details" titleStyle={styles.title} />
        <Card.Content>
          <View style={styles.row}>
            <Text variant="bodyMedium" style={styles.label}>Driving Number:</Text>
            <Text style={styles.value}>{drivingNumber}</Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.row}>
            <Text variant="bodyMedium" style={styles.label}>Start Location:</Text>
            <Text style={styles.value}>{startAddress}</Text>
          </View>

          <View style={styles.row}>
            <Text variant="bodyMedium" style={styles.label}>End Location:</Text>
            <Text style={styles.value}>{endAddress}</Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.row}>
            <Text variant="bodyMedium" style={styles.label}>Estimated Distance:</Text>
            <Text style={styles.value}>{distance}</Text>
          </View>

          <View style={styles.row}>
            <Text variant="bodyMedium" style={styles.label}>Estimated Time:</Text>
            <Text style={styles.value}>{eta}</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 12,
    elevation: 3,
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  row: {
    marginTop: 10,
  },
  label: {
    fontWeight: '600',
    color: '#777',
  },
  value: {
    fontSize: 16,
    marginTop: 2,
  },
  divider: {
    marginVertical: 10,
  },
});

export default DetailsScreen;
