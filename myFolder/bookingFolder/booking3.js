// // BookingAmb3.js

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const BookingAmb3 = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>BookingAmb3 Page</Text>
//       <Text style={styles.text}>This is a basic screen for BookingAmb3.</Text>
//     </View>
//   );
// };

// export default BookingAmb3;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   text: {
//     fontSize: 16,
//     color: '#333',
//   },
// });


// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import { Button } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';

// const HospitalMapScreen = () => {
//   const navigation = useNavigation();

//   const hospitalName = 'Sunshine Hospital';

//   const hospitalLocation = {
//     latitude: 17.4239,
//     longitude: 78.4983,
//   };

//   return (
//     <View style={styles.b4_container}>
//       <View style={styles.b4_mapWrapper}>
//         <MapView
//           style={styles.b4_map}
//           initialRegion={{
//             ...hospitalLocation,
//             latitudeDelta: 0.05,
//             longitudeDelta: 0.05,
//           }}
//         >
//           <Marker coordinate={hospitalLocation} title={hospitalName} />
//         </MapView>
//       </View>

//       <Button
//         mode="contained"
//         style={styles.b4_button}
//         onPress={() =>
//           navigation.navigate('HospitalDetails', { hospitalName })
//         }
//       >
//         Know More
//       </Button>
//     </View>
//   );
// };

// export default HospitalMapScreen;

// const styles = StyleSheet.create({
//   b4_container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   b4_mapWrapper: {
//     height: '90%',
//     width: '90%',
//     borderRadius: 10,
//     overflow: 'hidden',
//     elevation: 3,
//   },
//   b4_map: {
//     flex: 1,
//   },
//   b4_button: {
//     marginTop: 10,
//     width: '90%',
//   },
// });


// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
// import { Button } from 'react-native-paper';

// const HospitalMapWithRoute = ({ navigation }) => {
//   // Sample coordinates
//   const origin = {
//     latitude: 17.4065,  // Your location
//     longitude: 78.4772,
//   };

//   const destination = {
//     latitude: 17.4239,  // Hospital location
//     longitude: 78.4983,
//   };

//   const GOOGLE_MAPS_APIKEY = 'AIzaSyDE_Mn98wGt9XeCA8GUb02FL8NKuuL4ttU';

//   return (
//     <View style={styles.b3_container}>
//       <MapView
//         style={styles.b3_map}
//         initialRegion={{
//           latitude: origin.latitude,
//           longitude: origin.longitude,
//           latitudeDelta: 0.05,
//           longitudeDelta: 0.05,
//         }}
//       >
//         <Marker coordinate={origin} title="You" />
//         <Marker coordinate={destination} title="Hospital" />

//         <MapViewDirections
//           origin={origin}
//           destination={destination}
//           apikey={GOOGLE_MAPS_APIKEY}
//           strokeWidth={4}
//           strokeColor="blue"
//         />
//       </MapView>

//       <View style={styles.b3_footer}>
//         <Button
//           mode="contained"
//           onPress={() =>
//             navigation.navigate('HospitalDetails', {
//               hospital: {
//                 name: 'Sample Hospital',
//                 address: 'Plot 24, Jubilee Hills, Hyderabad',
//                 phone: '9876543210',
//                 specialties: 'Cardiology, Neurology',
//                 emergency: true,
//               },
//             })
//           }
//         >
//           Know More
//         </Button>
//       </View>
//     </View>
//   );
// };

// export default HospitalMapWithRoute;

// const styles = StyleSheet.create({
//   b3_container: {
//     flex: 1,
//   },
//   b3_map: {
//     flex: 1,
//   },
//   b3_footer: {
//     padding: 16,
//     backgroundColor: '#fff',
//   },
// });


// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, Dimensions, Alert } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import { Button } from 'react-native-paper';


// import polyline from '@mapbox/polyline'; 

// const GOOGLE_MAPS_APIKEY = 'AIzaSyDE_Mn98wGt9XeCA8GUb02FL8NKuuL4ttU';

// const MapScreen = ({ route, navigation }) => {
//   const { startCoords, endCoords, drivingNumber } = route.params;
//   const [routeCoords, setRouteCoords] = useState([]);

//   useEffect(() => {
//     const fetchRoute = async () => {
//       // const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startCoords.latitude},${startCoords.longitude}&destination=${endCoords.latitude},${endCoords.longitude}&key=${GOOGLE_MAPS_APIKEY}`;

//       //sample
//       //const origin = {
// //     latitude: 17.4065,  // Your location
// //     longitude: 17.4065,
// //   };

// //   const destination = {
// //     latitude: 17.4239,  // Hospital location
// //     longitude: 78.4983,
// //   };
//       const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${17.4065},${17.4065}&destination=${17.4239},${78.4983}&key=${GOOGLE_MAPS_APIKEY}`;
//       try {
//         const response = await fetch(url);
//         const json = await response.json();
//         if (json.routes.length) {
//           // Decode polyline points to lat/lng coordinates array
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
//   }, [startCoords, endCoords]);

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: startCoords.latitude,
//           longitude: startCoords.longitude,
//           latitudeDelta: 0.05,
//           longitudeDelta: 0.05,
//         }}
//       >
//         <Marker coordinate={startCoords} title="Start" />
//         <Marker coordinate={endCoords} title="End" />

//         {routeCoords.length > 0 && (
//           <Polyline
//             coordinates={routeCoords}
//             strokeColor="#E8B3BC"
//             strokeWidth={4}
//           />
//         )}
//       </MapView>

//       <Button
//         mode="contained"
//         onPress={() => navigation.navigate('Details', {
//           startCoords,
//           endCoords,
//           drivingNumber
//         })}
//         style={styles.button}
//       >
//         Details
//       </Button>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: {
//     width: Dimensions.get('window').width,
//     height: '90%',
//   },
//   button: {
//     margin: 16,
//     borderRadius: 10,
//   },
// });

// export default MapScreen;



import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Button } from 'react-native-paper';
import polyline from '@mapbox/polyline';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDE_Mn98wGt9XeCA8GUb02FL8NKuuL4ttU';

const MapScreen = ({ route, navigation }) => {
  // Sample test coordinates
  const startCoords = { latitude: 17.4050, longitude: 78.4750 }; // Simulated current location
  const endCoords = { latitude: 17.4239, longitude: 78.4983 };   // Simulated hospital location
  const hospitalName = 'Sunshine Hospital';
  // 👉 Uncomment below for real coordinates passed via navigation
  // const { startCoords, endCoords, drivingNumber } = route.params;

  const [routeCoords, setRouteCoords] = useState([]);

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
  }, []);

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
        <Marker coordinate={startCoords} title="Your Location" />
        <Marker coordinate={endCoords} title="Hospital" />

        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeColor="#E91E63"
            strokeWidth={4}
          />
        )}
      </MapView>

      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate('HospitalDetails', {
            startCoords,
            endCoords,
            hospitalName
          })
        }
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
