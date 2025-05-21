import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Button } from 'react-native-paper';


import polyline from '@mapbox/polyline'; 

const GOOGLE_MAPS_APIKEY = 'AIzaSyDE_Mn98wGt9XeCA8GUb02FL8NKuuL4ttU';

const MapScreen = ({ route, navigation }) => {
  const { startCoords, endCoords, drivingNumber } = route.params;
  const [routeCoords, setRouteCoords] = useState([]);

  useEffect(() => {
    const fetchRoute = async () => {
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startCoords.latitude},${startCoords.longitude}&destination=${endCoords.latitude},${endCoords.longitude}&key=${GOOGLE_MAPS_APIKEY}`;
      
      try {
        const response = await fetch(url);
        const json = await response.json();
        if (json.routes.length) {
          // Decode polyline points to lat/lng coordinates array
          const points = polyline.decode(json.routes[0].overview_polyline.points);
          const coords = points.map(point => ({
            latitude: point[0],
            longitude: point[1],
          }));
          setRouteCoords(coords);
        } else {
          Alert.alert('No routes found');
        }
      } catch (error) {
        Alert.alert('Error fetching directions', error.message);
      }
    };

    fetchRoute();
  }, [startCoords, endCoords]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: startCoords.latitude,
          longitude: startCoords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={startCoords} title="Start" />
        <Marker coordinate={endCoords} title="End" />

        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeColor="#E8B3BC"
            strokeWidth={4}
          />
        )}
      </MapView>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('Details', {
          startCoords,
          endCoords,
          drivingNumber
        })}
        style={styles.button}
      >
        Details
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

export default MapScreen;
