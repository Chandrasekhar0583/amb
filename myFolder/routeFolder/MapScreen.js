

// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, Dimensions, Alert } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import { Button } from 'react-native-paper';
// import polyline from '@mapbox/polyline';
// import * as Location from 'expo-location';

// const GOOGLE_MAPS_APIKEY = 'AIzaSyDE_Mn98wGt9XeCA8GUb02FL8NKuuL4ttU';

// const MapScreen = ({ route, navigation }) => {
//   const { startCoords, endCoords, drivingNumber } = route.params;

//   const [routeCoords, setRouteCoords] = useState([]);
//   const [region, setRegion] = useState({
//     latitude: (startCoords.latitude + endCoords.latitude) / 2,
//     longitude: (startCoords.longitude + endCoords.longitude) / 2,
//     latitudeDelta: Math.abs(startCoords.latitude - endCoords.latitude) * 2 || 0.05,
//     longitudeDelta: Math.abs(startCoords.longitude - endCoords.longitude) * 2 || 0.05,
//   });

//   const [userLocation, setUserLocation] = useState(null);
//   const [watcher, setWatcher] = useState(null);

//   useEffect(() => {
//     const fetchRoute = async () => {
//       const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startCoords.latitude},${startCoords.longitude}&destination=${endCoords.latitude},${endCoords.longitude}&key=${GOOGLE_MAPS_APIKEY}`;
//       try {
//         const response = await fetch(url);
//         const json = await response.json();
//         if (json.routes.length) {
//           const points = polyline.decode(json.routes[0].overview_polyline.points);
//           const coords = points.map(point => ({
//             latitude: point[0],
//             longitude: point[1],
//           }));
//           setRouteCoords(coords);
//         } else {
//           Alert.alert('No routes found');
//         }
//       } catch (error) {
//         Alert.alert('Error fetching directions', error.message);
//       }
//     };

//     fetchRoute();

//     return () => {
//       if (watcher) {
//         watcher.remove();
//       }
//     };
//   }, [startCoords, endCoords]);

//   const startTracking = async () => {
//     const { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission Denied', 'Please enable location permissions.');
//       return;
//     }

//     const locationWatcher = await Location.watchPositionAsync(
//       {
//         accuracy: Location.Accuracy.High,
//         timeInterval: 1000, // every second
//         distanceInterval: 0, // any movement
//       },
//       (location) => {
//         setUserLocation(location.coords);
//       }
//     );

//     setWatcher(locationWatcher);
//   };

//   const stopTracking = () => {
//     if (watcher) {
//       watcher.remove();
//       setWatcher(null);
//       Alert.alert('Tracking Stopped');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         region={region}
//         onRegionChangeComplete={setRegion}
//       >
//         <Marker coordinate={startCoords} title="Start" />
//         <Marker coordinate={endCoords} title="End" />
//         {userLocation && <Marker coordinate={userLocation} title="You" pinColor="blue" />}
//         {routeCoords.length > 0 && (
//           <Polyline coordinates={routeCoords} strokeColor="#E8B3BC" strokeWidth={4} />
//         )}
//       </MapView>

//       <View style={styles.buttonGroup}>
//         <Button mode="contained" onPress={startTracking} style={styles.button}>
//           Start Driving
//         </Button>
//         <Button mode="contained" onPress={stopTracking} style={styles.button}>
//           End Driving
//         </Button>
//         <Button
//           mode="contained"
//           onPress={() => navigation.navigate('Details', {
//             startCoords,
//             endCoords,
//             drivingNumber
//           })}
//           style={styles.button}
//         >
//           Details
//         </Button>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: {
//     width: Dimensions.get('window').width,
//     height: '80%',
//   },
//   buttonGroup: {
//     padding: 16,
//     gap: 10,
//   },
//   button: {
//     borderRadius: 10,
//   },
// });

// export default MapScreen;


// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, Dimensions, Alert, Image } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import { Button } from 'react-native-paper';
// import * as Location from 'expo-location';
// import polyline from '@mapbox/polyline';

// const GOOGLE_MAPS_APIKEY = 'AIzaSyDE_Mn98wGt9XeCA8GUb02FL8NKuuL4ttU'; // Replace with your key
// const carIcon = require('../../assets/car1.gif'); // Adjust path if needed


// function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
//   const R = 6371e3; // meters
//   const φ1 = (lat1 * Math.PI) / 180;
//   const φ2 = (lat2 * Math.PI) / 180;
//   const Δφ = ((lat2 - lat1) * Math.PI) / 180;
//   const Δλ = ((lon2 - lon1) * Math.PI) / 180;

//   const a =
//     Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//     Math.cos(φ1) * Math.cos(φ2) *
//     Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   const d = R * c;
//   return d;
// }

// const MapScreen = ({ route, navigation }) => {
//   const { startCoords, endCoords, drivingNumber } = route.params;

//   const [routeCoords, setRouteCoords] = useState([]);
//   const [region, setRegion] = useState({
//     latitude: (startCoords.latitude + endCoords.latitude) / 2,
//     longitude: (startCoords.longitude + endCoords.longitude) / 2,
//     latitudeDelta: Math.abs(startCoords.latitude - endCoords.latitude) * 2 || 0.05,
//     longitudeDelta: Math.abs(startCoords.longitude - endCoords.longitude) * 2 || 0.05,
//   });

//   const [userLocation, setUserLocation] = useState(startCoords);
//   const [watcher, setWatcher] = useState(null);

//   useEffect(() => {
//     const fetchRoute = async () => {
//       const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startCoords.latitude},${startCoords.longitude}&destination=${endCoords.latitude},${endCoords.longitude}&key=${GOOGLE_MAPS_APIKEY}`;
//       try {
//         const response = await fetch(url);
//         const json = await response.json();
//         if (json.routes.length) {
//           const points = polyline.decode(json.routes[0].overview_polyline.points);
//           const coords = points.map(point => ({
//             latitude: point[0],
//             longitude: point[1],
//           }));
//           setRouteCoords(coords);
//         } else {
//           Alert.alert('No routes found');
//         }
//       } catch (error) {
//         Alert.alert('Error fetching directions', error.message);
//       }
//     };

//     fetchRoute();

//     return () => {
//       if (watcher) {
//         watcher.remove();
//       }
//     };
//   }, [startCoords, endCoords]);

// const startTracking = async () => {
//   const { status } = await Location.requestForegroundPermissionsAsync();
//   if (status !== 'granted') {
//     Alert.alert('Permission Denied', 'Please enable location permissions.');
//     return;
//   }

//   Alert.alert('Driving Started', 'Your location is now being tracked.');

//   let lastCoords = null;

//   const locationWatcher = await Location.watchPositionAsync(
//     {
//       accuracy: Location.Accuracy.BestForNavigation,
//       timeInterval: 1000, // 1 second
//       distanceInterval: 1, // Check every meter
//     },
//     (location) => {
//       const { latitude, longitude, accuracy } = location.coords;

//       if (accuracy > 15) return; // Skip low-accuracy data

//       if (lastCoords) {
//         const distance = getDistanceFromLatLonInMeters(
//           lastCoords.latitude,
//           lastCoords.longitude,
//           latitude,
//           longitude
//         );
//         if (distance < 3) return; // Skip small movements
//       }

//       lastCoords = { latitude, longitude };
//       setUserLocation({ latitude, longitude });
//     }
//   );

//   setWatcher(locationWatcher);
// };


//   const stopTracking = () => {
//     if (watcher) {
//       watcher.remove();
//       setWatcher(null);
//       Alert.alert('Tracking Stopped');
//     }
//   };

//   return (
//     <View style={styles.container}>
//    <MapView
//   style={styles.map}
//   region={region}
//   onRegionChangeComplete={setRegion}
// >
//   {/* Show a smaller car icon while tracking */}
//   {userLocation ? (
//     <Marker coordinate={userLocation} title="You">
//       <Image
//         source={carIcon}
//         style={{ width: 32, height: 32, resizeMode: 'contain' }}
//       />
//     </Marker>
//   ) : (
//     <Marker coordinate={startCoords} title="Start" />
//   )}

//   <Marker coordinate={endCoords} title="End" />

//   {routeCoords.length > 0 && (
//     <Polyline
//       coordinates={routeCoords}
//       strokeColor="#E8B3BC"
//       strokeWidth={4}
//     />
//   )}
// </MapView>


//       <View style={styles.buttonGroup}>
//         <Button mode="contained" onPress={startTracking} style={styles.button}>
//           Start Driving
//         </Button>
//         <Button mode="contained" onPress={stopTracking} style={styles.button}>
//           End Driving
//         </Button>
//         <Button
//           mode="contained"
//           onPress={() =>
//             navigation.navigate('Details', {
//               startCoords,
//               endCoords,
//               drivingNumber,
//             })
//           }
//           style={styles.button}
//         >
//           Details
//         </Button>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: {
//     width: Dimensions.get('window').width,
//     height: '80%',
//   },
//   buttonGroup: {
//     padding: 16,
//     gap: 10,
//   },
//   button: {
//     borderRadius: 10,
//     marginVertical: 4,
//   },
// });

// export default MapScreen;



import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Alert, Image, BackHandler } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Button } from 'react-native-paper';
import * as Location from 'expo-location';
import polyline from '@mapbox/polyline';
import { useFocusEffect } from '@react-navigation/native';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDE_Mn98wGt9XeCA8GUb02FL8NKuuL4ttU'; // Replace with your API key
const carIcon = require('../../assets/car1.gif'); // Adjust path if needed

function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const MapScreen = ({ route, navigation }) => {
  const { startCoords, endCoords, drivingNumber } = route.params;

  const [routeCoords, setRouteCoords] = useState([]);
  const [region, setRegion] = useState({
    latitude: (startCoords.latitude + endCoords.latitude) / 2,
    longitude: (startCoords.longitude + endCoords.longitude) / 2,
    latitudeDelta: Math.abs(startCoords.latitude - endCoords.latitude) * 2 || 0.05,
    longitudeDelta: Math.abs(startCoords.longitude - endCoords.longitude) * 2 || 0.05,
  });

  const [userLocation, setUserLocation] = useState(startCoords);
  const [watcher, setWatcher] = useState(null);
  const [isTracking, setIsTracking] = useState(false);

  // Block hardware back press while tracking
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (isTracking) {
          Alert.alert("Tracking in progress", "Please end driving before leaving.");
          return true; // Block navigation
        }
        return false;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => backHandler.remove();
    }, [isTracking])
  );

  useEffect(() => {
    const fetchRoute = async () => {
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startCoords.latitude},${startCoords.longitude}&destination=${endCoords.latitude},${endCoords.longitude}&key=${GOOGLE_MAPS_APIKEY}`;
      try {
        const response = await fetch(url);
        const json = await response.json();
        if (json.routes.length) {
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

    return () => {
      if (watcher) {
        watcher.remove();
      }
    };
  }, [startCoords, endCoords]);

 const startTracking = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission Denied', 'Please enable location permissions.');
    return;
  }

  Alert.alert('Driving Started', 'Your location is now being tracked.');
  setIsTracking(true);

  let lastCoords = null;

  const locationWatcher = await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval: 1000,
      distanceInterval: 1,
    },
    (location) => {
      const { latitude, longitude, accuracy } = location.coords;

      if (accuracy > 15) return;

      // Avoid processing tiny movements
      if (lastCoords) {
        const moveDist = getDistanceFromLatLonInMeters(
          lastCoords.latitude,
          lastCoords.longitude,
          latitude,
          longitude
        );
        if (moveDist < 3) return;
      }

      lastCoords = { latitude, longitude };
      setUserLocation({ latitude, longitude });

      // Check if destination reached
      const distanceToEnd = getDistanceFromLatLonInMeters(
        latitude,
        longitude,
        endCoords.latitude,
        endCoords.longitude
      );

      if (distanceToEnd <= 20) {
        if (locationWatcher) {
          locationWatcher.remove();
          setWatcher(null);
        }
        setIsTracking(false);
        Alert.alert('Reached Destination', 'You have arrived at your destination.');
      }
    }
  );

  setWatcher(locationWatcher);
};

  const stopTracking = () => {
    if (watcher) {
      watcher.remove();
      setWatcher(null);
      Alert.alert('Tracking Stopped');
    }
    setIsTracking(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {userLocation ? (
          <Marker coordinate={userLocation} title="You">
            <Image
              source={carIcon}
              style={{ width: 32, height: 32, resizeMode: 'contain' }}
            />
          </Marker>
        ) : (
          <Marker coordinate={startCoords} title="Start" />
        )}

        <Marker coordinate={endCoords} title="End" />

        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeColor="#E8B3BC"
            strokeWidth={4}
          />
        )}
      </MapView>

      <View style={styles.buttonGroup}>
        {!isTracking ? (
          <Button mode="contained" onPress={startTracking} style={styles.button}>
            Start Driving
          </Button>
        ) : (
          <Button mode="contained" onPress={stopTracking} style={styles.button}>
            End Driving
          </Button>
        )}

        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate('Details', {
              startCoords,
              endCoords,
              drivingNumber,
            })
          }
          style={styles.button}
          disabled={isTracking} // Block navigation if driving
        >
          Details
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: Dimensions.get('window').width,
    height: '80%',
  },
  buttonGroup: {
    padding: 16,
    gap: 10,
  },
  button: {
    borderRadius: 10,
    marginVertical: 4,
  },
});

export default MapScreen;
