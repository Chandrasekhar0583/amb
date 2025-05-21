import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { TextInput, Button, useTheme, IconButton } from 'react-native-paper';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const RouteInputScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [drivingNumber, setDrivingNumber] = useState('');
  const [gettingLocation, setGettingLocation] = useState(false);

  const getCurrentLocation = async () => {
    setGettingLocation(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please allow location access in settings.');
        setGettingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const places = await Location.reverseGeocodeAsync(location.coords);

      if (!places || places.length === 0) {
        Alert.alert('Error', 'Could not determine address.');
        setGettingLocation(false);
        return;
      }

      const place = places[0];
      const address = `${place.name || ''}, ${place.street || ''}, ${place.city || ''}`.trim();
      setStart(address);
    } catch (error) {
      Alert.alert('Error', 'Failed to get location.');
      console.error(error);
    } finally {
      setGettingLocation(false);
    }
  };

  const handleStart = async () => {
    if (!start || !end || !drivingNumber) {
      Alert.alert('Missing Fields', 'Please fill all the fields.');
      return;
    }

    try {
      const [startGeo] = await Location.geocodeAsync(start);
      const [endGeo] = await Location.geocodeAsync(end);

      if (!startGeo || !endGeo) {
        Alert.alert('Error', 'Could not resolve one or both addresses.');
        return;
      }

      navigation.navigate('Map', {
        startCoords: {
          latitude: startGeo.latitude,
          longitude: startGeo.longitude,
        },
        endCoords: {
          latitude: endGeo.latitude,
          longitude: endGeo.longitude,
        },
        drivingNumber,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to geocode addresses.');
      console.error(error);
    }
  };

  const openMapPicker = (field) => {
    navigation.navigate('MapPicker', {
      field,
      onSelectLocation: (location) => {
        if (field === 'start') setStart(location);
        else if (field === 'end') setEnd(location);
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      {/* Start Location */}
      <View style={styles.inputRow}>
        <TextInput
          label="Start Location"
          value={start}
          onChangeText={setStart}
          style={[styles.input, { backgroundColor: colors.surface }]}
          theme={{ colors: { text: colors.text, primary: colors.primary } }}
          mode="outlined"
        />
        <IconButton
          icon="map-marker"
          color={colors.primary}
          size={24}
          onPress={() => openMapPicker('start')}
        />
        <IconButton
          icon="crosshairs-gps"
          color={colors.primary}
          size={24}
          onPress={getCurrentLocation}
          disabled={gettingLocation}
        />
      </View>

      {/* End Location */}
      <View style={styles.inputRow}>
        <TextInput
          label="End Location"
          value={end}
          onChangeText={setEnd}
          style={[styles.input, { backgroundColor: colors.surface }]}
          theme={{ colors: { text: colors.text, primary: colors.primary } }}
          mode="outlined"
        />
        <IconButton
          icon="map-marker"
          color={colors.primary}
          size={24}
          onPress={() => openMapPicker('end')}
        />
        {/* Spacer to align with above row */}
        <View style={{ width: 48 }} />
      </View>

      {/* Driving Number - same inputRow to match width */}
      <View style={styles.inputRow}>
        <TextInput
          label="Driving Number"
          value={drivingNumber}
          onChangeText={setDrivingNumber}
          keyboardType="numeric"
          style={[styles.input, { backgroundColor: colors.surface }]}
          theme={{ colors: { text: colors.text, primary: colors.primary } }}
          mode="outlined"
        />
        {/* Spacer to align visually with other rows */}
        <View style={{ width: 48 }} />
        <View style={{ width: 48 }} />
      </View>

      <Button
        mode="contained"
        onPress={handleStart}
        style={[styles.button, { backgroundColor: colors.primary }]}
        labelStyle={{ color: colors.onPrimary }}
      >
        Start Route
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 14,
  },
  button: {
    alignSelf: 'center',
    width: '80%',
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default RouteInputScreen;
