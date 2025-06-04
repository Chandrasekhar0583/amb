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
  const [startGeo, setStartGeo] = useState({});
  const [endGeo, setEndGeo] = useState({});
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
      setStartGeo({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to get location.');
      console.error(error);
    } finally {
      setGettingLocation(false);
    }
  };

  const handleStart = () => {
    if (!start || !end || !drivingNumber) {
      Alert.alert('Missing Fields', 'Please fill all the fields.');
      return;
    }

    if (!startGeo.latitude || !endGeo.latitude) {
      Alert.alert('Error', 'Coordinates are missing. Please pick valid locations.');
      return;
    }

    navigation.navigate('Map', {
      startCoords: startGeo,
      endCoords: endGeo,
      drivingNumber,
    });
  };

  const openMapPicker = (field) => {
    navigation.navigate('MapPicker', {
      field,
      onSelectLocation: (location) => {
        if (field === 'start') {
          setStart(location.label);
          setStartGeo(location.coords);
        } else if (field === 'end') {
          setEnd(location.label);
          setEndGeo(location.coords);
        }
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
        <View style={{ width: 48 }} />
      </View>

      {/* Driving Number */}
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
