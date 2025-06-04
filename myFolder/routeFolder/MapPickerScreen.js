



// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Dimensions, Alert, Text } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';
// import { Button } from 'react-native-paper';

// const MapPickerScreen = ({ navigation, route }) => {
//   const { field, onSelectLocation } = route.params;
//   const [region, setRegion] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission Denied', 'Please enable location permissions.');
//         return;
//       }

//       const loc = await Location.getCurrentPositionAsync({});
//       setRegion({
//         latitude: loc.coords.latitude,
//         longitude: loc.coords.longitude,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       });
//     })();
//   }, []);

//   const handleMapPress = (e) => {
//     const coordinate = e.nativeEvent.coordinate;
//     setSelectedLocation(coordinate);
//     setRegion((prev) => ({
//       ...prev,
//       latitude: coordinate.latitude,
//       longitude: coordinate.longitude,
//     }));
//   };

//   const handleConfirm = async () => {
//     if (!selectedLocation) {
//       Alert.alert('No location selected', 'Please long press on the map to select a location.');
//       return;
//     }

//     try {
//       const places = await Location.reverseGeocodeAsync(selectedLocation);
//       if (!places || places.length === 0) {
//         Alert.alert('Error', 'No address found for selected location.');
//         return;
//       }
//       const place = places[0];
//       const label = `${place.name || ''}, ${place.street || ''}, ${place.city || ''}, ${place.region || ''}, ${place.country || ''}`
//         .replace(/(^[,\s]+)|([,\s]+$)/g, '');

//       if (typeof onSelectLocation === 'function') {
//         onSelectLocation({
//           label,
//           coords: selectedLocation,
//         });
//       }

//       navigation.goBack();
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Could not retrieve address.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {region && (
//         <MapView
//           style={styles.map}
//           region={region}
//           onLongPress={handleMapPress}
//         >
//           {selectedLocation && <Marker coordinate={selectedLocation} />}
//         </MapView>
//       )}

//       {selectedLocation && (
//         <Text style={styles.coordText}>
//           Lat: {selectedLocation.latitude.toFixed(6)}, Lng: {selectedLocation.longitude.toFixed(6)}
//         </Text>
//       )}

//       <Button mode="contained" onPress={handleConfirm} style={styles.button}>
//         Confirm Location
//       </Button>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: {
//     width: Dimensions.get('window').width,
//     height: '85%',
//   },
//   coordText: {
//     textAlign: 'center',
//     marginVertical: 8,
//     fontSize: 16,
//     color: '#333',
//   },
//   button: {
//     margin: 16,
//     borderRadius: 10,
//   },
// });

// export default MapPickerScreen;




import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Alert, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Button } from 'react-native-paper';

const FALLBACK_REGION = {
  latitude: 20.5937,    // Center of India (or pick your desired fallback)
  longitude: 78.9629,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const MapPickerScreen = ({ navigation, route }) => {
  const { field, onSelectLocation } = route.params;

  const [initialRegion, setInitialRegion] = useState(FALLBACK_REGION);
  const [region, setRegion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Please enable location permissions.');
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        const userRegion = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };

        setInitialRegion(userRegion);
        setRegion(userRegion); // Update map region smoothly
      } catch (error) {
        console.warn('Using fallback region due to error getting current location.');
      }
    })();
  }, []);

  const handleMapPress = (e) => {
    const coordinate = e.nativeEvent.coordinate;
    setSelectedLocation(coordinate);
    setRegion((prev) => ({
      ...prev,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    }));
  };

  const handleConfirm = async () => {
    if (!selectedLocation) {
      Alert.alert('No location selected', 'Please long press on the map to select a location.');
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
        onSelectLocation({
          label,
          coords: selectedLocation,
        });
      }

      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not retrieve address.');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        region={region}
        onRegionChangeComplete={setRegion}
        onLongPress={handleMapPress}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>

      {selectedLocation && (
        <Text style={styles.coordText}>
          Lat: {selectedLocation.latitude.toFixed(6)}, Lng: {selectedLocation.longitude.toFixed(6)}
        </Text>
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
    height: '85%',
  },
  coordText: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 16,
    color: '#333',
  },
  button: {
    margin: 16,
    borderRadius: 10,
  },
});

export default MapPickerScreen;

