import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Button } from 'react-native-paper';

const MapPickerScreen = ({ navigation, route }) => {
  const { field, onSelectLocation } = route.params; // get callback
  const [region, setRegion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please enable location permissions.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const handleMapPress = (e) => {
    setSelectedLocation(e.nativeEvent.coordinate);
  };

  const handleConfirm = async () => {
    if (!selectedLocation) {
      Alert.alert('No location selected', 'Please tap on the map to select a location.');
      return;
    }

    try {
      const places = await Location.reverseGeocodeAsync(selectedLocation);
      if (!places || places.length === 0) {
        Alert.alert('Error', 'No address found for selected location.');
        return;
      }
      const place = places[0];
      const label = `${place.name || ''}, ${place.street || ''}, ${place.city || ''}, ${place.region || ''}, ${place.country || ''}`
        .replace(/(^[,\s]+)|([,\s]+$)/g, '');

      if (typeof onSelectLocation === 'function') {
        onSelectLocation(label);
      }

      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not retrieve address.');
    }
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          region={region}
          onPress={handleMapPress}
        >
          {selectedLocation && <Marker coordinate={selectedLocation} />}
        </MapView>
      )}
      <Button mode="contained" onPress={handleConfirm} style={styles.button}>
        Confirm Location
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: Dimensions.get('window').width,
    height: '90%',
  },
  button: {
    margin: 16,
    borderRadius: 10,
  },
});

export default MapPickerScreen;
